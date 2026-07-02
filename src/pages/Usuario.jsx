import styles from "../css/Usuario.module.css";
import perfilIcon from "../assets/Usuario/perfil.png";
import cameraIcon from "../assets/Usuario/camera.png";
import segurançaIcon from "../assets/Usuario/segurança.png";
import senhaIcon from "../assets/Usuario/senha.png";
import verificacaoIcon from "../assets/Usuario/verificacao.png";
import librasIcon from "../assets/Usuario/libras.png";
import { atualizarCliente } from "../lib/api";
import { useEffect, useState } from "react";
import { buscarCliente } from "../lib/api";
import { getIdDoToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { desativarCliente } from "../lib/api";
import { removerToken } from "../lib/auth";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    razaoSocial: "",
    cnpj: "",
    cidade: "",
    pais: "Brasil",
    telefone: "",
    dataNascimento: "",
    criadoEm: "",
  });

  const navigate = useNavigate();

  async function handleAlterarSenha() {
    const novaSenha = window.prompt(
      "Digite sua nova senha (mínimo 8 caracteres):",
    );

    if (!novaSenha) return;

    if (novaSenha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    try {
      const id = getIdDoToken();
      await atualizarCliente(id, { senha: novaSenha });
      alert("Senha alterada com sucesso!");
    } catch (err) {
      alert(err.message || "Erro ao alterar senha.");
    }
  }

  async function handleExcluirConta() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
    );
    if (!confirmar) return;

    try {
      const id = getIdDoToken();
      await desativarCliente(id);
      removerToken();
      navigate("/Login");
    } catch (err) {
      alert(err.message || "Erro ao excluir conta.");
    }
  }

  useEffect(() => {
    async function carregarDados() {
      const id = getIdDoToken();
      if (!id) return;

      try {
        const data = await buscarCliente(id);
        setFormData({
          nomeCompleto: data.nomeResponsavel || "",
          email: data.email || "",
          razaoSocial: data.razaoSocial || "",
          cnpj: data.cnpj || "",
          cidade: data.cidade || "",
          pais: data.pais || "Brasil",
          telefone: data.telefone || "",
          dataNascimento: data.dataNascimento || "",
          criadoEm: data.criadoEm || "", // ← adicione
        });
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    }

    carregarDados();
  }, []);

  const [librasPrefs, setLibrasPrefs] = useState({
    maoDominante: "Direita",
    velocidadeAvatar: 100,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const id = getIdDoToken();

      // Só envia os campos que o backend conhece
      const payload = {
        nomeResponsavel: formData.nomeCompleto,
        razaoSocial: formData.razaoSocial,
        email: formData.email,
        telefone: formData.telefone,
        cidade: formData.cidade, // novo
        pais: formData.pais, // novo
        dataNascimento: formData.dataNascimento || null, // novo
      };

      await atualizarCliente(id, payload);
      alert("Alterações salvas com sucesso!");
    } catch (err) {
      alert(err.message || "Erro ao salvar alterações.");
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {/* 1. TABELA COM AS INFORMAÇÕES PESSOAIS (Card Superior) */}
      <header className={styles["profile-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["avatar-wrapper"]}>
            <div className={styles["avatar-placeholder"]}>
              <img
                src={perfilIcon}
                alt="Perfil"
                className={styles["avatar-image-render"]}
              />
            </div>
            <button className={styles["change-photo-btn"]} title="Alterar foto">
              <img
                src={cameraIcon}
                alt="Alterar foto"
                className={styles["inline-icon-img"]}
              />
            </button>
          </div>
          <div className={styles["header-info"]}>
            <h2>{formData.nomeCompleto || "Nome do Usuário"}</h2>
            <p>
              <strong>Email:</strong> {formData.email || "usuario@email.com"}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {formData.telefone || "(00) 00000-0000"}
            </p>
            <span className={styles["creation-date"]}>
              Data de criação:{" "}
              {formData.criadoEm
                ? new Date(formData.criadoEm).toLocaleDateString("pt-BR")
                : "—"}
            </span>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (GRID TOTALMENTE DESAGRUPADO) */}
      <div className={styles["profile-content-grid"]}>
        {/* 2. INFORMAÇÕES PESSOAIS E CORPORATIVAS */}
        <section
          className={`${styles["profile-section"]} ${styles["card"]} ${styles["section-corporative"]}`}
        >
          <h3>
            <img
              src={perfilIcon}
              alt="Usuário"
              className={styles["inline-icon-title"]}
            />
            Informações Pessoais e Corporativas
          </h3>
          <form onSubmit={handleSave} className={styles["form-grid"]}>
            <div className={`${styles["form-group"]} ${styles["row-1"]}`}>
              <label>Nome Completo</label>
              <input
                type="text"
                name="nomeCompleto"
                placeholder="Ex: João Silva"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
              />
            </div>

            <div className={`${styles["form-group"]} ${styles["row-1"]}`}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Ex: joaosilva@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={`${styles["form-group"]} ${styles["row-2"]}`}>
              <label>Razão Social</label>
              <input
                type="text"
                name="razaoSocial"
                placeholder="Razão Social"
                value={formData.razaoSocial}
                onChange={handleInputChange}
              />
            </div>

            <div className={`${styles["form-group"]} ${styles["row-2"]}`}>
              <label>CNPJ</label>
              <input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${styles["form-group"]} ${styles["row-3"]} ${styles["quarterly"]}`}
            >
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                placeholder="Ex: São Paulo"
                value={formData.cidade}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${styles["form-group"]} ${styles["row-3"]} ${styles["quarterly"]}`}
            >
              <label>País</label>
              <select
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
              >
                <option value="Brasil">Brasil</option>
                <option value="Portugal">Portugal</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div
              className={`${styles["form-group"]} ${styles["row-3"]} ${styles["quarterly"]}`}
            >
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                placeholder="(DDD) Telefone"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${styles["form-group"]} ${styles["row-3"]} ${styles["quarterly"]}`}
            >
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["form-actions"]}>
              <button type="submit" className={styles["save-btn"]}>
                Salvar Alterações
              </button>
            </div>
          </form>
        </section>

        {/* 3. PLANO ATUAL */}
        <aside
          className={`${styles["sidebar-column"]} ${styles["section-plan"]}`}
        >
          <section className={styles["plan-card"]}>
            <div className={styles["plan-header"]}>
              <h3>Plano Atual</h3>
            </div>

            <div className={styles["plan-details-box"]}>
              <div className={styles["plan-price"]}>R$ 450,00</div>
              <p className={styles["billing-info"]}>
                Próxima cobrança
                <br />
                <strong>15 de julho de 2025</strong>
              </p>

              <ul className={styles["plan-features-list"]}>
                <li>Software com sinais completos</li>
                <li>Avatar personalizável</li>
                <li>Sinais personalizados com termos da empresa</li>
              </ul>
            </div>

            <button type="button" className={styles["manage-plan-btn"]}>
              Gerenciar Plano
            </button>
            <button type="button" className={styles["view-details-link"]}>
              Ver detalhes da assinatura
            </button>
          </section>
        </aside>

        {/* 4. PREFERÊNCIAS DE LIBRAS */}
        <section
          className={`${styles["profile-section"]} ${styles["card"]} ${styles["section-libras"]}`}
        >
          <h3>
            <img
              src={librasIcon}
              alt="Libras"
              className={styles["inline-icon-title"]}
            />
            Preferências de Libras
          </h3>
          <div className={styles["libras-controls"]}>
            <div className={styles["control-group"]}>
              <label>Mão dominante</label>
              <div className={styles["toggle-container"]}>
                <button
                  type="button"
                  className={`${styles["toggle-btn"]} ${librasPrefs.maoDominante === "Esquerda" ? styles["active"] : ""}`}
                  onClick={() =>
                    setLibrasPrefs((prev) => ({
                      ...prev,
                      maoDominante: "Esquerda",
                    }))
                  }
                >
                  Esquerda
                </button>
                <button
                  type="button"
                  className={`${styles["toggle-btn"]} ${librasPrefs.maoDominante === "Direita" ? styles["active"] : ""}`}
                  onClick={() =>
                    setLibrasPrefs((prev) => ({
                      ...prev,
                      maoDominante: "Direita",
                    }))
                  }
                >
                  Direita
                </button>
              </div>
            </div>

            <div className={styles["control-group"]}>
              <div className={styles["slider-header"]}>
                <label>Velocidade do avatar</label>
                <span className={styles["slider-value"]}>
                  {librasPrefs.velocidadeAvatar === 100
                    ? "Normal"
                    : `${librasPrefs.velocidadeAvatar / 100}x`}
                </span>
              </div>
              <div className={styles["slider-container"]}>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="25"
                  value={librasPrefs.velocidadeAvatar}
                  onChange={(e) =>
                    setLibrasPrefs((prev) => ({
                      ...prev,
                      velocidadeAvatar: Number(e.target.value),
                    }))
                  }
                  className={styles["avatar-slider"]}
                />
                <div className={styles["slider-labels"]}>
                  <span>0.5x</span>
                  <span>0.75x</span>
                  <span>1.0x</span>
                  <span>1.25x</span>
                  <span>1.5x</span>
                  <span>2.0x</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SEGURANÇA E CONTA */}
        <section
          className={`${styles["profile-section"]} ${styles["card"]} ${styles["section-security"]}`}
        >
          <h3>
            <img
              src={segurançaIcon}
              alt="Segurança"
              className={styles["inline-icon-title"]}
            />
            Segurança e Conta
          </h3>
          <div className={styles["clickable-options-list"]}>
            <button
              type="button"
              className={styles["clickable-option-row"]}
              onClick={() => alert("Duas etapas")}
            >
              <span className={styles["option-label"]}>
                <img
                  src={verificacaoIcon}
                  alt="Verificação"
                  className={styles["inline-icon-row"]}
                />{" "}
                Verificação de duas etapas
              </span>
              <span className={styles["arrow"]}>›</span>
            </button>

            <button
              type="button"
              className={styles["clickable-option-row"]}
              onClick={handleAlterarSenha}
            >
              <span className={styles["option-label"]}>
                <img
                  src={senhaIcon}
                  alt="Chave"
                  className={styles["inline-icon-row"]}
                />{" "}
                Alterar senha
              </span>
              <span className={styles["arrow"]}>›</span>
            </button>

            <button
              type="button"
              className={`${styles["clickable-option-row"]} ${styles["delete-account-row"]}`}
              onClick={handleExcluirConta}
            >
              <span className={styles["option-label"]}>
                Excluir minha conta
              </span>
              <span className={styles["arrow"]}>›</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
