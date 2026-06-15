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

    // ✅ Salva dados da etapa 1 para usar na etapa 2
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
          <Link to={"/Login"} className={styles.btn}>Login</Link>
        </div>

        <div className={styles.crie_conta}>
          <h2>Crie sua conta gratuitamente</h2>
          <p className={styles.cadastre}>Cadastre seus dados</p>

          <form onSubmit={handleCadastro}>
            <div className={styles.escrever}>
              <img src={nomeIcon} alt="Ícone Nome" />
              {/* ✅ Adicionados name e value */}
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.escrever}>
              <img src={emailIcon} alt="Ícone Email" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.escrever}>
              <img src={senhaIcon} alt="Ícone Senha" />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
                minLength={8}
              />
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
                  <a href="#" className={styles.termos}>termos de uso.</a>
                </span>
              </label>
            </div>

            <button type="submit" className={styles.btn2}>Cadastrar</button>
            <Link to={"/Login"} className={`${styles.btn} ${styles.btn_mobile}`}>Login</Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;