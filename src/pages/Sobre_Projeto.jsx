import React, { useState, Suspense } from "react";
import styles from "../css/Sobre_Projeto.module.css";
import { Link } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { Model as Totem3D } from "../components/Totem_3D_Oficial.jsx";
import ScrollAnimate from "../components/ScrollAnimate.jsx";

import Imagem_cultura from "../assets/Sobre_Projeto/Cultura.png";
import Imagem_linha_preta from "../assets/Sobre_Projeto/Linha_preta.png";
import Imagem_inclusao from "../assets/Sobre_Projeto/Inclusao.png";
import Imagem_empatia from "../assets/Sobre_Projeto/Empatia.png";
import Imagem_respeito from "../assets/Sobre_Projeto/Respeito.png";
import Imagem_etica from "../assets/Sobre_Projeto/Etica.png";
import Imagem_inovacao from "../assets/Sobre_Projeto/Inovacao.png";
import Imagem_por_que_existe from "../assets/Sobre_Projeto/Por_que_existe.png";
import Imagem_pesquisa from "../assets/Sobre_Projeto/Pesquisa.png";
import Imagem_idealizacao from "../assets/Sobre_Projeto/Idealizacao.png";
import Imagem_ui from "../assets/Sobre_Projeto/Ui.png";
import Imagem_prototipo from "../assets/Sobre_Projeto/Prototipo.png";
import Imagem_ias from "../assets/Sobre_Projeto/IAs.png";
import Imagem_hardware from "../assets/Sobre_Projeto/Hardware.png";
import Imagem_testes from "../assets/Sobre_Projeto/Testes.png";
import Imagem_expansao from "../assets/Sobre_Projeto/Expansao.png";
import Imagem_mao from "../assets/Sobre_Projeto/Mao.png";

function Sobre_Projeto() {
  const [currentStepIndex, setCurrentStepIndex] = useState(6); 

  const timelineSteps = [
    { id: 1, title: 'Pesquisa', img: Imagem_pesquisa, side: 'right' },
    { id: 2, title: 'Idealização', img: Imagem_idealizacao, side: 'left' },
    { id: 3, title: 'UI/UX', img: Imagem_ui, side: 'right' },
    { id: 4, title: 'Protótipo', img: Imagem_prototipo, side: 'left' },
    { id: 5, title: 'IA\'s', img: Imagem_ias, side: 'right' },
    { id: 6, title: 'Hardware', img: Imagem_hardware, side: 'left' },
    { id: 7, title: 'Testes', img: Imagem_testes, side: 'right' },
    { id: 8, title: 'Expansão', img: Imagem_expansao, side: 'left' },
  ];

  return (
    <main className={styles.main}>
      <ScrollAnimate>
        <section className={styles.origem}>
          <h1>A origem do SinalizaAI</h1>
          <div>
            <p>
              O SinalizaAI nasceu para transformar acessibilidade em algo natural,
              humano e presente no cotidiano.
              <br />
              Unindo inteligência artificial, inclusão e inovação, criamos uma
              nova forma de aproximar pessoas surdas e ouvintes em qualquer
              ambiente.
              <br />
              Desenvolvemos experiências capazes de reduzir barreiras de
              comunicação e promover autonomia através da inovação. Acreditamos
              que acessibilidade não deve ser adaptação. Deve ser padrão.
            </p>
          </div>
          <img src={Imagem_linha_preta} alt="Linha decorativa" className={styles.linha_decorativa} />
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <section className={styles.cultura}>
          <div className={styles.divisoes_cultura}>
            <h2>Nossa Missão</h2>
            <p>
              Ser a <strong>ponte</strong> entre a <strong>comunicação inclusiva e eficiente</strong> para pessoas
              que se comunicam através da <strong>linguagem de sinais</strong>, dando mais
              <strong> autonomia</strong> para tarefas cotidianas, utilizando <strong>tecnologia inovadora </strong>
               com IA integrada através de uma <strong>plataforma digital.</strong>
            </p>
          </div>

          <div className={styles.image_cultura}>
            <img src={Imagem_cultura} alt="Cultura do SinalizaAI" />
          </div>

          <div className={styles.divisoes_cultura}>
            <h2>Nossa Visão</h2>
            <p>
              Gerar mais <strong>oportunidades</strong> para a <strong>comunidade surda</strong> nacional e
              internacional, quebrando <strong>barreiras</strong> na comunicação interpessoal,
              tornando-se a melhor plataforma de <strong>inclusão digital</strong> para a
              comunidade surda.
            </p>
          </div>

          <div className={`${styles.divisoes_cultura} ${styles.valores}`}>
            <h2>Nossos Valores</h2>
            <div className={styles.valores_icones}>
              <div className={styles.valor_item}>
                <img src={Imagem_inclusao} className={styles.icon_valores} alt="Inclusão" />
                <span>Inclusão</span>
              </div>
              <div className={styles.valor_item}>
                <img src={Imagem_empatia} className={styles.icon_valores} alt="Empatia" />
                <span>Empatia</span>
              </div>
              <div className={styles.valor_item}>
                <img src={Imagem_respeito} className={styles.icon_valores} alt="Respeito" />
                <span>Respeito</span>
              </div>
              <div className={styles.valor_item}>
                <img src={Imagem_etica} className={styles.icon_valores} alt="Ética" />
                <span>Ética</span>
              </div>
              <div className={styles.valor_item}>
                <img src={Imagem_inovacao} className={styles.icon_valores} alt="Inovação" />
                <span>Inovação</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <img src={Imagem_linha_preta} alt="Linha decorativa" className={styles.linha_decorativa} />
      </ScrollAnimate>

      <ScrollAnimate>
        <section className={styles.por_que_existe}>
          <div className={styles.texto_por_que}>
            <h2>Por que o SinalizaAI existe?</h2>
            <p>
              Milhões de pessoas surdas enfrentam <strong>barreiras de comunicação</strong> todos os dias.
              <br />
              Em muitos ambientes, a acessibilidade ainda depende de <strong>adaptações limitadas</strong>, <strong>atendimento despreparado</strong> ou da <strong>ausência</strong> de recursos realmente inclusivos.
              <br />
              O resultado é uma experiência marcada por <strong>dependência</strong>, <strong>dificuldade de expressão</strong> e <strong>exclusão silenciosa</strong> em espaços que deveriam acolher todos igualmente.
              <br />
              O <strong>SinalizaAI</strong> surge para transformar essa realidade através da <strong>tecnologia</strong>, criando uma comunicação mais <strong>acessível</strong>, <strong>intuitiva</strong> e <strong>humana</strong> entre pessoas surdas e ouvintes.
            </p>
          </div>
          <div className={styles.imagem_por_que}>
            <img src={Imagem_por_que_existe} alt="Motivação do projeto SinalizaAI" />
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <img src={Imagem_linha_preta} alt="Linha decorativa" className={styles.linha_decorativa} />
      </ScrollAnimate>

      <ScrollAnimate>
        <section className={styles.queremos_ir}>
          <h2>Para onde queremos ir?</h2>

          <div className={styles.timeline_container}>
            <div className={styles.timeline_line_bg} />
            <div 
              className={styles.timeline_line_active} 
              style={{ 
                height: `calc((${currentStepIndex} * (100% - 176px - 30px)) / ${timelineSteps.length - 1})` 
              }}
            />

            {timelineSteps.map((step, index) => {
              const isPassed = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isFuture = index > currentStepIndex;

              let cardStateClass = styles.step_current;
              if (isPassed) cardStateClass = styles.step_passed;
              if (isFuture) cardStateClass = styles.step_future;

              return (
                <div key={step.id} className={`${styles.timeline_item} ${cardStateClass}`}>
                  
                  <div className={styles.timeline_left}>
                    {step.side === 'left' && (
                      <div className={styles.timeline_image_wrapper}>
                        <img src={step.img} alt={step.title} />
                      </div>
                    )}
                  </div>

                  <div className={styles.timeline_center}>
                    <div className={styles.timeline_node}>
                      <span className={`${styles.timeline_title} ${step.side === 'right' ? styles.title_right : styles.title_left}`}>
                        {step.title}
                      </span>
                      <div className={styles.timeline_dot} />
                    </div>
                  </div>

                  <div className={styles.timeline_right}>
                    {step.side === 'right' && (
                      <div className={styles.timeline_image_wrapper}>
                        <img src={step.img} alt={step.title} />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
            
            <div className={`${styles.timeline_hand_icon} ${currentStepIndex === timelineSteps.length - 1 ? styles.hand_active : ''}`}>
              <img src={Imagem_mao} alt="Indicador de andamento" />
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <img src={Imagem_linha_preta} alt="Linha decorativa" className={styles.linha_decorativa} />
      </ScrollAnimate>

      <ScrollAnimate>
        <section className={styles.diferencial}>
          <h2>Qual o diferencial do SinalizaAI?</h2>
          <p>
            O grande diferencial do SinalizaAI está na união entre inteligência artificial e um totem interativo desenvolvido para tornar a comunicação mais acessível no cotidiano.
            A solução é capaz de converter sinais em Libras para texto e voz em tempo real, permitindo interações mais naturais entre pessoas surdas e ouvintes em diferentes ambientes.
          </p>

          <div className={styles.totem_wrapper_bloqueio}>
            <div className={styles.totem_3d_container}>
              <Canvas camera={{ position: [0, 1.0, 8.0], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.5} adjustCamera={false}>
                    <Center>
                      <group position={[0, 0.5, 0]}>
                        <Totem3D scale={[0.45, 0.45, 0.45]} />
                      </group>
                    </Center>
                  </Stage>
                </Suspense>

                <OrbitControls 
                  enableZoom={true} 
                  enablePan={false}
                  minDistance={2.0}
                  maxDistance={12.0}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
              </Canvas>
            </div>
          </div>

          <p>
            Além da tecnologia de tradução, o SinalizaAI se destaca pela experiência física e acessível proporcionada pelo totem, criado para integrar inclusão, praticidade e inovação em um único ecossistema.
            Mais do que uma ferramenta tecnológica, o SinalizaAI busca transformar acessibilidade em presença, autonomia e conexão humana.
          </p>
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <section className={styles.equipe}>
          <Link to="/pages/Sobre_Equipe" className={styles.btn}>
            Conheça nossa Equipe
          </Link>
        </section>
      </ScrollAnimate>
    </main>
  );
}

export default Sobre_Projeto;