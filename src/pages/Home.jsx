import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import CapaLivro from "../components/CapaLivro";

const generos = [
  { nome: "Fantasia", query: "fantasy" },
  { nome: "Romance", query: "romance" },
  { nome: "Ficção Científica", query: "science_fiction" },
];

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [generosData, setGenerosData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      setLoading(true);

      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=programming"
        );
        const data = await res.json();
        setDestaques(data.docs.slice(0, 10));

        const resultados = {};

        for (const genero of generos) {
          const res = await fetch(
            `https://openlibrary.org/search.json?subject=${genero.query}`
          );
          const data = await res.json();

          resultados[genero.nome] = data.docs.slice(0, 10);
        }

        setGenerosData(resultados);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  function renderLista(livros) {
    return (
      <div className="livros-container">
        {livros.map((livro, index) => (
          <Link
            key={index}
            to={`/livro/${livro.key.replace("/works/", "")}`}
            className="livro-link"
          >
            <div className="livro-card">
              <CapaLivro
                src={
                  livro.cover_i
                    ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
                    : null
                }
                alt={livro.title}
              />

              <div className="livro-info">
                <h3>{livro.title}</h3>
                <p>{livro.author_name?.[0] || "Autor desconhecido"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="home">
      <h2>Livros em destaque</h2>
      {renderLista(destaques)}

      {Object.entries(generosData).map(([genero, livros]) => (
        <div key={genero}>
          <h2>{genero}</h2>
          {renderLista(livros)}
        </div>
      ))}

      {loading && (
        <div className="loading-overlay">
          <h1>Conectando...</h1>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}