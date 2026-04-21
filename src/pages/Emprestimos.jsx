import { useContext } from "react";
import { BibliotecaContext } from "../context/BibliotecaContext";
import "../styles/Emprestimos.scss";

export default function Emprestimos() {
  const { livros, devolverLivro } = useContext(BibliotecaContext);

  const emprestados = livros.filter((l) => !l.disponivel);

  return (
    <div className="emprestimos-page">
      <h1>Empréstimos</h1>

      <div className="lista">
        {emprestados.length === 0 && (
          <p className="vazio">Nenhum livro emprestado.</p>
        )}

        {emprestados.map((livro) => (
          <div className="card" key={livro.id}>
            {livro.capa ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${livro.capa}-M.jpg`}
                alt={livro.titulo}
                className="img"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            ) : (
              <div className="sem-capa">Sem capa</div>
            )}

            <h3>{livro.titulo}</h3>
            <p>{livro.autor}</p>

            <button onClick={() => devolverLivro(livro.id)}>
              Devolver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}