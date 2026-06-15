import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

  RybenaApi.getInstance().handleLoaded(() => {
  console.log("Rybená API está pronta!");
  // Sua código aqui
});

RybenaApi.getInstance().handleLoaded(() => {
  // Mostra o player
  RybenaApi.getInstance().openPlayer();

  // Traduz um texto
  RybenaApi.getInstance().translate("Olá, bem-vindo à Rybená!");
});

RybenaApi.getInstance().handleLoaded(() => {
  // Configura callback quando a tradução terminar
  RybenaApi.getInstance().handleTranslate(() => {
    console.log("Tradução concluída!");
  });

  // Traduz um texto
  RybenaApi.getInstance().translate("Este texto será traduzido");
});