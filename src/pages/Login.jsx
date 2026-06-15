import styles from "../css/Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/Cadastro/email.png";
import senhaIcon from "../assets/Cadastro/lock.png";
import { loginCliente } from "../lib/api";
import { salvarToken } from "../lib/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const data = await loginCliente(email, senha);
      salvarToken(data.token); // salva o JWT no localStorage
      navigate("/pages/Usuario"); // redireciona para a home
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Olá, só mais uma Etapa</h1>
      <p className={styles.p1}>
        Faça seu login de forma rápida e segura para ter acesso completo a sua
        conta e a nossos produtos.
      </p>

      <section className={styles.section}>
        <div className={styles.bem_vindo}>
          <h2>Seja Bem-vindo!</h2>
          <p>Crie sua conta agora</p>
          <Link to={"/pages/Cadastro"} className={styles.btn_desktop}>
            Cadastrar
          </Link>
        </div>

        <div className={styles.entrar_conta}>
          <h2>Entre em sua conta</h2>
          <p className={styles.entrar}>Tenha acesso a seu plano</p>

          {erro && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
              {erro}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.escrever}>
              <img src={emailIcon} alt="Ícone Email" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.escrever}>
              <img src={senhaIcon} alt="Ícone Senha" />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.btn2} disabled={carregando}>
              {carregando ? "Entrando..." : "Login"}
            </button>
          </form>

          <Link to={"/pages/Cadastro"} className={styles.btn_mobile}>
            Cadastrar
          </Link>

          <Link className={styles.esqueceu}>Esqueceu sua senha?</Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
