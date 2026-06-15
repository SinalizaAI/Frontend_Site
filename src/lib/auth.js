export function salvarToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removerToken() {
  localStorage.removeItem("token");
}

export function estaLogado() {
  return !!getToken();
}