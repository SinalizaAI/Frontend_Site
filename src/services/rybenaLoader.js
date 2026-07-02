let rybenaReadyPromise = null;

export function getRybenaReady() {
  if (rybenaReadyPromise) return rybenaReadyPromise;

  rybenaReadyPromise = new Promise((resolve) => {
    let renderizado = false;

    const aguardar = () => {
      // 1) assim que o bootstrap (RybenaDOM) existir, dispara o render — só uma vez
      if (!renderizado && window.RybenaDOM?.getInstance) {
        try {
          console.log("[Rybená] Chamando render()...");
          window.RybenaDOM.getInstance().render();
          renderizado = true;
        } catch (e) {
          console.error("[Rybená] erro ao chamar render():", e);
        }
      }

      // 2) só depois disso o módulo de API (RybenaApi) aparece
      if (window.RybenaApi?.getInstance) {
        const api = window.RybenaApi.getInstance();
        api.handleLoaded(() => {
          console.log("[Rybená] API pronta (loader singleton)");
          api.switchToLibras();
          resolve(api);
        });
      } else {
        setTimeout(aguardar, 300);
      }
    };
    aguardar();
  });

  return rybenaReadyPromise;
}
