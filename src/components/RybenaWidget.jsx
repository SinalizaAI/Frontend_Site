import { useEffect, useRef } from "react";

function RybenaWidget() {
  const iniciado = useRef(false);

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;

    const script = document.createElement("script");
    // SEM "?mode=api" -> carrega o RybenaDOM, o mesmo modo usado no
    // Electron, que já vem com UI própria (player + os 3 botões) pronta.
    script.src = "https://cdn.rybena.com.br/dom/master/latest/rybena.js";
    script.async = true;

    script.onload = () => {
      const tentarIniciar = () => {
        if (window.RybenaDOM) {
          window.RybenaDOM.getInstance().getRybenaScripts("LIBRAS");
        } else {
          setTimeout(tentarIniciar, 300);
        }
      };
      tentarIniciar();
    };

    script.onerror = () => {
      console.error("Falha ao carregar o script da Rybená");
    };

    document.head.appendChild(script);
  }, []);

  // Não renderiza nada — a própria Rybená injeta seu DOM (player + sidebar
  // com os 3 botões: Libras, Voz, Acessibilidade) sozinha na página.
  return null;
}

export default RybenaWidget;