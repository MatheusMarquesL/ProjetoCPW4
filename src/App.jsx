import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Livros from "./pages/Livros.jsx"
import Emprestimos from "./pages/Emprestimos.jsx"
import LivroDetalhe from "./pages/LivroDetalhe.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/livros" element={<Livros />}/>
        <Route path="/livro/:id" element={<LivroDetalhe />} />
        <Route path="/emprestimos" element={<Emprestimos />}/>
      </Routes>
    </>
  )
}