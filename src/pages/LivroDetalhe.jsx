import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LivroDetalhe() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [autor, setAutor] = useState("");

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setLivro(data);

        if (data.authors?.[0]?.author?.key) {
          fetch(`https://openlibrary.org${data.authors[0].author.key}.json`)
            .then((res) => res.json())
            .then((autorData) => setAutor(autorData.name));
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  const descricao =
    typeof livro.description === "string"
      ? livro.description
      : livro.description?.value || "Sem descrição disponível";

  const capa = livro.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${livro.covers[0]}-L.jpg`
    : null;

  return (
    <div className="detalhe-container">
      <div className="capa">
        {capa ? (
          <img src={capa} alt={livro.title} />
        ) : (
          <div className="sem-capa">Sem capa</div>
        )}

        <h3>{livro.title}</h3>
        <p>{autor || "Autor desconhecido"}</p>
      </div>

      <div className="info">
        <h2>{livro.title}</h2>
        <p>{descricao}</p>

        <button>Emprestar</button>
      </div>
    </div>
  );
}
