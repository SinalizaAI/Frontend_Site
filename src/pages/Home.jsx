import Hero from "../components/Hero";
import Section_funcionalidades from "../components/Section_funcionalidades";
import Vantagens from "../components/Vantagens";
import Como_Funciona from "../components/Como_Funciona";
import Planos from "../components/Planos";
import Perguntas from "../components/Perguntas";
import Fale from "../components/Fale";

function Home() {
  return (
    <main>
      <Hero />
      <Section_funcionalidades />
      <Vantagens />
      <Como_Funciona />
      <Planos />
      <Perguntas />
      <Fale />
    </main>
  );
}

export default Home;
