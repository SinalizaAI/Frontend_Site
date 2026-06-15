import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Tradutor.module.css";
import { useWebSocket } from "../hooks/useWebSocket";

// ── Truque VLibras ──────────────────────────────────────────────────────────
// O VLibras não tem API programática. Ele monitora texto SELECIONADO na página.
// A função abaixo escreve o texto em um elemento oculto e simula a seleção,
// fazendo o VLibras capturar e traduzir automaticamente.
function traduzirComVLibras(texto) {
  const el = document.getElementById("vlibras-texto-oculto");
  if (!el) return;

  el.textContent = texto;

  // Passo 1: seleciona o texto no elemento oculto
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  // Passo 2: dispara mouseup para o VLibras detectar a seleção
  el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

  // Passo 3: após um pequeno delay (VLibras precisa de tempo para montar o botão),
  // clica automaticamente no botão de tradução do widget
  setTimeout(() => {
    // O VLibras injeta um botão flutuante de tradução quando detecta seleção
    // Tentamos os seletores mais comuns que ele usa
    const seletores = [
      "[vw-translate]",
      ".vw-translate-btn",
      "[data-action='translate']",
      ".vw-btn-translate",
    ];

    for (const seletor of seletores) {
      const btn = document.querySelector(seletor);
      if (btn) {
        btn.click();
        return;
      }
    }

    // Fallback: se não achou o botão específico, redispara o mouseup
    // diretamente no document para o VLibras processar
    document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
  }, 300);
}
// ───────────────────────────────────────────────────────────────────────────

function Tradutor() {
  const [modoCamera, setModoCamera] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("digitar"); // "digitar" | "falar"
  const [textoDigitado, setTextoDigitado] = useState("");
  const [gravando, setGravando] = useState(false);
  const [textoFalado, setTextoFalado] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const reconhecimentoRef = useRef(null);

  // WebSocket — só ativo no modo câmera
  const { fraseReconhecida, historico, conectado } = useWebSocket(
    "ws://localhost:8765",
    modoCamera
  );

  // ── Câmera ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (modoCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Erro ao acessar câmera:", err));
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  }, [modoCamera]);

  // ── Reconhecimento de voz (Web Speech API) ─────────────────────────────
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
    if (reconhecimentoRef.current) {
      reconhecimentoRef.current.stop();
    }
    setGravando(false);
  }

  return (
    <section className={styles.sec}>
      {/* Elemento oculto usado pelo truque do VLibras */}
      <span
        id="vlibras-texto-oculto"
        style={{
          position: "absolute",
          left: "-9999px",
          fontSize: "1px",
          color: "transparent",
          userSelect: "text",
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
              <div className={styles.status_badge} data-conectado={conectado}>
                {conectado ? "● Conectado ao Python" : "○ Aguardando conexão..."}
              </div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={styles.video}
              />
            </div>

            <div className={styles.reconhecimento_wrapper}>
              <div className={styles.frase_principal}>
                {fraseReconhecida ? (
                  <p className={styles.frase_texto}>{fraseReconhecida}</p>
                ) : (
                  <p className={styles.frase_placeholder}>
                    Sinalize em Libras para começar...
                  </p>
                )}
              </div>

              {historico.length > 0 && (
                <div className={styles.historico}>
                  <span className={styles.historico_titulo}>Histórico</span>
                  <ul className={styles.historico_lista}>
                    {historico.map((item, i) => (
                      <li key={i} className={styles.historico_item}>
                        <span className={styles.historico_hora}>{item.hora}</span>
                        <span>{item.texto}</span>
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

            {/* Painel com abas */}
            <div className={styles.painel}>

              {/* Abas lado a lado */}
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

              {/* Conteúdo da aba */}
              <div className={styles.aba_conteudo}>

                {/* Aba Digitar */}
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
                      onClick={() => {
                        if (textoDigitado.trim()) {
                          traduzirComVLibras(textoDigitado.trim());
                        }
                      }}
                    >
                      Traduzir para Libras
                    </button>
                  </div>
                )}

                {/* Aba Falar */}
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