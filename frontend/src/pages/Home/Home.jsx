import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Home.module.css';
import PrimaryButton from '../../components/Button/PrimaryButton'
import SecondaryButton from '../../components/Button/SecondaryButton'

export default function Home() {
  return (
    <div className={styles.Home}>
      <h1>Bem-vindo à Página Inicial</h1>
      <PrimaryButton textLabel="Explorar" onClick={() => alert('Explorar clicado!')} />
      <SecondaryButton textLabel="Saiba Mais" onClick={() => alert('Saiba Mais clicado!')} />
      <time title="12 de Abril às 11:47h" dateTime='2025-04-12 11:4600'>Publicado há 10min</time>
      {/* Renderiza as subrotas aqui */}
      <h1></h1>
 
      <Outlet />
    </div>
  );
}
