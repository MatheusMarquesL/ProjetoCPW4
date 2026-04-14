import { Link } from "react-router-dom";
import "./Navbar.scss";
import livroIcon from "../assets/livros.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={livroIcon} alt="Livros" />
        <h2>Biblioteca</h2>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/livros">Livros</Link>
        <Link to="/emprestimos">Empréstimos</Link>
      </div>
    </nav>
  );
}
