import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Tradutor from "./pages/Tradutor";
import Cadastro from "./pages/Cadastro";
import Cadastro_Etapa2 from "./pages/Cadastro_Etapa2";
import Login from "./pages/Login";
import { HoverSliderDemo } from "./pages/Sobre_Equipe";
import Planos from "./pages/Planos";
import Sobre_Projeto from "./pages/Sobre_Projeto";
import Usuario from "./pages/Usuario";
import { useEffect } from "react";
import OttoChatbot from "./components/OttoChatBot/OttoChatBot";
import { OttoProvider } from "./context/OttoContext";

function App() {


  return (
    <Router>
      <OttoProvider>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Tradutor" element={<Tradutor />} />
            <Route path="/pages/Sobre_Projeto" element={<Sobre_Projeto />} />
            <Route path="/pages/Cadastro" element={<Cadastro />} />
            {/* Sua rota incluída aqui: */}
            <Route path="/Cadastro_Etapa2" element={<Cadastro_Etapa2 />} /> 
            <Route path="/Login" element={<Login />} />
            <Route path="/pages/Planos" element={<Planos />} />
            <Route path="/pages/Usuario" element={<Usuario />} />
            <Route path="/pages/Sobre_Equipe" element={<HoverSliderDemo />} />
          </Routes>
          <OttoChatbot />
          <Footer />
        </main>
      </OttoProvider>
    </Router>
  );
}

export default App;