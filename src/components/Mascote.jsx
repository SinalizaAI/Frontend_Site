import styles from "../css/Mascote.module.css";
import Polvo from "../assets/Mascote/octron.png";
import { useOtto } from "../context/OttoContext";

function Mascote() {
  const { setAberto } = useOtto();

  return (
    <section className={styles.sec_mascote}>
      <div className={styles.div1}>
        <div className={styles.container_1}>
          <div className={styles.text1}>
            <h1>
              Esse é o <span>OTTO</span>, seu companheiro de navegação
            </h1>
          </div>
          <div className={styles.text2}>
            <p>
              Sempre por aqui para te ajudar, ele é o seu guia dentro do site.
              Pode conversar com ele sempre que quiser — seja para tirar
              dúvidas, entender melhor as funcionalidades ou encontrar o que
              precisa de forma rápida e acessível.
            </p>
          </div>
          <div className={styles.text3}>
            <button onClick={() => setAberto(true)}>
              Conversar com o OTTO
            </button>
          </div>
        </div>
      </div>
      <div className={styles.div2}>
        <img src={Polvo} alt="" />
      </div>
    </section>
  );
}

export default Mascote;