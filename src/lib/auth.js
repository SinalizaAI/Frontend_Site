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

export function getIdDoToken() {
  const token = getToken();
  if (!token) return null;
  
  // JWT tem 3 partes separadas por ponto — a do meio é o payload em base64
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}