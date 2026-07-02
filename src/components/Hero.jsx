import styles from "../css/Hero.module.css";
import { Link } from "react-router-dom";
import HeroImage from "../assets/Hero/hero_image.png";

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero_sec} id="inicio">
      <div className={styles.bg_image}>
        <img src={HeroImage} alt="" aria-hidden="true" />
      </div>

      <div className={styles.text}>
        <h1>
          Comunicação é direito, <br /> não escolha
        </h1>
        <div className={styles.buttons}>
          <Link to="/Tradutor" className={styles.btn1}>
            Teste agora
          </Link>
          <Link to="/pages/Sobre_Projeto" className={styles.btn2}>
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;