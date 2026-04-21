import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BibliotecaContext } from "../context/BibliotecaContext";
import "../styles/Livros.scss";

export default function Livros() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const { livros, adicionarLivro, emprestarLivro, devolverLivro } =
    useContext(BibliotecaContext);

  useEffect(() => {
    if (busca.trim().length < 2) {
      setResultados([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);

      fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(busca)}`,
      )
        .then((res) => res.json())
        .then((data) => setResultados(data.docs.slice(0, 10)))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [busca]);

  function emprestarDireto(livroAPI) {
    const existente = livros.find((l) => l.livroKey === livroAPI.key);

    if (!existente) {
      adicionarLivro(livroAPI);
    } else {
      emprestarLivro(existente.id);
    }
  }

  return (
    <div className="livros-page">
      <h2>Buscar livros</h2>

      <div className="barra-busca">
        <input
          type="text"
          placeholder="Digite o nome do livro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {busca && <button onClick={() => setBusca("")}>Limpar</button>}
      </div>

      <div className="resultados">
        {loading && (
          <div className="loading-overlay">
            <h1>Conectando...</h1>
            <div className="spinner"></div>
          </div>
        )}

        {!loading && resultados.length === 0 && busca.trim().length >= 2 && (
          <p>Nenhum livro encontrado</p>
        )}

        {resultados.map((livro) => {
          const existente = livros.find((l) => l.livroKey === livro.key);

          return (
            <div key={livro.key} className="livro-item">
              <Link
                to={`/livro/${livro.key.replace("/works/", "")}`}
                className="livro-link"
              >
                {livro.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-S.jpg`}
                    alt={livro.title}
                  />
                ) : (
                  <div className="sem-capa">Sem capa</div>
                )}

                <div className="info">
                  <h3>{livro.title}</h3>
                  <p>{livro.author_name?.[0] || "Autor desconhecido"}</p>
                </div>
              </Link>

              {!existente || existente.disponivel ? (
                <button onClick={() => emprestarDireto(livro)}>
                  Emprestar
                </button>
              ) : (
                <button onClick={() => devolverLivro(existente.id)}>
                  Devolver
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
