import styles from "../css/Header.module.css";
import Logo from "../assets/header/logo_oficial.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuAberto(false);
  };

  return (
    <header className={styles.header_principal} id="header">
      <nav className={styles.container_nav}>
        <Link
          to={"/"}
          className={styles.logo_container}
          onClick={() => scrollToSection("inicio")}
        >
          <div className={styles.logo}>
            <img src={Logo} alt="Logo do SinalizaAI" />
          </div>
          <h1>
            Sinaliza<span>AI</span>
          </h1>
        </Link>

        {/* ✅ Links do DESKTOP — ficam aqui, visíveis normalmente */}
        <div className={styles.links_nav}>
          <nav>
            <Link to="/" onClick={() => scrollToSection("inicio")}>
              Home
            </Link>
            <Link to="/" onClick={() => scrollToSection("funciona")}>
              Como funciona
            </Link>
            <Link to={"/pages/Planos"}>Produtos</Link>
            <Link to={"/pages/Sobre_Equipe"}>Equipe</Link>
            <Link to={"/pages/Cadastro"} className={styles.button}>
              Obter agora
            </Link>
          </nav>
        </div>

        {/* Botão hambúrguer — só aparece no mobile via CSS */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          <span className={menuAberto ? styles.span_aberto_1 : ""}></span>
          <span className={menuAberto ? styles.span_aberto_2 : ""}></span>
          <span className={menuAberto ? styles.span_aberto_3 : ""}></span>
        </button>
      </nav>

      {/* Overlay */}
      {menuAberto && (
        <div className={styles.overlay} onClick={() => setMenuAberto(false)} />
      )}

      {/* ✅ Links do MOBILE — dentro do drawer */}
      <div
        className={`${styles.drawer} ${menuAberto ? styles.drawer_aberto : ""}`}
      >
        <nav className={styles.drawer_nav}>
          <Link to="/" onClick={() => scrollToSection("inicio")}>
            Home
          </Link>
          <Link to="/" onClick={() => scrollToSection("funciona")}>
            Como funciona
          </Link>
          <Link to={"/Tradutor"} onClick={() => setMenuAberto(false)}>
            Testar agora
          </Link>
          <Link to={"/pages/Planos"} onClick={() => setMenuAberto(false)}>
            Produtos
          </Link>
          <Link to={"/pages/Sobre_Equipe"} onClick={() => setMenuAberto(false)}>
            Equipe
          </Link>
          {/* <Link to={"/pages/Usuario"} onClick={() => setMenuAberto(false)}>
            Usuário
          </Link> */}
          <Link to={"/pages/Sobre_Projeto"} onClick={() => setMenuAberto(false)}>
            Sobre Projeto
          </Link>
          <Link
            to={"/pages/Cadastro"}
            className={styles.button}
            onClick={() => setMenuAberto(false)}
          >
            Cadastre-se
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
