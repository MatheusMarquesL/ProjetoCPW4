import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BibliotecaContext } from "../context/BibliotecaContext";
import "../styles/LivroDetalhe.scss";
import CapaLivro from "../components/CapaLivro";

export default function LivroDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { livros, adicionarLivro, emprestarLivro } =
    useContext(BibliotecaContext);

  const [livro, setLivro] = useState(null);
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setLivro(data);

        if (data.authors?.[0]?.author?.key) {
          return fetch(
            `https://openlibrary.org${data.authors[0].author.key}.json`
          )
            .then((res) => res.json())
            .then((autorData) => setAutor(autorData.name));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setTimeout(() => setLoading(false), 500);
      });
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  if (!loading && !livro) return <p>Livro não encontrado.</p>;

  const descricao =
    typeof livro?.description === "string"
      ? livro.description
      : livro?.description?.value || "Sem descrição disponível";

  const capa = livro?.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${livro.covers[0]}-L.jpg`
    : null;

  function handleEmprestar() {
    const livroFormatado = {
      livroKey: `/works/${id}`,
      titulo: livro.title,
      autor: autor || "Autor desconhecido",
      capa: livro.covers?.[0] || null,
    };

    const existente = livros.find(
      (l) => l.livroKey === livroFormatado.livroKey
    );

    if (!existente) {
      adicionarLivro(livroFormatado);
    } else {
      emprestarLivro(existente.id);
    }

    navigate("/emprestimos");
  }

  return (
    <div className="detalhe">
      {loading && (
        <div className="loading-overlay">
          <h1>Buscando detalhes...</h1>
          <div className="spinner"></div>
        </div>
      )}

      {livro && (
        <>
          <div className="detalhe-capa">
            <CapaLivro src={capa} alt={livro.title} altura="450px" />
            <h3>{livro.title}</h3>
            <p>{autor || "Autor desconhecido"}</p>
          </div>

          <div className="detalhe-info">
            <h2>{livro.title}</h2>
            <p>{descricao}</p>

            <button className="btn-emprestar" onClick={handleEmprestar}>
              Emprestar
            </button>
          </div>
        </>
      )}
    </div>
  );
}