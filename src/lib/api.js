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

// Buscar dados do cliente ao se logar

export async function buscarCliente(id) {
  const token = localStorage.getItem("token");
  
  const res = await fetch(`${API_URL}/api/clientes/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao buscar dados do cliente.");
  }

  return data;
}

//Excluir conta

export async function desativarCliente(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/clientes/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.erro || "Erro ao desativar conta.");
  }
}

// Atualizar dados -  somente os que estão mapeados no banco

export async function atualizarCliente(id, dados) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao atualizar dados.");
  }

  return data;
}
