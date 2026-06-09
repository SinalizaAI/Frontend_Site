import styles from "../css/Planos.module.css";
import Linha from "../assets/Planos/line.png";
import { Link } from "react-router-dom";

function Planos() {
  return (
    <section className={styles.planos_sec}>
      <div className={styles.container}>
        <h1>Conheça nossos planos</h1>
        <h2>
          Aqui você poderá consultar os planos disponíveis para contratar
          segundo sua necessidade
        </h2>

        <div className={styles.container_planos}>
          
          <div className={`${styles.plano} ${styles.plano_1}`}>
            <div className={styles.nome_p}>
              <h2>Software</h2>
              <img src={Linha} alt="" />
              <h3>R$ 450,00</h3>
            </div>

            <div className={styles.vantagens}>
              <div className={styles.item_vant}>
                <h4> • Software com sinais completos</h4>
              </div>

              <div className={styles.item_vant}>
                <h4> • Avatar personalizável</h4>
              </div>

              <div className={styles.item_vant}>
                <h4> • Sinais personalizados com termos da empresa</h4>
              </div>
            </div>

            <Link to={"/pages/Cadastro"} className={styles.btn}>
              <button>Assine agora</button>
            </Link>
          </div>
          <div className={`${styles.plano} ${styles.plano_2}`}>
            <div className={styles.nome_p}>
              <h2>Totem</h2>
              <img src={Linha} alt="" />
              <h3>R$ 5.000,00</h3>
            </div>

            <div className={styles.vantagens}>
              <div className={styles.item_vant}>
                <h4> • Duas telas para comunicação facilitada entre surdo e ouvinte </h4>
              </div>

              <div className={styles.item_vant}>
                <h4> • Câmera 180° graus</h4>
              </div>

              <div className={styles.item_vant}>
                <h4> • Fones de ouvido para melhor entendimento</h4>
              </div>
            </div>

            <Link to={"/pages/Cadastro"} className={styles.btn}>
              <button>Assine agora</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Planos;
