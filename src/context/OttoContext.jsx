import { createContext, useContext, useState } from "react";

const OttoContext = createContext(null);

export function OttoProvider({ children }) {
  const [aberto, setAberto] = useState(false);
  return (
    <OttoContext.Provider value={{ aberto, setAberto }}>
      {children}
    </OttoContext.Provider>
  );
}

export function useOtto() {
  return useContext(OttoContext);
}