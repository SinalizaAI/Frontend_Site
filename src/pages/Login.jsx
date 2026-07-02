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
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a senha
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const data = await loginCliente(email, senha);
      salvarToken(data.token);
      navigate("/pages/Usuario");
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
            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <img src={emailIcon} alt="Ícone Email" className={styles.iconImage} />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            {/* SENHA */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Senha</label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <img src={senhaIcon} alt="Ícone Senha" className={styles.iconImage} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.iconRight}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
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