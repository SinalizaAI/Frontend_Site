const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function loginCliente(email, senha) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login realizado.");
  } else if (!res.ok) {
    throw new Error(data.erro || "Erro ao fazer login");
  }

  return data; // { token: "eyJ..." }
}

export async function cadastrarCliente(dados) {
  const res = await fetch(`${API_URL}/api/clientes/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Cadastro realizado com sucesso.");
  } else if (!res.ok) {
    throw new Error(data.erro || "Erro ao cadastrar");
  }

  return data;
}

// Contatos

export async function enviarContato(dados) {
  const res = await fetch(`${API_URL}/api/contatos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao enviar mensagem.");
  }

  return data;
}
