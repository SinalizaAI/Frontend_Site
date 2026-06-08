import React, { useState } from "react";
import styles from "../css/Usuario.module.css";

function Usuario() {
  const [activeTab, setActiveTab] = useState("Perfil");

  return (
    <div className={styles.container}>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        
        {/* Header da Página */}
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Meu Perfil</h1>
            <p className={styles.pageSubtitle}>Gerencie suas informações pessoais e preferências.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={`${styles.iconButton} ${styles.relative}`}>
              <svg className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className={styles.notificationDot}></span>
            </button>
            <button className={styles.iconButton}>
              <svg className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
            </button>
          </div>
        </header>

        {/* Card do Perfil */}
        <section className={styles.profileCard}>
          <div className={styles.profileInfoLeft}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar3D}>👦🏾</div>
              <button className={styles.cameraButton}>
                <svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </div>

            <div className={styles.userMeta}>
              <div className={styles.nameBadgeRow}>
                <h2 className={styles.userName}>João Silva</h2>
              </div>
              <div className={styles.userDataList}>
                <p>✉️ joaosilva@email.com</p>
                <p>📞 (11) 99999-9999</p>
                <p>📅 15/04/2002</p>
                <p>📍 São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>

          <div className={styles.profileInfoRight}>
            <button className={styles.editProfileBtn}>
              <svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              Editar Perfil
            </button>
          </div>
        </section>

        {/* Abas Internas */}
        <nav className={styles.tabsNav}>
          <TabItem active={activeTab === "Perfil"} label="Perfil" icon={<svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>} onClick={() => setActiveTab("Perfil")} />
          <TabItem active={activeTab === "Segurança"} label="Segurança" icon={<svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} onClick={() => setActiveTab("Segurança")} />
          <TabItem active={activeTab === "Preferências"} label="Preferências" icon={<svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} onClick={() => setActiveTab("Preferências")} />
          <TabItem active={activeTab === "Assinatura"} label="Assinatura" icon={<svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>} onClick={() => setActiveTab("Assinatura")} />
          <TabItem active={activeTab === "Dispositivos"} label="Dispositivos" icon={<svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} onClick={() => setActiveTab("Dispositivos")} />
        </nav>

        {/* Grade de Seções Inferiores */}
        <div className={styles.sectionsGrid}>
          
          {/* Coluna da Esquerda (Formulário + Detalhes) */}
          <div className={styles.leftColumn}>
            
            {/* Informações Pessoais */}
            <section className={styles.contentCard}>
              <div className={styles.cardHeaderTitle}>
                <div className={styles.blueIcon}>
                  <svg className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <h3 className={styles.cardTitle}>Informações Pessoais</h3>
              </div>

              <form className={styles.formGrid}>
                <InputField label="Nome Completo" defaultValue="João Silva" />
                <InputField label="Email" defaultValue="joaosilva@email.com" type="email" />
                <InputField label="Telefone" defaultValue="(11) 99999-9999" />
                <InputField label="Data de nascimento" defaultValue="2002-04-15" type="date" />
                <InputField label="Cidade" defaultValue="São Paulo" />
                
                <div>
                  <label className={styles.inputLabel}>País</label>
                  <select className={styles.selectField}>
                    <option>Brasil</option>
                  </select>
                </div>

                <div className={styles.formActionRow}>
                  <button type="button" className={styles.saveChangesBtn}>
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </section>

            {/* Subcards: Segurança e Preferências */}
            <div className={styles.subCardsGrid}>
              
              {/* Segurança da Conta */}
              <section className={`${styles.contentCard} ${styles.flexColJustify}`}>
                <div>
                  <div className={styles.cardHeaderTitle}>
                    <div className={styles.blueIcon}>
                      <svg className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 className={styles.cardTitle}>Segurança da Conta</h3>
                  </div>

                  <div className={styles.securityRowsContainer}>
                    <SecurityRow 
                      icon={<svg className={styles.midSvgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>} 
                      title="Alterar senha" 
                      subtitle="Atualize sua senha de acesso" 
                    />

                    <SecurityRow 
                      icon={<svg className={styles.midSvgIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} 
                      title="Gerenciar sessões" 
                      subtitle="Veja e gerencie seus dispositivos conectados" 
                    />
                  </div>
                </div>
              </section>

              {/* Preferências de Libras */}
              <section className={styles.contentCard}>
                <div className={styles.cardHeaderTitle}>
                  <div className={styles.blueIcon}>
                    <svg className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                  </div>
                  <h3 className={styles.cardTitle}>Preferências de Libras</h3>
                </div>

                <div className={styles.prefContainer}>
                  <div>
                    <label className={styles.prefLabel}>Mão dominante</label>
                    <div className={styles.toggleButtonGroup}>
                      <button type="button" className={styles.toggleBtnInactive}>Esquerda</button>
                      <button type="button" className={styles.toggleBtnActive}>Direita</button>
                    </div>
                  </div>

                  <div>
                    <div className={styles.sliderHeader}>
                      <span>Velocidade do avatar</span>
                      <span className={styles.sliderValue}>Normal</span>
                    </div>
                    <input type="range" min="1" max="3" defaultValue="2" className={styles.rangeSlider} />
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Coluna da Direita (Plano Atual) */}
          <div className={styles.rightColumn}>
            <section className={`${styles.contentCard} ${styles.fullHeightFlex}`}>
              <div>
                <div className={styles.planHeaderContainer}>
                  <span className={styles.crownEmoji}>👑</span>
                  <h3 className={styles.cardTitle}>Plano Atual</h3>
                </div>

                <div className={styles.planBox}>
                  <div className={styles.planTitleRow}>
                    <h4 className={styles.planName}>Plano Completo</h4>
                    <span className={styles.activeBadge}>Ativo</span>
                  </div>

                  <p className={styles.billingText}>
                    Próxima cobrança<br />
                    <span className={styles.billingDate}>15 de julho de 2025</span>
                  </p>

                  <ul className={styles.featuresList}>
                    <PlanFeature label="Tradução ilimitada" />
                    <PlanFeature label="Avatar 3D" />
                    <PlanFeature label="Histórico ilimitado" />
                    <PlanFeature label="Suporte prioritário" />
                    <PlanFeature label="Recursos avançados" />
                  </ul>
                </div>
              </div>

              <div className={styles.planActions}>
                <button className={styles.managePlanBtn}>
                  Gerenciar Plano
                </button>
                <button className={styles.planDetailsLink}>
                  Ver detalhes da assinatura
                </button>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

/* COMPONENTES AUXILIARES LOCAIS */
function SidebarItem({ icon, label, active = false }) {
  return (
    <a href="#" className={`${styles.sidebarItem} ${active ? styles.sidebarItemActive : ""}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function TabItem({ icon, label, active = false, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.tabItem} ${active ? styles.tabItemActive : ""}`}>
      {icon}
      {label}
    </button>
  );
}

function InputField({ label, defaultValue, type = "text" }) {
  return (
    <div>
      <label className={styles.inputLabel}>{label}</label>
      <input type={type} defaultValue={defaultValue} className={styles.inputField} />
    </div>
  );
}

function SecurityRow({ icon, title, subtitle }) {
  return (
    <div className={styles.securityRowClickable}>
      <div className={styles.securityRowLeft}>
        <div className={styles.grayIconRow}>{icon}</div>
        <div>
          <h4 className={styles.securityRowTitleClickable}>{title}</h4>
          <p className={styles.securityRowSubtitle}>{subtitle}</p>
        </div>
      </div>
      <span className={styles.arrowIcon}>
        <svg className={styles.smallSvgIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </span>
    </div>
  );
}

function PlanFeature({ label }) {
  return (
    <li className={styles.featureItem}>
      <div className={styles.checkCircle}>
        <svg className={styles.checkSvg} fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
      </div>
      {label}
    </li>
  );
}

export default Usuario;