import { Link } from "react-router-dom";
import styles from "../css/PlanosCompletos.module.css";
import Line from "../assets/Planos/line.png";

function PlanosCompletos() {
  return (
    <section className={styles.sec}>
      <h1>Conheça nossos planos</h1>
      <div className={styles.basico_cont}>
        <div className={styles.cont1}>
          <div className={styles.title}>
            <h2>Plataforma</h2>
            <img src={Line} alt="" />
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

          <div className={styles.money}>
            <h4>R$ 00,00</h4>
          </div>
        </div>
        <div className={styles.cont2}>
          <div className={styles.text_title}>
            <h2>Plano Básico</h2>
          </div>

          <div className={styles.text2}>
            <h4>
              Software com o primeiro mês grátis para testes, apenas um avatar e
              banco de sinais limitado.
            </h4>
          </div>

          <div className={styles.btn_cont}>
            <Link to={"/pages/Cadastro"} className={styles.btn}>
              Assinar plano
            </Link>
          </div>
        </div>
      </div>

      {/* Proto totem */}
      <div className={`${styles.basico_cont} ${styles.proto}`}>
        <div className={styles.cont1}>
          <div className={styles.title}>
            <h2>ProtoTotem</h2>
            <img src={Line} alt="" />
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
              <h4>Totem físico na empresa</h4>
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

          <div className={styles.money}>
            <h4>R$ 00,00</h4>
          </div>
        </div>
        <div className={styles.cont2}>
          <div className={styles.text_title}>
            <h2>
              Plano
              <br /> Intermediário
            </h2>
          </div>

          <div className={styles.text2}>
            <h4>
              Software com mais opções de avatares e Totem de atendimento.
            </h4>
          </div>

          <div className={styles.btn_cont}>
            <Link to={"/pages/Cadastro"} className={styles.btn}>
              Assinar plano
            </Link>
          </div>
        </div>
      </div>

      {/* Completo */}
      <div className={`${styles.basico_cont} ${styles.completo}`}>
        <div className={styles.cont1}>
          <div className={styles.title}>
            <h2>Completo</h2>
            <img src={Line} alt="" />
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

          <div className={styles.money}>
            <h4>R$ 00,00</h4>
          </div>
        </div>
        <div className={styles.cont2}>
          <div className={styles.text_title}>
            <h2>Plano Premium</h2>
          </div>

          <div className={styles.text2}>
            <h4>
              Software com Avatar personalizável, múltiplos totens para
              diferentes ambientes, permitindo que os funcionários conversem
              entre si, sinais personalizados de acordo com as palavras
              exclusivas da empresa.
            </h4>
          </div>

          <div className={styles.btn_cont}>
            <Link to={"/pages/Cadastro"} className={styles.btn}>
              Assinar plano
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanosCompletos;
