import { useState } from "react";
import styles from "../css/Fale.module.css";
import { enviarContato } from "../lib/api";

const validarTelefone = (tel) => {
  const numeros = tel.replace(/\D/g, "");
  return numeros.length === 10 || numeros.length === 11;
};

function Fale() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      const masked = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
        .replace(/(\d{4})(\d{1,4})$/, "$1-$2")
        .slice(0, 15);
      setFormData((prev) => ({ ...prev, telefone: masked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarTelefone(formData.telefone)) {
      alert("Telefone inválido. Digite um número com DDD (10 ou 11 dígitos).");
      return;
    }

    setLoading(true);

    try {
      await enviarContato(formData);
      alert("Mensagem enviada com sucesso!");
      setFormData({ nome: "", telefone: "", email: "", mensagem: "" });
    } catch (err) {
      alert(err.message || "Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.fale_sec}>
      <h1>Fale conosco</h1>

      <div className={styles.container}>
        <div className={styles.div1}>
          <div className={styles.texts}>
            <h2>Endereço</h2>
            <p>Rua Tito 54, Lapa, São Paulo</p>
          </div>

          <div className={styles.texts}>
            <h2>Telefone</h2>
            <p>11 9578963541</p>
          </div>

          <div className={styles.texts}>
            <h2>E-mail</h2>
            <p>Sinalizaai@gmail.com</p>
          </div>

          <div className={styles.mapa}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.1227833051876!2d-46.69433512489202!3d-23.52808587882268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8775663b04f%3A0x923835e9005f8309!2sSenac%20Lapa%20Tito!5e0!3m2!1spt-BR!2sbr!4v1778101152979!5m2!1spt-BR!2sbr"
              title="Mapa"
            />
          </div>
        </div>

        <div className={styles.div2}>
          <h2>Entre em contato</h2>

          <form className={styles.container_div2} onSubmit={handleSubmit}>
            <div className={styles.container_form}>
              <label htmlFor="nome">Seu nome</label>
              <input
                id="nome"
                type="text"
                name="nome"
                placeholder=" "
                required
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            <div className={styles.container_form}>
              <label htmlFor="telefone">Seu telefone</label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                placeholder="(11) 91234-5678"
                required
                value={formData.telefone}
                onChange={handleChange}
                pattern="\(\d{2}\) \d{4,5}-\d{4}"
                title="Digite um telefone válido com DDD. Ex: (11) 91234-5678"
              />
            </div>

            <div className={styles.container_form}>
              <label htmlFor="email">Seu e-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="seuemail@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.container_form}>
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={6}
                required
                value={formData.mensagem}
                onChange={handleChange}
              />
            </div>

            <div className={styles.btn}>
              <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Fale;
