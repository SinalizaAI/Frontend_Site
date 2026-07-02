import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { getRybenaReady } from "../services/rybenaLoader";

const RybenaContext = createContext(null);

export function RybenaProvider({ children }) {
  const [pronto, setPronto] = useState(false);
  const [traduzindo, setTraduzindo] = useState(false);
  const filaRef = useRef([]);

  useEffect(() => {
    let cancelado = false;

    getRybenaReady().then((api) => {
      if (cancelado) return;
      api.handleTranslate(() => setTraduzindo(false));
      setPronto(true);
      filaRef.current.forEach((texto) => api.translate(texto));
      filaRef.current = [];
    });

    return () => {
      cancelado = true;
    };
  }, []);

  const traduzir = useCallback(
    (texto) => {
      if (!texto?.trim()) return;
      const api = window.RybenaApi?.getInstance();
      if (!pronto || !api) {
        console.warn("[Rybená] ainda não está pronta — enfileirado:", texto);
        filaRef.current.push(texto);
        return;
      }
      console.log("[Rybená] Traduzindo:", texto);
      setTraduzindo(true);
      api.openPlayer();
      api.translate(texto);
    },
    [pronto],
  );

  return (
    <RybenaContext.Provider value={{ pronto, traduzindo, traduzir }}>
      {children}
    </RybenaContext.Provider>
  );
}

export function useRybena() {
  const ctx = useContext(RybenaContext);
  if (!ctx)
    throw new Error("useRybena precisa estar dentro de <RybenaProvider>");
  return ctx;
}
