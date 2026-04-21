import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BibliotecaContext } from "../context/BibliotecaContext";
import "../styles/Livros.scss";
import CapaLivro from "../components/CapaLivro";

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
        `https://openlibrary.org/search.json?title=${encodeURIComponent(busca)}`
      )
        .then((res) => res.json())
        .then((data) => setResultados(data.docs.slice(0, 10)))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [busca]);

  function emprestarDireto(livroAPI) {
  const livroFormatado = {
    titulo: livroAPI.title,
    autor: livroAPI.author_name?.[0] || "Autor desconhecido",
    capa: livroAPI.cover_i || null,
    livroKey: livroAPI.key,
  };

  const existente = livros.find(
    (l) => l.livroKey === livroFormatado.livroKey
  );

  if (!existente) {
    adicionarLivro(livroFormatado);
  } else {
    emprestarLivro(existente.id);
  }
}
  return (
    <div className="livros">
      <h2>Buscar livros</h2>

      <div className="livros-busca">
        <input
          type="text"
          placeholder="Digite o nome do livro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && <button onClick={() => setBusca("")}>Limpar</button>}
      </div>

      <div className="livros-resultados">
        {loading && (
          <div className="loading-overlay">
            <h1>Conectando...</h1>
            <div className="spinner"></div>
          </div>
        )}

        {resultados.map((livro) => {
          const existente = livros.find((l) => l.livroKey === livro.key);

          const capaUrl = livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-S.jpg`
            : null;

          return (
            <div key={livro.key} className="livros-item">
              <Link
                to={`/livro/${livro.key.replace("/works/", "")}`}
                className="livros-link"
              >
                <div className="livros-capa">
                  <CapaLivro src={capaUrl} alt={livro.title} altura="70px" />
                </div>

                <div className="livros-info">
                  <h3 title={livro.title}>{livro.title}</h3>
                  <p title={livro.author_name?.[0]}>
                    {livro.author_name?.[0] || "Autor desconhecido"}
                  </p>
                </div>
              </Link>

              {!existente || existente.disponivel ? (
                <button
                  className="livros-botao"
                  onClick={() => emprestarDireto(livro)}
                >
                  Emprestar
                </button>
              ) : (
                <button
                  className="livros-botao"
                  onClick={() => devolverLivro(existente.id)}
                >
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