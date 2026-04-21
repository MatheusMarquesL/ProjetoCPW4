import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://openlibrary.org/search.json?q=programming")
      .then(res => res.json())
      .then(data => setLivros(data.docs.slice(0, 10)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className="home">
      <h2>Livros em destaque</h2>

      <div className="livros-container">
        {livros.map((livro, index) => (
          <Link
            key={index}
            to={`/livro/${livro.key.replace("/works/", "")}`}
            className="livro-link"
          >
            <div className="livro-card">
              {livro.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
                  alt={livro.title}
                  className="img"
                  onLoad={(e) => e.target.classList.add("loaded")}
                />
              ) : (
                <div className="sem-capa">Sem capa</div>
              )}

              <h3>{livro.title}</h3>
              <p>{livro.author_name?.[0] || "Autor desconhecido"}</p>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="loading-overlay">
          <h1>Conectando...</h1>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}