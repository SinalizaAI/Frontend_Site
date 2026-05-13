import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Tradutor from "./pages/Tradutor";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import { HoverSliderDemo } from "./pages/Sobre_Equipe";
import Planos from "./components/Planos";

function Layout() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tradutor" element={<Tradutor />} />
        <Route path="/pages/Cadastro" element={<Cadastro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlanosCompletos" element={<Planos />} />
        <Route path="/pages/Sobre_Equipe" element={<HoverSliderDemo />} />
      </Routes>
      <Footer />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
