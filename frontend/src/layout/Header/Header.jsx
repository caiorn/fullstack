import Navbar from '../Navbar/Navbar'

export default function Header() {
    return (
      <header
        style={{
          margin: "10px",
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 1000
        }}
      >
        {/* Menu hambúrguer no canto esquerdo */}
        <div>
          <Navbar />
        </div>
  
        {/* Nome da plataforma centralizado */}
        <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#333', margin: 0 }}>
          Minha Plataforma
        </h1>
  
        {/* Avatar do usuário */}
        <div>
          <img
            src="https://i.pravatar.cc/40"
            alt="Perfil"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ddd',
            }}
          />
        </div>
      </header>
    )
  }