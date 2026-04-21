import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Livros from "./pages/Livros.jsx";
import Emprestimos from "./pages/Emprestimos.jsx";
import LivroDetalhe from "./pages/LivroDetalhe.jsx";

export default function App() {
  const location = useLocation();

  const esconderNavbar = location.pathname === "/";

  return (
    <>
      {!esconderNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/livro/:id" element={<LivroDetalhe />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
