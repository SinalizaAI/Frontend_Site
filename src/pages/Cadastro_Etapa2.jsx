<<<<<<< Updated upstream
import React, { useState } from 'react';
// 1. IMPORTAR O HOOK DE NAVEGAÇÃO
import { useNavigate } from 'react-router-dom'; 

=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import styles from "../css/Cadastro_Etapa2.module.css";
import { cadastrarCliente } from "../lib/api"; // ✅ importe seu serviço
import { salvarToken } from "../lib/auth"; // ✅ importe auth
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

<<<<<<< Updated upstream
    Eye: ({ isOpen }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    )
};

export default function CadastroCorporativo() {
    // 2. INICIALIZAR O NAVIGATE
    const navigate = useNavigate(); 

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        responsavel: '',
        email: '',
        telefone: '',
        senha: '',
        aceitaTermos: false
    });
=======
  // Modificado para aceitar o estado e alternar os caminhos do SVG
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
        // SVG do Olho Aberto
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        // SVG do Olho Fechado (Com o risco diagonal)
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
>>>>>>> Stashed changes

  const handleChange = (e) => {
    const { name, value } = e.target;

<<<<<<< Updated upstream
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);

    // [Futuramente]: Sua validação de dados vai entrar bem aqui.
    // Se a validação passar, ele executa a linha abaixo:

    // CORREÇÃO: O caminho exato correspondente ao path da sua rota
    navigate('/pages/Usuario'); 
};
=======
    // ✅ Máscara simples de CNPJ
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
>>>>>>> Stashed changes

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Recupera dados da etapa 1
      const etapa1 = JSON.parse(sessionStorage.getItem("cadastroEtapa1"));

      if (!etapa1) {
        alert("Sessão expirada. Volte para a etapa 1.");
        navigate("/Cadastro");
        return;
      }

      // ✅ Monta payload completo para o backend
      const payload = {
        nomeResponsavel: formData.responsavel, // ✅ era "responsavel", backend espera "nomeResponsavel"
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        email: etapa1.email,
        senha: etapa1.senha, // backend vai fazer o hash, não mande "senhaHash"
        telefone: formData.telefone,
      };

      const data = await cadastrarCliente(payload);

      // ✅ Salva token se o backend retornar um
      if (data.token) {
        salvarToken(data.token);
      }

      // ✅ Limpa dados temporários
      sessionStorage.removeItem("cadastroEtapa1");

      navigate("/Login"); // redireciona após sucesso
    } catch (err) {
      alert(err.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* ... header igual ao original ... */}

      <div className={styles.formBlock}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Responsável */}
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

<<<<<<< Updated upstream
            <div className={styles.formBlock}>
                <div className={styles.headerInternal}>
                    <h2 className={styles.titleInternal}>Complete seu cadastro com seus dados</h2>
                    <p className={styles.subtitleInternal}>Dados de Pessoa Jurídica</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* ... (Seus campos de input permanecem exatamente iguais) ... */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nome do responsável <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.User /></span>
                            <input type="text" name="responsavel" placeholder="Nome Completo" value={formData.responsavel} onChange={handleChange} required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>CNPJ <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.Cnpj /></span>
                            <input type="text" name="cnpj" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleChange} required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Razão Social <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.Building /></span>
                            <input type="text" name="razaoSocial" placeholder="Razão Social" value={formData.razaoSocial} onChange={handleChange} required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.Mail /></span>
                            <input type="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Telefone <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.Phone /></span>
                            <input type="tel" name="telefone" placeholder="(DDD) Telefone" value={formData.telefone} onChange={handleChange} required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Senha (mínimo 8 caracteres) <span className={styles.required}>*</span></label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.iconLeft}><Icons.Lock /></span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="senha"
                                placeholder="Senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                                minLength={8}
                                className={styles.input}
                            />
                            <button
                                type="button"
                                className={styles.iconRight}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Icons.Eye isOpen={showPassword} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.footerActions}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="aceitaTermos" name="aceitaTermos" checked={formData.aceitaTermos} onChange={handleChange} required className={styles.checkbox} />
                            <label htmlFor="aceitaTermos" className={styles.checkboxLabel}>
                                Confirmo que li e aceito os <a href="#" className={styles.link}>termos de uso</a>.
                            </label>
                        </div>

                        {/* Seu botão permanece intacto, pois o gatilho é o onSubmit do formulário */}
                        <button type="submit" className={styles.submitBtn}>
                            Enviar e Cadastrar
                        </button>
                    </div>
                </form>
=======
          {/* CNPJ */}
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
>>>>>>> Stashed changes
            </div>
          </div>

          {/* Razão Social */}
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

          {/* Telefone */}
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
