import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";
import livroIcon from "../assets/livros.png";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        <img src={livroIcon} alt="Livros" />
        <h2>Biblioteca</h2>
      </Link>

      <div className="links">
        <Link to="/livros">Livros</Link>
        <Link to="/emprestimos">Empréstimos</Link>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}