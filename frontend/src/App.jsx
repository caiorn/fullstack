import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';
import { router } from './router';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import GeradorSenhas from './pages/GeradorSenhas/GeradorSenhas';
import BibliotecaLista from './pages/BibliotecaLista/BibliotecaLista';

function App() {
  return <RouterProvider router={router} />;
}

export default App;