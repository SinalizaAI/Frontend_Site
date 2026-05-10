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

import { motion, AnimatePresence } from "motion/react";

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
    cargo: "PO e Full Stack",
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
    cargo: "Scrum e Full Stack",
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
    cargo: "Back End e Marketing",
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
    cargo: "Full Stack e UI/UX",
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
    cargo: "Full Stack e Financeiro",
    techs: ["HTML", "CSS", "JavaScript", "Java"],
    redes: {
      github: "https://github.com/pedrolima",
      linkedin: "https://www.linkedin.com/in/ryan-almeida-dev/",
    },
    imageUrl: Ryan,
  },
  {
    id: "slide-6",
    title: "Thayna Mateus",
    color: "#082256",
    cargo: "Full Stack e Pesquisadora",
    techs: ["Java", "React", "MySQL"],
    redes: {
      github: "https://github.com/Thayn4-mateus",
      linkedin: "https://www.linkedin.com/in/thaynamateus/",
    },
    imageUrl: Thay,
  },
];

// ─── SlideList ────────────────────────────────────────────────────────────────

function SlideList() {
  const { activeSlide } = useHoverSliderContext();

  return (
    <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 w-full">
      {SLIDES.map((slide, index) => (
        <div key={slide.id}>
          {/* texto sempre à esquerda — o bloco inteiro é que fica centralizado pelo pai */}
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
                {/* cargo e ícones também à esquerda */}
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

function HoverSliderInner() {
  const { activeSlide } = useHoverSliderContext();
  const activeColor = SLIDES[activeSlide].color;

  return (
    /*
      overflow-x-hidden: garante que nada vaze para fora da largura da tela.
      max-w-lg mx-auto no mobile: centraliza o bloco inteiro e limita a largura.
    */
    <div
      className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 w-full overflow-x-hidden"
      style={{ marginTop: "150px", marginBottom: "100px" }}
    >
      {/*
        Coluna esquerda — lista de nomes.
        No mobile: bloco centralizado na tela (mx-auto), mas textos dentro à esquerda.
        max-w-xs garante que não estica demais e fica "um bloco compacto centrado".
      */}
      <div className="w-full max-w-xs mx-auto md:mx-0 md:max-w-xs flex items-start justify-start">
        <SlideList />
      </div>

      {/*
        Coluna direita — imagem + techs.
        w-full com max-w-[90vw] no mobile: ocupa quase toda a largura sem vazar.
        mx-auto centraliza o card na tela.
      */}
      <div
        className="w-full max-w-[90vw] sm:max-w-sm mx-auto md:mx-0 flex flex-col"
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
    </div>
  );
}

// ─── HoverSliderDemo ──────────────────────────────────────────────────────────

export function HoverSliderDemo() {
  return (
    <HoverSlider className="min-h-svh place-content-center pt-24 pb-8 px-4 sm:px-8 md:px-12 bg-[rgba(233,239,242,1)] text-[#3d3929] overflow-x-hidden">
      <HoverSliderInner />
    </HoverSlider>
  );
}
