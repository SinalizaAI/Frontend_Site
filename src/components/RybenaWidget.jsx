import { useEffect, useRef } from "react";

function RybenaWidget() {
  const iniciado = useRef(false);

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;

    const script = document.createElement("script");
    script.src = "https://cdn.rybena.com.br/dom/master/latest/rybena.js";
    script.async = true;
    script.onerror = () => console.error("Falha ao carregar o script da Rybená");
    document.head.appendChild(script);
  }, []);

  return null;
}

export default RybenaWidget;