import styles from "../css/Como_Funciona.module.css";
import Video from "../assets/Como_funciona/video_ex.mp4";
import { Link } from "react-router-dom";

function Como_Funciona() {
  return (
    <section className={styles.funciona_sec} id="funciona">
      <div className={styles.container}>
        <h1>Como funciona na prática?</h1>
        <iframe 
          className={styles.video} 
          src="https://www.youtube.com/embed/g574wiNtIOs?si=OS7QotlMxZLv5cQE" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
        <Link to={"/Tradutor"} className={styles.btn}>
          Teste agora
        </Link>
      </div>
    </section>
  );
}

export default Como_Funciona;