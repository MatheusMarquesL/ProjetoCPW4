import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss'; 

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState(''); 
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
      }
      login({ email, nome: 'Usuário' });
      navigate('/home');
    } else {
      if (email === "" || senha === "" || nome === "") {
        alert("Preencha todos os campos para se cadastrar!");
        return;
      }
      alert("Cadastro realizado com sucesso! Agora faça o login.");
      setIsLogin(true); 
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-card">    
        <h1>{isLogin ? "Acesso Biblioteca" : "Criar Conta"}</h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                id="nome"
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Seu nome completo"
                required
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="••••••••"
              required
            />
          </div>

          
          <button type="submit">
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <div className="toggle-form">
          <p>
            {isLogin ? "Ainda não tem conta?" : "Já possui uma conta?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Cadastre-se" : "Faça Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}