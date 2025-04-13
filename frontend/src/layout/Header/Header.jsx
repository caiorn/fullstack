import { Avatar } from '../../components/Avatar';
import Navbar from '../Navbar/Navbar';
import styles from  './Header.module.css';


export default function Header() {
    return (
      <header className={styles.header}>
        <div>
          <Navbar />
        </div>  
        <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#333', margin: 0 }}>
          Minha Plataforma
        </h1>  
        <div>
          <Avatar src="https://i.pravatar.cc/40" alt="Perfil"/>
        </div>
      </header>
    )
  }