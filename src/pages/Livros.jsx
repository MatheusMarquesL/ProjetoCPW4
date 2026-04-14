import { useContext, useState } from "react";
import { BibliotecaContext } from "../context/BibliotecaContext";

export default function Livros() {
    const { livros, adicionarLivro, emprestarLivro, devolverLivro } =
      useContext(BibliotecaContext);
  
    const [titulo, setTitulo] = useState("");
  
    return (
      <div className="container">
        <h1>Livros</h1>
  
        <div>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nome do livro"
          />
          <button
            className="button"
            onClick={() => {
              adicionarLivro(titulo);
              setTitulo("");
            }}
          >
            Adicionar
          </button>
        </div>
  
        {livros.map((livro) => (
          <div className="card" key={livro.id}>
            <h3>{livro.titulo}</h3>
            <p>{livro.disponivel ? "Disponível" : "Emprestado"}</p>
  
            {livro.disponivel ? (
              <button
                className="button"
                onClick={() => emprestarLivro(livro.id)}
              >
                Emprestar
              </button>
            ) : (
              <button
                className="button"
                onClick={() => devolverLivro(livro.id)}
              >
                Devolver
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }