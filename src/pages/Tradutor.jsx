import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Tradutor.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// URL da API Python no Railway — troque pela URL real após o deploy
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL_PY || "http://localhost:8000"; // ← ALTERE após deploy

// Configurações do reconhecimento (espelham os valores do Python)
// ─────────────────────────────────────────────────────────────────────────────
const JANELA_FRAMES = 30;
const THRESHOLD_MOVIMENTO = 0.005;
const FRAMES_FIM_GESTO = 15;
const FRAMES_MINIMOS = 20;
const DEBOUNCE_MS = 1000; // 1 segundo entre sinais iguais
// ─────────────────────────────────────────────────────────────────────────────
// VLibras helper — igual ao original
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Garante que o widget VLibras está "aberto" (painel ativo) antes de traduzir
// ─────────────────────────────────────────────────────────────────────────────
function abrirWidgetVLibras() {
  return new Promise((resolve) => {
    const wrapper = document.querySelector("[vw-plugin-wrapper]");
    const accessButton = document.querySelector("[vw-access-button]");
    if (!wrapper || !accessButton) {
      resolve(false);
      return;
    }
    if (wrapper.classList.contains("active")) {
      resolve(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (wrapper.classList.contains("active")) {
        observer.disconnect();
        resolve(true);
      }
    });
    observer.observe(wrapper, { attributes: true, attributeFilter: ["class"] });
    accessButton.click();
    // Timeout de segurança caso a classe nunca mude
    setTimeout(() => {
      observer.disconnect();
      resolve(wrapper.classList.contains("active"));
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Fluxo completo, agora assíncrono e sequencial
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Fluxo completo: abre o widget, atualiza o texto e simula hover + clique
// (é assim que o VLibras Widget realmente dispara a tradução — não por seleção)
// ─────────────────────────────────────────────────────────────────────────────
async function traduzirComVLibras(texto) {
  const el = document.getElementById("vlibras-texto-oculto");
  if (!el) return false;

  const abriu = await abrirWidgetVLibras();
  if (!abriu) {
    console.warn("Widget do VLibras não abriu a tempo.");
  }

  // Pequeno delay para garantir que o painel do widget já processou a abertura
  await new Promise((r) => setTimeout(r, 150));

  el.textContent = texto;

  // Dá um frame para o widget "notar" a mudança de conteúdo, caso ele use
  // MutationObserver internamente
  await new Promise((r) => requestAnimationFrame(r));

  // 1) Hover — é o que faz o widget "realçar" o elemento como traduzível
  el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, cancelable: true, view: window }));
  el.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window }));

  await new Promise((r) => setTimeout(r, 100));

  // 2) Clique — é o que efetivamente dispara a tradução
  el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
  el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
  el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

  return true;
}
// ─────────────────────────────────────────────────────────────────────────────
// Síntese de Voz (TTS) no Navegador
// ─────────────────────────────────────────────────────────────────────────────
function falar(texto) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Cancela fala anterior se houver
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  window.speechSynthesis.speak(utterance);
}
// ─────────────────────────────────────────────────────────────────────────────
// Normalização de landmarks (idêntica ao Python)
// entrada: array de 21 pontos { x, y, z }
// saída:   Float32Array de 63 valores
// ─────────────────────────────────────────────────────────────────────────────
function normalizarLandmarks(landmarks) {
  // Cria matriz 21x3
  const pontos = landmarks.map((lm) => [lm.x, lm.y, lm.z]);
  // Subtrai a origem (ponto 0 = pulso)
  const origem = pontos[0];
  const centrado = pontos.map((p) => [
    p[0] - origem[0],
    p[1] - origem[1],
    p[2] - origem[2],
  ]);
  // Calcula escala pelo ponto 9 (base do dedo médio)
  const p9 = centrado[9];
  const escala = Math.sqrt(p9[0] ** 2 + p9[1] ** 2 + p9[2] ** 2);
  // Normaliza e achata
  const flat = new Array(63);
  for (let i = 0; i < 21; i++) {
    flat[i * 3] = escala > 0 ? centrado[i][0] / escala : centrado[i][0];
    flat[i * 3 + 1] = escala > 0 ? centrado[i][1] / escala : centrado[i][1];
    flat[i * 3 + 2] = escala > 0 ? centrado[i][2] / escala : centrado[i][2];
  }
  return flat;
  
}
// ─────────────────────────────────────────────────────────────────────────────
// Extração de landmarks para duas mãos → vetor de 126 valores
// (Right → posições 0-62 | Left → posições 63-125)
// ─────────────────────────────────────────────────────────────────────────────
function extrairLandmarksDuasMainos(resultados) {
  const vetor = new Array(126).fill(0);
  if (
    !resultados ||
    !resultados.landmarks ||
    resultados.landmarks.length === 0
  ) {
    return null; // nenhuma mão detectada
  }
  for (let i = 0; i < resultados.landmarks.length; i++) {
    const landmarks = resultados.landmarks[i];
    const handedness = resultados.handednesses[i][0].categoryName; // "Left" ou "Right"
    const normalizado = normalizarLandmarks(landmarks);
    if (handedness === "Right") {
      for (let j = 0; j < 63; j++) vetor[j] = normalizado[j];
    } else {
      for (let j = 0; j < 63; j++) vetor[63 + j] = normalizado[j];
    }
  }
  return vetor;
}
// ─────────────────────────────────────────────────────────────────────────────
// Cálculo de movimento entre dois frames
// ─────────────────────────────────────────────────────────────────────────────
function calcularMovimento(atual, anterior) {
  let soma = 0;
  for (let i = 0; i < atual.length; i++) {
    soma += Math.abs(atual[i] - anterior[i]);
  }
  return soma / atual.length;
}
// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
function Tradutor() {
  // Modo de exibição
  const [modoCamera, setModoCamera] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("digitar");
  const [textoDigitado, setTextoDigitado] = useState("");
  const [gravando, setGravando] = useState(false);
  const [textoFalado, setTextoFalado] = useState("");
  const [traduzindo, setTraduzindo] = useState(false); // Estado do reconhecimento de Libras
  const [statusMediaPipe, setStatusMediaPipe] = useState("idle"); // idle | carregando | pronto | erro
  const [emMovimento, setEmMovimento] = useState(false);
  const [sinalAtual, setSinalAtual] = useState(null); // { sinal, confianca, texto }
  const [frasePt, setFrasePt] = useState("");
  const [bufferLen, setBufferLen] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [statusApi, setStatusApi] = useState("");
  // Refs (não causam re-render)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const animFrameRef = useRef(null);
  const bufferRef = useRef([]);
  const anteriorRef = useRef(null);
  const framesParadoRef = useRef(0);
  const emMovimentoRef = useRef(false);
  const ultimoSinalRef = useRef(null);
  const ultimoTempoRef = useRef(0);
  const glosaBufRef = useRef([]); // sinais acumulados para frase
  const reconhecimentoRef = useRef(null);
  // ── Carrega MediaPipe ao entrar no modo câmera ─────────────────────────────
  useEffect(() => {
    if (!modoCamera) {
      // Para a câmera e o loop
      pararCamera();
      return;
    }
    let cancelado = false;
    async function iniciar() {
      setStatusMediaPipe("carregando");
      try {
        // Importa MediaPipe Tasks Vision via CDN (não precisa instalar npm)
        const { HandLandmarker, FilesetResolver } =
          await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs");
        if (cancelado) return;
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm",
        );
        const handLandmarker = await HandLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
            minHandDetectionConfidence: 0.6,
            minTrackingConfidence: 0.4,
          },
        );
        if (cancelado) {
          handLandmarker.close();
          return;
        }
        handLandmarkerRef.current = handLandmarker;
        setStatusMediaPipe("pronto");
        // Abre a câmera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (cancelado) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        // Inicia o loop de processamento
        iniciarLoop(handLandmarker);
      } catch (err) {
        if (!cancelado) {
          console.error("Erro ao carregar MediaPipe:", err);
          setStatusMediaPipe("erro");
        }
      }
    }
    iniciar();
    return () => {
      cancelado = true;
      pararCamera();
    };
  }, [modoCamera]);
  // ── Para câmera e libera recursos ─────────────────────────────────────────
  function pararCamera() {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (handLandmarkerRef.current) {
      handLandmarkerRef.current.close();
      handLandmarkerRef.current = null;
    }
    // Limpa estado do reconhecimento
    bufferRef.current = [];
    anteriorRef.current = null;
    framesParadoRef.current = 0;
    emMovimentoRef.current = false;
    glosaBufRef.current = [];
    setEmMovimento(false);
    setBufferLen(0);
    setStatusMediaPipe("idle");
  }
  // ── Loop de processamento frame a frame ────────────────────────────────────
  function iniciarLoop(handLandmarker) {
    let timestampMs = 0;
    function processarFrame() {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        animFrameRef.current = requestAnimationFrame(processarFrame);
        return;
      }
      // Detecta landmarks
      const resultado = handLandmarker.detectForVideo(video, timestampMs);
      timestampMs += 33;
      // Desenha no canvas (opcional — visualização dos pontos)
      desenharCanvas(video, resultado);
      // Extrai vetor de 126 valores
      const landmarksAtual = extrairLandmarksDuasMainos(resultado);
      if (landmarksAtual) {
        // Mão visível
        const anterior = anteriorRef.current;
        if (anterior !== null) {
          const movimento = calcularMovimento(landmarksAtual, anterior);
          if (movimento > THRESHOLD_MOVIMENTO) {
            // ── Movimento detectado ─────────────────────────────────────────
            if (!emMovimentoRef.current) {
              console.log(">>> Sinal iniciado");
              emMovimentoRef.current = true;
              setEmMovimento(true);
            }
            framesParadoRef.current = 0;
            bufferRef.current.push(landmarksAtual);
            setBufferLen(bufferRef.current.length);
          } else {
            // ── Mão parada ─────────────────────────────────────────────────
            if (emMovimentoRef.current) {
              framesParadoRef.current += 1;
              bufferRef.current.push(landmarksAtual);
              setBufferLen(bufferRef.current.length);
              if (framesParadoRef.current >= FRAMES_FIM_GESTO) {
                // Sinal terminou
                tentarInferencia("FIM_NATURAL");
                resetarBuffer();
              }
            }
          }
        } else {
          // Primeiro frame com mão
          emMovimentoRef.current = true;
          setEmMovimento(true);
          bufferRef.current.push(landmarksAtual);
          setBufferLen(1);
        }
        anteriorRef.current = landmarksAtual;
      } else {
        // ── Nenhuma mão detectada ───────────────────────────────────────────
        anteriorRef.current = null;
        if (emMovimentoRef.current) {
          // Mão saiu da tela — tenta inferência com o que acumulou
          tentarInferencia("MAO_SAIU");
          resetarBuffer();
        }
      }
      animFrameRef.current = requestAnimationFrame(processarFrame);
    }
    animFrameRef.current = requestAnimationFrame(processarFrame);
  }
  // ── Desenho dos pontos no canvas ───────────────────────────────────────────
  function desenharCanvas(video, resultado) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!resultado || !resultado.landmarks) return;
    const CONEXOES = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [0, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [0, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20],
      [5, 9],
      [9, 13],
      [13, 17],
    ];
    for (let h = 0; h < resultado.landmarks.length; h++) {
      const lms = resultado.landmarks[h];
      const lado = resultado.handednesses[h][0].categoryName;
      const cor = lado === "Right" ? "#00c864" : "#c86400";
      // Linhas
      ctx.strokeStyle = cor;
      ctx.lineWidth = 2;
      for (const [a, b] of CONEXOES) {
        ctx.beginPath();
        ctx.moveTo(lms[a].x * canvas.width, lms[a].y * canvas.height);
        ctx.lineTo(lms[b].x * canvas.width, lms[b].y * canvas.height);
        ctx.stroke();
      }
      // Pontos
      for (const lm of lms) {
        ctx.beginPath();
        ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = cor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  // ── Reseta o estado do buffer ──────────────────────────────────────────────
  function resetarBuffer() {
    bufferRef.current = [];
    framesParadoRef.current = 0;
    emMovimentoRef.current = false;
    setEmMovimento(false);
    setBufferLen(0);
  }
  // ── Envia buffer para a API Railway e processa o resultado ─────────────────
  async function tentarInferencia(motivo) {
    const buffer = bufferRef.current;
    if (buffer.length < FRAMES_MINIMOS) {
      console.log(
        `[DESCARTADO/${motivo}] Apenas ${buffer.length} frames — insuficiente`,
      );
      return;
    }
    // Cópia do buffer antes de resetar
    const bufferCopia = [...buffer];
    try {
      setStatusApi("Reconhecendo...");
      const resp = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequencia: bufferCopia }),
      });
      if (!resp.ok) throw new Error(`API retornou ${resp.status}`);
      const dados = await resp.json();
      console.log(
        `[SINAL/${motivo}] ${dados.sinal} — ${(dados.confianca * 100).toFixed(1)}%`,
      );
      const agora = Date.now();
      // Debounce: ignora mesmo sinal em menos de 1 segundo
      if (
        dados.sinal === ultimoSinalRef.current &&
        agora - ultimoTempoRef.current < DEBOUNCE_MS
      ) {
        console.log("[DEBOUNCE] Mesmo sinal ignorado");
        setStatusApi("");
        return;
      }
      ultimoSinalRef.current = dados.sinal;
      ultimoTempoRef.current = agora;
      setSinalAtual(dados);
      // Acumula para frase
      if (dados.confianca_ok) {
        glosaBufRef.current.push(dados.sinal);
        // Adiciona ao histórico
        const hora = new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        setHistorico((prev) =>
          [
            { texto: dados.sinal, hora, confianca: dados.confianca },
            ...prev,
          ].slice(0, 10),
        );
        // Traduz a frase acumulada
        const glosa = glosaBufRef.current.join(" ");
        const respTrad = await fetch(`${API_URL}/traduzir`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ glosa }),
        });
        if (respTrad.ok) {
          const trad = await respTrad.json();
          setFrasePt(trad.frase_pt);
          falar(trad.frase_pt); // Fala a frase em português
        }
      }
      setStatusApi("");
    } catch (err) {
      console.error("Erro na inferência:", err);
      setStatusApi("Erro ao conectar com a API");
    }
  }
  // ── Limpa o histórico e frase ─────────────────────────────────────────────
  function limparHistorico() {
    setHistorico([]);
    setSinalAtual(null);
    setFrasePt("");
    glosaBufRef.current = [];
    if (window.speechSynthesis) window.speechSynthesis.cancel(); // Para o áudio imediatamente
  }

  async function handleTraduzir() {
    if (!textoDigitado.trim()) return;
    setTraduzindo(true);
    const sucesso = await traduzirComVLibras(textoDigitado.trim());
    setTraduzindo(false);
    if (!sucesso) {
      console.warn("Não foi possível confirmar a tradução automática.");
    }
  }

  // ── Reconhecimento de voz (Web Speech API) ─────────────────────────────────
  function iniciarGravacao() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Use o Chrome.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "pt-BR";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const texto = e.results[0][0].transcript;
      setTextoFalado(texto);
      traduzirComVLibras(texto);
    };
    rec.onerror = (e) => console.error("Erro no reconhecimento:", e.error);
    rec.onend = () => setGravando(false);
    reconhecimentoRef.current = rec;
    rec.start();
    setGravando(true);
  }
  function pararGravacao() {
    if (reconhecimentoRef.current) reconhecimentoRef.current.stop();
    setGravando(false);
  }
  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section className={styles.sec}>
      {/* Elemento oculto para o VLibras */}
      <span
        id="vlibras-texto-oculto"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          opacity: 0,
          pointerEvents: "none",
          userSelect: "text",
          whiteSpace: "pre",
        }}
      />
      <h1>Seja bem vindo!</h1>
      <h2>Aqui você poderá realizar um teste gratuito da nossa ferramenta</h2>
      <div className={styles.container}>
        <button onClick={() => setModoCamera(!modoCamera)}>
          {modoCamera
            ? "Câmera (Libras para Texto)"
            : "Áudio/Texto para Libras"}
        </button>
        {/* ── MODO CÂMERA ───────────────────────────────────────────────── */}
        {modoCamera ? (
          <div className={styles.demo_container}>
            <div className={styles.camera_wrapper}>
              {/* Badge de status do MediaPipe */}
              <div
                className={styles.status_badge}
                data-conectado={statusMediaPipe === "pronto"}
              >
                {statusMediaPipe === "carregando" &&
                  "⏳ Carregando detector de mãos..."}
                {statusMediaPipe === "pronto" && "● Detector pronto"}
                {statusMediaPipe === "erro" && "✗ Erro ao carregar detector"}
                {statusMediaPipe === "idle" && "○ Aguardando..."}
              </div>
              {/* Vídeo + Canvas sobrepostos */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={styles.video}
                  style={{ transform: "scaleX(-1)" }} // espelha horizontalmente
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "scaleX(-1)", // espelha igual ao vídeo
                    pointerEvents: "none",
                  }}
                />
              </div>
              {/* Info de buffer e movimento */}
              {statusMediaPipe === "pronto" && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "0.8rem",
                    color: "#aaa",
                    textAlign: "center",
                  }}
                >
                  {emMovimento
                    ? `🔴 Capturando... (${bufferLen}/${JANELA_FRAMES} frames)`
                    : "⚪ Aguardando movimento das mãos"}
                </div>
              )}
            </div>
            <div className={styles.reconhecimento_wrapper}>
              {/* Sinal atual */}
              <div className={styles.frase_principal}>
                {sinalAtual ? (
                  <>
                    <p
                      className={styles.frase_texto}
                      style={{
                        color: sinalAtual.confianca_ok ? "#00c864" : "#f59e0b",
                      }}
                    >
                      {sinalAtual.texto_exibido}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#888",
                        margin: "4px 0 0",
                      }}
                    >
                      {(sinalAtual.confianca * 100).toFixed(0)}% de confiança
                    </p>
                    {frasePt && (
                      <p
                        style={{
                          marginTop: "12px",
                          fontSize: "1rem",
                          color: "#ddd",
                          fontStyle: "italic",
                        }}
                      >
                        "{frasePt}"
                      </p>
                    )}
                  </>
                ) : (
                  <p className={styles.frase_placeholder}>
                    {statusApi || "Sinalize em Libras para começar..."}
                  </p>
                )}
              </div>
              {/* Botão limpar */}
              {(historico.length > 0 || frasePt) && (
                <button
                  onClick={limparHistorico}
                  style={{
                    marginBottom: "8px",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    background: "transparent",
                    border: "1px solid #555",
                    borderRadius: "6px",
                    color: "#aaa",
                    cursor: "pointer",
                  }}
                >
                  🗑 Limpar
                </button>
              )}
              {/* Histórico */}
              {historico.length > 0 && (
                <div className={styles.historico}>
                  <span className={styles.historico_titulo}>Histórico</span>
                  <ul className={styles.historico_lista}>
                    {historico.map((item, i) => (
                      <li key={i} className={styles.historico_item}>
                        <span className={styles.historico_hora}>
                          {item.hora}
                        </span>
                        <span>{item.texto}</span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "#666",
                            marginLeft: "4px",
                          }}
                        >
                          ({(item.confianca * 100).toFixed(0)}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── MODO ÁUDIO/TEXTO ──────────────────────────────────────────── */
          <div className={styles.audio_container}>
            <div className={styles.painel}>
              <div className={styles.abas}>
                <button
                  className={`${styles.aba} ${abaAtiva === "digitar" ? styles.aba_ativa : ""}`}
                  onClick={() => setAbaAtiva("digitar")}
                >
                  ✍️ Digitar
                </button>
                <button
                  className={`${styles.aba} ${abaAtiva === "falar" ? styles.aba_ativa : ""}`}
                  onClick={() => setAbaAtiva("falar")}
                >
                  🎤 Falar
                </button>
              </div>
              <div className={styles.aba_conteudo}>
                {abaAtiva === "digitar" && (
                  <div className={styles.aba_digitar}>
                    <textarea
                      className={styles.textarea}
                      placeholder="Digite em português..."
                      value={textoDigitado}
                      onChange={(e) => setTextoDigitado(e.target.value)}
                      rows={4}
                    />
                    <button
                      className={styles.btn_traduzir}
                      onClick={handleTraduzir}
                      disabled={traduzindo}
                    >
                      {traduzindo ? "Traduzindo..." : "Traduzir para Libras"}
                    </button>
                  </div>
                )}
                {abaAtiva === "falar" && (
                  <div className={styles.aba_falar}>
                    <button
                      className={`${styles.btn_mic} ${gravando ? styles.btn_mic_gravando : ""}`}
                      onClick={gravando ? pararGravacao : iniciarGravacao}
                    >
                      {gravando ? "⏹ Parar" : "🎤 Falar"}
                    </button>
                    {textoFalado && (
                      <p className={styles.texto_falado}>
                        <span>Reconhecido:</span> {textoFalado}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Link to={"/pages/Planos"} className={styles.btn}>
          Conheça nossos planos
        </Link>
      </div>
    </section>
  );
}
export default Tradutor;
