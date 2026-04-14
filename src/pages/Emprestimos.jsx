import { useContext } from "react";
import { BibliotecaContext } from "../context/BibliotecaContext";

export default function Emprestimos() {
  const { livros } = useContext(BibliotecaContext);

  const emprestados = livros.filter(l => !l.disponivel);

  return (
    <div className="container">
      <h1>Empréstimos</h1>

      {emprestados.length === 0 && <p>Nenhum livro emprestado.</p>}

      {emprestados.map(livro => (
        <div className="card" key={livro.id}>
          <h3>{livro.titulo}</h3>
          <p>Emprestado</p>
        </div>
      ))}
    </div>
  );
}