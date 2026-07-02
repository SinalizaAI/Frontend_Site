import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Cadastro_Etapa2.module.css";
import { cadastrarCliente } from "../lib/api";
import { salvarToken } from "../lib/auth";
import emailIcon from "../assets/Cadastro/email.png";
import nomeIcon from "../assets/Cadastro/profile.png";
import senhaIcon from "../assets/Cadastro/lock.png";
import telefoneIcon from "../assets/Cadastro_Etapa2/telefone.png";
import cnpjIcon from "../assets/Cadastro_Etapa2/cnpj.png";
import razaoSocialIcon from "../assets/Cadastro_Etapa2/razao_social.png";

const Icons = {
  Building: () => (
    <img
      src={razaoSocialIcon}
      alt="Razão Social"
      className={styles.iconImage}
    />
  ),
  Cnpj: () => <img src={cnpjIcon} alt="CNPJ" className={styles.iconImage} />,
  User: () => (
    <img src={nomeIcon} alt="Responsável" className={styles.iconImage} />
  ),
  Mail: () => <img src={emailIcon} alt="Email" className={styles.iconImage} />,
  Phone: () => (
    <img src={telefoneIcon} alt="Telefone" className={styles.iconImage} />
  ),
  Lock: () => <img src={senhaIcon} alt="Senha" className={styles.iconImage} />,
  Eye: ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isOpen ? (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </>
      )}
    </svg>
  ),
};

export default function CadastroCorporativo() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    razaoSocial: "",
    cnpj: "",
    responsavel: "",
    telefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      const masked = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);
      setFormData((prev) => ({ ...prev, cnpj: masked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const etapa1 = JSON.parse(sessionStorage.getItem("cadastroEtapa1"));

      if (!etapa1) {
        alert("Sessão expirada. Volte para a etapa 1.");
        navigate("/Cadastro");
        return;
      }

      const payload = {
        nomeResponsavel: formData.responsavel,
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        email: etapa1.email,
        senha: etapa1.senha,
        telefone: formData.telefone,
      };

      const data = await cadastrarCliente(payload);

      if (data.token) {
        salvarToken(data.token);
      }

      sessionStorage.removeItem("cadastroEtapa1");
      navigate("/Login");
    } catch (err) {
      alert(err.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formBlock}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Nome do responsável <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.iconLeft}>
                <Icons.User />
              </span>
              <input
                type="text"
                name="responsavel"
                placeholder="Nome Completo"
                value={formData.responsavel}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              CNPJ <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.iconLeft}>
                <Icons.Cnpj />
              </span>
              <input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Razão Social <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.iconLeft}>
                <Icons.Building />
              </span>
              <input
                type="text"
                name="razaoSocial"
                placeholder="Razão Social"
                value={formData.razaoSocial}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Telefone <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.iconLeft}>
                <Icons.Phone />
              </span>
              <input
                type="tel"
                name="telefone"
                placeholder="(DDD) Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.footerActions}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar e Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
