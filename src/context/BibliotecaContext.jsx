import { createContext, useState, useEffect } from "react";

export const BibliotecaContext = createContext();

export function BibliotecaProvider({ children }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("livros");
    if (dados) setLivros(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem("livros", JSON.stringify(livros));
  }, [livros]);

  function adicionarLivro(livroAPI) {
    if (!livroAPI) return;

    const novo = {
      id: Date.now(),
      titulo: livroAPI.title,
      autor: livroAPI.author_name?.[0] || "Autor desconhecido",
      capa: livroAPI.cover_i || null,
      livroKey: livroAPI.key,
      disponivel: false
    };

    setLivros((prev) => [...prev, novo]);
  }

  function emprestarLivro(id) {
    setLivros((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, disponivel: false } : l
      )
    );
  }

  function devolverLivro(id) {
    setLivros((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, disponivel: true } : l
      )
    );
  }

  return (
    <BibliotecaContext.Provider
      value={{ livros, adicionarLivro, emprestarLivro, devolverLivro }}
    >
      {children}
    </BibliotecaContext.Provider>
  );
}