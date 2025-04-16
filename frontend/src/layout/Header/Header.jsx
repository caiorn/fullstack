import styles from  './Header.module.css';


export default function Header({children }) {
    return (
        <header style={{
          height: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#f0f0f0',
          borderBottom: '1px solid #ccc'
        }}>
          {/* Renderiza os filhos do componente */}
          {children}   
        </header>   
    ) 
  };