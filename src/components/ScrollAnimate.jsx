import React, { useEffect, useRef, useState } from "react";
import styles from "../css/Sobre_Projeto.module.css";

function ScrollAnimate({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  const lastTopRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentTop = entry.boundingClientRect.top;
        const isScrollingDown = currentTop < lastTopRef.current;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Só esconde o elemento se o usuário estiver subindo e o elemento sair por BAIXO da tela
          if (!isScrollingDown && currentTop > 0) {
            setIsVisible(false);
          }
        }

        lastTopRef.current = currentTop;
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px", // Dá um leve atraso na entrada por baixo para o efeito ficar mais bonito
        threshold: 0.05,
      }
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${styles.scroll_section} ${isVisible ? styles.is_visible : styles.is_hidden}`}
    >
      {children}
    </div>
  );
}

export default ScrollAnimate;