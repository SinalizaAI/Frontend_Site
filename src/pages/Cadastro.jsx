import { Link } from "react-router-dom";
import styles from "../css/Cadastro.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/Cadastro/email.png";
import nomeIcon from "../assets/Cadastro/profile.png";
import senhaIcon from "../assets/Cadastro/lock.png";

function Cadastro() {
  const [aceitou, setAceitou] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    if (!aceitou) {
      alert("Você não aceitou os termos de uso.");
      return;
    }
    sessionStorage.setItem("cadastroEtapa1", JSON.stringify(formData));
    navigate("/Cadastro_Etapa2");
  };

  return (
    <main className={styles.main}>
      <h1>Olá, só mais uma Etapa</h1>
      <p className={styles.p1}>
        Cadastre-se gratuitamente, contrate nossos planos e tenha acesso aos
        nossos produtos de forma rápida e eficiente.
      </p>

      <section className={styles.section}>
        <div className={styles.bem_vindo}>
          <h2>Bem-vindo de volta! Faça seu Login</h2>
          <p>Acesse sua conta agora mesmo</p>
          <Link to={"/Login"} className={styles.btn}>
            Login
          </Link>
        </div>

        <div className={styles.crie_conta}>
          <h2>Crie sua conta gratuitamente</h2>
          <p className={styles.cadastre}>Cadastre seus dados</p>

          <form onSubmit={handleCadastro}>
            {/* NOME */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome</label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <img src={nomeIcon} alt="Ícone Nome" className={styles.iconImage} />
                </span>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <img src={emailIcon} alt="Ícone Email" className={styles.iconImage} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  minLength={8}
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

            <div className={styles.termos_de_uso}>
              <label>
                <input
                  type="checkbox"
                  checked={aceitou}
                  onChange={(e) => setAceitou(e.target.checked)}
                />
                <span className={styles.confirmo}>
                  Confirmo que li e aceito os{" "}
                  <a href="#" className={styles.termos}>
                    termos de uso.
                  </a>
                </span>
              </label>
            </div>

            <button type="submit" className={styles.btn2}>
              Cadastrar
            </button>
            <Link
              to={"/Login"}
              className={`${styles.btn} ${styles.btn_mobile}`}
            >
              Login
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;