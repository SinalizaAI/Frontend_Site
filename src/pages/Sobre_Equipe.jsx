// src/components/HoverSliderDemo.jsx
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext,
} from "../components/Equipe";

import Kaue from "../assets/Sobre_Equipe/kaue.jpg";
import Soares from "../assets/Sobre_Equipe/soares.jpeg";
import Gustavo from "../assets/Sobre_Equipe/gustavo.jpeg";
import Ryan from "../assets/Sobre_Equipe/ryan.jpeg";
import Isis from "../assets/Sobre_Equipe/isis.jpeg";
import Thay from "../assets/Sobre_Equipe/thay.jpeg";

import FotoEquipe from "../assets/Sobre_Equipe/equipe.png";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiMongodb,
  SiPhp,
  SiGraphql,
  SiFlutter,
  SiKotlin,
  SiLinux,
  SiMysql,
} from "react-icons/si";

import {
  FaJava,
  FaCss3Alt,
  FaAws,
  FaGithub,
  FaLinkedin,
  FaBehance,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

// ─── Mapa de tecnologias ─────────────────────────────────────────────────────

const techIconMap = {
  React: { icon: SiReact, color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  "Node.js": { icon: SiNodedotjs, color: "#539E43" },
  PostgreSQL: { icon: SiPostgresql, color: "#336791" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  Framer: { icon: SiFigma, color: "#0099FF" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: FaCss3Alt, color: "#264DE4" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Java: { icon: FaJava, color: "#E76F00" },
  Python: { icon: SiPython, color: "#3776AB" },
  Vue: { icon: SiVuedotjs, color: "#41B883" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  MongoDB: { icon: SiMongodb, color: "#13AA52" },
  AWS: { icon: FaAws, color: "#FF9900" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  Flutter: { icon: SiFlutter, color: "#54C5F8" },
  Kotlin: { icon: SiKotlin, color: "#7F52FF" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
};

// ─── Ícones de redes sociais ──────────────────────────────────────────────────

const redesIcones = {
  github: { icon: FaGithub, label: "GitHub", hoverColor: "#181717" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn", hoverColor: "#0A66C2" },
  behance: { icon: FaBehance, label: "Behance", hoverColor: "#1769FF" },
};

// ─── SLIDES ──────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: "slide-1",
    title: "Amanda Soares",
    color: "#44008c",
    cargo: "PO e Front-End",
    techs: ["JavaScript", "Java", "React", "HTML"],
    redes: {
      github: "https://github.com/Alexyycb",
      linkedin: "https://www.linkedin.com/in/amanda-soares-da-silva/",
    },
    imageUrl: Soares,
  },
  {
    id: "slide-2",
    title: "Gustavo Bozzo",
    color: "#000080",
    cargo: "Scrum e Back-End",
    techs: ["Java", "Python", "React", "MySQL"],
    redes: {
      github: "https://github.com/Gusbzz",
      linkedin: "https://www.linkedin.com/in/gustavobozzo/",
    },
    imageUrl: Gustavo,
  },
  {
    id: "slide-3",
    title: "Ismaiara Vieira",
    color: "#f86b00",
    cargo: "Marketing e Front-End",
    techs: ["JavaScript", "React", "Java", "HTML"],
    redes: {
      github: "https://github.com/ismaiaradasilvavieira04-droid",
      linkedin:
        "https://www.linkedin.com/in/ismaiara-da-silva-vieira-a92713348/",
    },
    imageUrl: Isis,
  },
  {
    id: "slide-4",
    title: "Kauê Siqueira",
    color: "#0000d5",
    cargo: "UI/UX e Full-Stack",
    techs: ["Python", "Java", "JavaScript", "React"],
    redes: {
      github: "https://github.com/KaueSiqueira54",
      linkedin: "https://www.linkedin.com/in/kauesiqueiradev/",
    },
    imageUrl: Kaue,
  },
  {
    id: "slide-5",
    title: "Ryan Almeida",
    color: "#6A4C93",
    cargo: "Financeiro e Back-End",
    techs: ["React", "MySQL", "JavaScript", "Java"],
    redes: {
      github: "https://github.com/ryann-08",
      linkedin: "https://www.linkedin.com/in/ryan-almeida-dev/",
    },
    imageUrl: Ryan,
  },
  {
    id: "slide-6",
    title: "Thayna Mateus",
    color: "#082256",
    cargo: "Marketing e Front-End",
    techs: ["Java", "React", "MySQL"],
    redes: {
      github: "https://github.com/thaynamateus",
      linkedin: "https://www.linkedin.com/in/thaynamateus/",
    },
    imageUrl: Thay,
  },
];

// ─── Painel "Sobre Nós" ───────────────────────────────────────────────────────

function SobreNosPanel({ onClose }) {
  return (
    <motion.div
      key="sobre-nos"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute left-0 right-0 top-0 bottom-0 flex flex-col overflow-y-auto"
      style={{ background: "rgba(233,239,242,1)", zIndex: 4 }}
    >
      {/* Botão Voltar */}
      <div
        className="flex items-start justify-center px-4 sm:px-8 md:px-12 flex-shrink-0"
        style={{ paddingTop: "96px", paddingBottom: "24px" }} // ← era "32px", agora "96px"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2"
          aria-label="Voltar"
        >
          <motion.span
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2"
            style={{ color: "#023759" }}
          >
            <FaChevronLeft size={20} />
            <span
              className="uppercase tracking-widest text-sm font-semibold"
              style={{ fontFamily: "var(--fonte_inter), sans-serif" }}
            >
              Voltar
            </span>
          </motion.span>
        </button>
      </div>

      {/* Wrapper centralizado */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex flex-col items-center gap-8 w-full max-w-2xl"
        >
          {/* Foto da equipe */}
          <div
            className="w-full overflow-hidden"
            style={{
              borderRadius: "12px",
              border: "2px solid #02375920",
              boxShadow: "0 8px 32px #02375918",
            }}
          >
            <img
              src={FotoEquipe}
              alt="Foto da equipe"
              className="w-full object-cover"
              style={{ maxHeight: "380px" }}
            />
          </div>

          {/* Título + divisor */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tighter"
              style={{
                color: "#023759",
                fontFamily: "var(--fonte_lexend), sans-serif",
              }}
            >
              Sobre Nós
            </h2>
            <div
              className="w-12 h-1 rounded-full"
              style={{ background: "#023759" }}
            />
          </div>

          {/* Textos */}
          <div
            className="flex flex-col gap-4 text-center max-w-xl"
            style={{ marginBottom: "50px" }}
          >
            <p
              className="leading-relaxed"
              style={{
                fontSize: "clamp(14px, 4vw, 20px)",
                color: "#02375599",
                fontFamily: "var(--fonte_inter), sans-serif",
              }}
            >
              Somos proanos apaixonados por tecnologia, movidos pelo entusiamo e
              propósito de tornar a comunicação mais acessível. Cada integrante
              contribui com conhecimentos e habilidades únicas no
              desenvolvimento do nosso software, unindo conhecimento técnico,
              criatividade, trabalho em equipe e empatia.
            </p>
            {/* <p
              className="leading-relaxed"
              style={{
                fontSize: "clamp(13px, 1.6vw, 15px)",
                color: "#02375566",
                fontFamily: "var(--fonte_inter), sans-serif",
              }}
            >
              Unidos pela curiosidade e pelo desejo de evoluir constantemente,
              trabalhamos de forma colaborativa, ágil e com muito propósito.
            </p> */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── SlideList ────────────────────────────────────────────────────────────────

function SlideList() {
  const { activeSlide } = useHoverSliderContext();

  return (
    <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 w-full">
      {SLIDES.map((slide, index) => (
        <div key={slide.id}>
          <TextStaggerHover
            index={index}
            className="cursor-pointer text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter text-left"
            text={slide.title}
            style={{
              color: "#023759",
              fontFamily: "var(--fonte_lexend), sans-serif",
            }}
          />

          <AnimatePresence>
            {activeSlide === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="mt-2 flex flex-col gap-2 items-start">
                  <p
                    className="uppercase tracking-widest text-left"
                    style={{
                      fontSize: "clamp(11px, 1.5vw, 16px)",
                      color: slide.color,
                      fontFamily: "var(--fonte_inter), sans-serif",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {slide.cargo}
                  </p>

                  <div className="flex flex-row gap-3 justify-start">
                    {Object.entries(slide.redes).map(([rede, url]) => {
                      const entry = redesIcones[rede];
                      if (!entry) return null;
                      const Icon = entry.icon;
                      return (
                        <a
                          key={rede}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#02375966",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = entry.hoverColor)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "#02375966")
                          }
                          aria-label={entry.label}
                        >
                          <Icon size={22} className="sm:hidden" />
                          <Icon size={28} className="hidden sm:block" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── TechPanel ────────────────────────────────────────────────────────────────

function TechPanel() {
  const { activeSlide } = useHoverSliderContext();
  const slide = SLIDES[activeSlide];

  return (
    <div className="flex flex-row flex-wrap gap-4 sm:gap-6 items-center justify-center py-4 sm:py-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-row flex-wrap gap-4 sm:gap-6 items-center justify-center w-full"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          {slide.techs.map((tech) => {
            const entry = techIconMap[tech];
            if (!entry) return null;
            const Icon = entry.icon;
            return (
              <div key={tech} className="flex flex-col items-center gap-1">
                <Icon size={32} color={entry.color} className="sm:hidden" />
                <Icon
                  size={40}
                  color={entry.color}
                  className="hidden sm:block"
                />
                <span
                  className="uppercase tracking-wider"
                  style={{
                    fontSize: "10px",
                    color: "#02375980",
                    fontFamily: "var(--fonte_inter), sans-serif",
                  }}
                >
                  {tech}
                </span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── HoverSliderInner ─────────────────────────────────────────────────────────

function HoverSliderInner({ onOpenSobre }) {
  const { activeSlide } = useHoverSliderContext();
  const activeColor = SLIDES[activeSlide].color;

  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 w-full overflow-x-hidden"
      style={{ marginTop: "150px", marginBottom: "100px" }}
    >
      <div className="w-full max-w-xs mx-auto md:mx-0 md:max-w-xs flex items-start justify-start">
        <SlideList />
      </div>

      <div className="flex flex-row items-center gap-3 sm:gap-4 w-full max-w-[90vw] sm:max-w-sm mx-auto md:mx-0">
        <div
          className="flex-1 flex flex-col"
          style={{
            borderRadius: "8px",
            border: `2px solid ${activeColor}`,
            boxShadow: `0 0 24px ${activeColor}33`,
            transition: "border-color 0.5s ease, box-shadow 0.5s ease",
          }}
        >
          <HoverSliderImageWrap className="rounded-md">
            {SLIDES.map((slide, index) => (
              <div key={slide.id}>
                <HoverSliderImage
                  index={index}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full max-h-64 sm:max-h-80 md:max-h-96 object-cover rounded-md"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </HoverSliderImageWrap>
          <TechPanel />
        </div>

        <motion.button
          onClick={onOpenSobre}
          aria-label="Ver sobre nós"
          whileHover={{ x: 4, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-shrink-0 flex flex-col items-center gap-1"
          style={{ color: "#02375966" }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ color: "#023759" }}
          >
            <FaChevronRight size={22} className="sm:hidden" />
            <FaChevronRight size={28} className="hidden sm:block" />
          </motion.div>
          <span
            className="uppercase tracking-widest hidden sm:block"
            style={{
              fontSize: "12px",
              color: "#02375966",
              fontFamily: "var(--fonte_inter), sans-serif",
            }}
          >
            Sobre
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// ─── HoverSliderDemo ──────────────────────────────────────────────────────────

export function HoverSliderDemo() {
  const [showSobre, setShowSobre] = useState(false);

  // ✅ sem useEffect, sem Portal, sem body overflow
  return (
    <HoverSlider className="relative min-h-svh place-content-center pt-24 pb-8 px-4 sm:px-8 md:px-12 bg-[rgba(233,239,242,1)] text-[#3d3929] overflow-hidden">
      <AnimatePresence>
        {!showSobre && (
          <motion.div
            key="main"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <HoverSliderInner onOpenSobre={() => setShowSobre(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSobre && <SobreNosPanel onClose={() => setShowSobre(false)} />}
      </AnimatePresence>
    </HoverSlider>
  );
}
