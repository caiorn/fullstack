import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import './SingIn.css';
import { login as loginService } from '@/services/AuthService';
import { getUserGeoInfo } from '@/services/GeoService';


function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    //console.log(`${name} ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Preencha todos os campos!');
      return;
    }      

    setLoading(true); // Ativa o carregamento
    setError(''); // Limpa qualquer erro anterior


    try { 
      const geoInfo = await getUserGeoInfo();
      console.log('Localização do usuário:', geoInfo);
  
      const authData = await loginService();
      console.log('Dados de login:', authData);
  
      const correctPassword = '12345';
      // Simula a verificação de login e senha após 3 segundos
      //setTimeout(() => {
        if (formData.password === correctPassword) {
          navigate('/main'); // Redireciona para a página Main após o login
        } else {
          setError('Senha incorreta. Tente novamente.');
        }
      //}, 3000); // 3 segundos de espera
    }catch (error){
      setError('Erro no servidor.');
    }finally
    {
      setLoading(false); // Desativa o carregamento
    }
    
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
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name='username'
          type="text"
          placeholder="Login"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
        />
        <input
          name='password'
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
