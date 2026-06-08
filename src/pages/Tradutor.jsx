import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Tradutor.module.css";
import Imagem1 from "../assets/Tradutor/frame_1.png";
import Imagem2 from "../assets/Tradutor/frame_2.png";

function Tradutor() {
  const [modoCamera, setModoCamera] = useState(false); // false = Áudio/Texto, true = Câmera

  return (
    <section className={styles.sec}>
      <h1>Seja bem vindo!</h1>
      <h2>Aqui você poderá realizar um teste gratuito da nossa ferramenta</h2>
      <div className={styles.container}>
        {/* ✅ Botão superior muda de texto conforme o modo */}
        <button onClick={() => setModoCamera(!modoCamera)}>
          {modoCamera
            ? "Câmera (Libras para Texto)"
            : "Áudio/Texto para Libras"}
        </button>

        {/* ✅ Imagem troca conforme o estado */}
        <div className={styles.imagem_cont}>
          <img src={modoCamera ? Imagem2 : Imagem1} alt="Modo do tradutor" />
        </div>

        <Link to={"/pages/Planos"} className={styles.btn}>
          Conheça nossos planos
        </Link>
      </div>
    </section>
  );
}

export default Tradutor;
