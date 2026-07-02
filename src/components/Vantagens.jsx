import { useState, useEffect } from "react";
import styles from "../css/Vantagens.module.css";
import Imagem_1 from "../assets/Vantagens/Vantagem1.png";
import Imagem_2 from "../assets/Vantagens/Vantagem2.png";
import Imagem_3 from "../assets/Vantagens/Vantagem3.png";
import Imagem_4 from "../assets/Vantagens/Vantagem4.png";
import Imagem_5 from "../assets/Vantagens/Vantagem5.png";
import Imagem_6 from "../assets/Vantagens/Vantagem6.png";

const itens = [
  {
    imagem: Imagem_1,
    titulo: "Acessibilidade real",
    descricao: "Inclusão de pessoas surdas no atendimento sem depender exclusivamente de intérpretes humanos.",
  },
  {
    imagem: Imagem_2,
    titulo: "Atendimento mais rápido",
    descricao: "Comunicação imediata, reduz filas e tempo de espera.",
  },
  {
    imagem: Imagem_3,
    titulo: "Padronização do atendimento",
    descricao: "Garante comunicação consistente em todos os canais.",
  },
  {
    imagem: Imagem_4,
    titulo: "Melhora na experiência",
    descricao: "Atendimento mais confortável, autônomo e inclusivo.",
  },
  {
    imagem: Imagem_5,
    titulo: "Prestígio social",
    descricao: "Destaca a empresa como inovadora e socialmente responsável.",
  },
  {
    imagem: Imagem_6,
    titulo: "Conformidade legal",
    descricao: "Ajuda sua empresa a cumprir a Lei Brasileira de Inclusão.",
  },
];

function Vantagens() {
  const [ativo, setAtivo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verificar = () => setIsMobile(window.innerWidth <= 1024);
    verificar();
    window.addEventListener("resize", verificar);
    return () => window.removeEventListener("resize", verificar);
  }, []);

  const handleClick = (i) => {
    if (!isMobile) return;
    setAtivo((prev) => (prev === i ? null : i));
  };

  const handleMouseEnter = (i) => {
    if (isMobile) return;
    setAtivo(i);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setAtivo(null);
  };

  return (
    <section className={styles.vantagens_sec} id="vantagens">
      <h1>Vantagens de usar o SinalizaAI</h1>
      <h2 className={styles.txt2}>
        {isMobile
          ? "Toque nas imagens para ver as vantagens"
          : "Passe o mouse sobre as imagens para ver as vantagens"}
      </h2>

      <div className={styles.gallery_wrap}>
        {itens.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${ativo === i ? styles.item_ativo : ""}`}
            style={{ backgroundImage: `url(${item.imagem})` }}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.item_overlay}>
              <h2>{item.titulo}</h2>
              <p>{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Vantagens;