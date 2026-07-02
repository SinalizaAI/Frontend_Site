let rybenaReadyPromise = null;

export function getRybenaReady() {
  if (rybenaReadyPromise) return rybenaReadyPromise;

  rybenaReadyPromise = new Promise((resolve) => {
    const aguardar = () => {
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
