import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import './SingIn.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = '12345';

    setLoading(true); // Ativa o carregamento
    setError(''); // Limpa qualquer erro anterior

    // Simula a verificação de login e senha após 3 segundos
    setTimeout(() => {
      if (password === correctPassword) {
        navigate('/main'); // Redireciona para a página Main após o login
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
      setLoading(false); // Desativa o carregamento
    }, 3000); // 3 segundos de espera
  };

  const handleForgotPassword = () => {
    // Aqui você pode redirecionar para uma página de recuperação de senha
    // Exemplo:
    navigate('/forgot-password'); // Redireciona para a página "Esqueci minha senha"
  };


  return (
    <div className="login-container">
      <div className="logo">
        <img src={reactLogo} alt="React Logo" width="80" height="80" />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          name='login'
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button 
          type="submit" 
          className={`login-button ${loading ? 'loading' : ''}`} // Adiciona a classe de loading
          disabled={loading} // Desabilita o botão enquanto carrega
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>      

    </div>
  );
}

export default Login;
