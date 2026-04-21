import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem('@Biblioteca:usuario');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('@Biblioteca:usuario', JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('@Biblioteca:usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, logado: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};