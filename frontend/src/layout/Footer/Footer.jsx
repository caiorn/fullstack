export default function Footer() {
  return (
    <footer style={{
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
      borderTop: '1px solid #ccc',
      textAlign: 'center',
    }}>
      <small>© {new Date().getFullYear()} - Caio Dev</small>
    </footer>
  );
  }
  