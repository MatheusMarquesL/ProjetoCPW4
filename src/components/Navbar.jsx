import { Link } from "react-router-dom";
import "./Navbar.scss";
import livroIcon from "../assets/livros.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={livroIcon} alt="Livros" />
        <h2>Biblioteca</h2>
      </Link>

      <div className="links">
        <Link to="/livros">Livros</Link>
        <Link to="/emprestimos">Empréstimos</Link>
      </div>
    </nav>
  );
}
