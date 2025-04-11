import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Main.css';
import PrimaryButton from '../../components/Button/PrimaryButton'
import SecondaryButton from '../../components/Button/SecondaryButton'

function Main() {
  return (
    <div className="main-container">
      <h1>Página Principal</h1>
      <PrimaryButton textLabel="Botão Primário" onClick={() => alert('Botão Primário clicado!')} />
      <SecondaryButton textLabel="Botão Secundário" onClick={() => alert('Botão Secundário clicado!')} />
      {/* Renderiza as subrotas aqui */}
      <Outlet />
    </div>
  );
}

export default Main;