import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import './Login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de senha correta
    const correctPassword = '12345';

    if (password === correctPassword) {
      setError('');
      navigate('/main'); // Redireciona para a página Main após o login
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={reactLogo} alt="React Logo" width="80" height="80" />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
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
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;