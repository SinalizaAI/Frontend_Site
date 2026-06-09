import { useState } from "react";
import styles from "../css/Footer.module.css";
import Logo from "../assets/header/logo_oficial.png";
import Insta from "../assets/Footer/Instagram.png";
import InstaAmarelo from "../assets/Footer/instagram_logo_amarela.png";
import Git from "../assets/Footer/GitHub.png";
import GitAmarelo from "../assets/Footer/github_logo_amarela.png";
import { Link } from "react-router-dom";

function Footer() {
  const [isInstaHovered, setIsInstaHovered] = useState(false);
  const [isGitHovered, setIsGitHovered] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={`${styles.footer_sec}`}>
      <div className={styles.footer_main}>
        <div className={styles.logo_cont}>
          <Link
            to={"/"}
            className={styles.logo_container}
            onClick={() => scrollToSection("inicio")}
          >
            <div className={styles.logo}>
              <img src={Logo} alt="Logo do SinalizaAI" />
            </div>
            <div className={styles.textos}>
              <h1>
                Sinaliza<span>AI</span>
              </h1>
              <h3>Comunicação é direito, não escolha</h3>
            </div>
          </Link>
          <div className={styles.cont_i}>
            <a
              href="https://www.instagram.com/sinaliza_aii/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsInstaHovered(true)}
              onMouseLeave={() => setIsInstaHovered(false)}
            >
              <img
                src={isInstaHovered ? InstaAmarelo : Insta}
                alt="Instagram"
              />
            </a>

            <a
              href="https://github.com/SinalizaAI"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsGitHovered(true)}
              onMouseLeave={() => setIsGitHovered(false)}
            >
              <img src={isGitHovered ? GitAmarelo : Git} alt="GitHub" />
            </a>
          </div>
        </div>

        <div className={styles.texts_cont}>
          <div className={styles.cont_t}>
            <h2>Navegação</h2>
            <div className={styles.cont_a}>
              <Link to={"/"} onClick={() => scrollToSection("inicio")}>
                Home
              </Link>
              <Link to={"/"} onClick={() => scrollToSection("funciona")}>
                Como funciona
              </Link>
              <Link to={"/Tradutor"}>Testar agora</Link>
              <Link to={"/pages/Planos"}>Produtos</Link>
              <Link to={"/pages/Sobre_Equipe"}>Equipe</Link>
              {/* <Link to={"/pages/Usuario"}>Usuário</Link> */}
              <Link to={"/pages/Sobre_Projeto"}>Sobre Projeto</Link>
            </div>
          </div>
          <div className={styles.cont_t}>
            <h2>Contato</h2>
            <div className={styles.cont_p}>
              <p>(11) 4002-8922</p>
              <p>sinalizai.contatos@gmail.com</p>
              <p>Senac Lapa Tito, 54</p>
              <p>Vila Romana, São Paulo</p>
              <p>05061-200</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>SinalizaAI. &copy; Copyright 2026. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
