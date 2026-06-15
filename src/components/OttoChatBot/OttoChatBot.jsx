import { useRef, useEffect, useState } from "react";
import ottoImg from "../../assets/Mascote/otto.png";
import "./OttoChatBot.css";
import { useOtto } from "../../context/OttoContext";

export default function OttoChatbot() {
  const { aberto, setAberto } = useOtto();
  const [mensagens, setMensagens] = useState([
    {
      role: "assistant",
      content:
        "Olá! Sou o Otto 👋 Posso te ajudar com dúvidas sobre o SinalizaAI. O que deseja saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviar() {
    if (!input.trim() || carregando) return;

    const novaMensagem = { role: "user", content: input };
    const novaLista = [...mensagens, novaMensagem];
    setMensagens(novaLista);
    setInput("");
    setCarregando(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_OTTO_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          historico: mensagens.filter((m) => m.role !== "system"),
        }),
      });

      const data = await res.json();
      setMensagens((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, tive um problema de conexão. Tente novamente!",
        },
      ]);
    } finally {
      setCarregando(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  }

  return (
    <div className="otto-wrapper">
      {aberto && (
        <div className="otto-janela">
          {/* Header */}
          <div className="otto-header">
            <div className="otto-header-info">
              <div className="otto-header-texto">
                <strong>Otto</strong>
                <span>Assistente SinalizaAI</span>
              </div>
            </div>
            <button
              className="otto-fechar"
              onClick={() => setAberto(false)}
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </div>

          {/* Mensagens */}
          <div className="otto-mensagens">
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`otto-msg ${
                  msg.role === "user" ? "otto-msg-user" : "otto-msg-bot"
                }`}
              >
                {msg.role === "assistant" && (
                  <img src={ottoImg} alt="Otto" className="otto-msg-avatar" />
                )}
                <span>{msg.content}</span>
              </div>
            ))}

            {carregando && (
              <div className="otto-msg otto-msg-bot">
                <img src={ottoImg} alt="Otto" className="otto-msg-avatar" />
                <div className="otto-digitando">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={fimRef} />
          </div>

          {/* Input */}
          <div className="otto-input-area">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              rows={1}
              disabled={carregando}
            />
            <button
              onClick={enviar}
              disabled={carregando || !input.trim()}
              aria-label="Enviar"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Botão flutuante com o Otto */}
      <button
        className={`otto-botao ${aberto ? "otto-botao-ativo" : ""}`}
        onClick={() => setAberto(!aberto)}
        aria-label="Abrir assistente Otto"
      >
        {aberto ? (
          <span className="otto-botao-fechar">✕</span>
        ) : (
          <img src={ottoImg} alt="Otto" />
        )}
      </button>
    </div>
  );
}