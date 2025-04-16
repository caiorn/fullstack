import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import Login from './pages/SingIn/SingIn';
import Main from './pages/Home/Home';
import GeradorSenhas from './pages/GeradorSenhas/GeradorSenhas';
import BibliotecaLista from './pages/BibliotecaLista/BibliotecaLista';


let hasLogged = false; // Variável para controlar se o log já foi feito

function App() {
  // Verifica se o ambiente não é 'production' e se o log ainda não foi feito
  if (import.meta.env.MODE !== 'production' && !hasLogged) {
    console.log('Variáveis de ambiente no modo desenvolvimento/produção');
    Object.entries(import.meta.env).forEach(([key, value]) => {
      if (key.startsWith('VITE_')) { // Filtra apenas as variáveis que começam com VITE_
        console.log(`${key}: ${value}`);
      }
    });
    hasLogged = true; // Marca como logado
  }

  return <RouterProvider router={router} />;
}

export default App;