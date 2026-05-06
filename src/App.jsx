import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Tradutor from "./pages/Tradutor";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Sobre_Equipe from "./pages/Sobre_Equipe";
import Planos from "./components/Planos";

function Layout() {
  const { pathname } = useLocation();
  const isEquipe = pathname === "/pages/Sobre_Equipe";

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tradutor" element={<Tradutor />} />
        <Route path="pages/Cadastro" element={<Cadastro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlanosCompletos" element={<Planos />} />
        <Route path="/pages/Sobre_Equipe" element={<Sobre_Equipe />} />
      </Routes>
      <Footer semRadius={isEquipe} />
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
