import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '26px',
          height: '20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
        aria-label="Menu"
      >
        <span style={{ height: '3px', background: '#333', borderRadius: '2px' }} />
        <span style={{ height: '3px', background: '#333', borderRadius: '2px' }} />
        <span style={{ height: '3px', background: '#333', borderRadius: '2px' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            padding: '10px',
            minWidth: '150px'
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/main" style={{ textDecoration: 'none', color: '#333' }}>🏠 Home</Link>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>📊 Dashboard</Link>
            <Link to="/settings" style={{ textDecoration: 'none', color: '#333' }}>⚙️ Configurações</Link>
            <Link to="/" style={{ textDecoration: 'none', color: '#d00' }}>🚪 Sair</Link>
          </nav>
        </div>
      )}
    </div>
  )
}
