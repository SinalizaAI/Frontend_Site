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
              <h2>Plataforma</h2>
              <img src={Linha} alt="" />
              <h3>R$ 00,00</h3>
            </div>

            <div className={styles.vantagens}>
              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Software com sinais essenciais</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>1° mês gratuito</h4>
              </div>
            </div>
            <div className={styles.texts_n}>
              <h4>
                Software com o primeiro mês grátis para testes, apenas um avatar
                e banco de sinais limitado.
              </h4>
            </div>

            <Link to={"/pages/Cadastro"} className={styles.btn}>
              <button>Assine agora</button>
            </Link>
          </div>
          <div className={`${styles.plano} ${styles.plano_2}`}>
            <div className={styles.nome_p}>
              <h2>ProtoTotem</h2>
              <img src={Linha} alt="" />
              <h3>R$ 00,00</h3>
            </div>

            <div className={styles.vantagens}>
              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Software com sinais essenciais</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>1° mês gratuito</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Totem físico na empresa</h4>
              </div>
            </div>

            <div className={styles.texts_n}>
              <h4>
                Software com mais opções de avatares e Totem de atendimento.
              </h4>
            </div>

            <Link to={"/pages/Cadastro"} className={styles.btn}>
              <button>Assine agora</button>
            </Link>
          </div>
          <div className={`${styles.plano} ${styles.plano_3}`}>
            <div className={styles.recomendado}>
              <h3>Recomendado</h3>
            </div>
            <div className={styles.nome_p}>
              <h2>Completo</h2>
              <img src={Linha} alt="" />
              <h3>R$ 00,00</h3>
            </div>

            <div className={styles.vantagens}>
              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Software com sinais essenciais</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Avatar e sinais personalizados</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Vocabulário da empresa</h4>
              </div>

              <div className={styles.item_vant}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                >
                  <path
                    d="M3.25 18L7.3125 13.9375L15.4375 22.0625L31.6875 5.8125L35.75 9.875L15.4375 30.1875L3.25 18Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h4>Múltiplos totens</h4>
              </div>
            </div>

            <div className={styles.texts_n}>
              <h4>
                Software com Avatar personalizável, múltiplos totens para
                diferentes ambientes, permitindo que os funcionários conversem
                entre si, sinais personalizados de acordo com as palavras
                exclusivas da empresa.{" "}
              </h4>
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
