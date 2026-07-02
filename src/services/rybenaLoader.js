let rybenaReadyPromise = null;

function getRybenaGlobal() {
  // cobre os dois nomes possíveis, caso a Rybená troque isso entre versões
  return window.RybenaDOM || window.RybenaApi || null;
}

export function getRybenaReady() {
  if (rybenaReadyPromise) return rybenaReadyPromise;

  rybenaReadyPromise = new Promise((resolve) => {
    const aguardar = () => {
      const Global = getRybenaGlobal();
      if (Global) {
        const api = Global.getInstance();
        console.log(
          "[Rybená] Classe global encontrada:",
          Global.name || Global,
        );
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
