export default function Navbar() {
  return (
    <nav style={{ background: 'var(--color-dark-green)', color: 'white', padding: '1rem', position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ fontWeight: 'bold' }}>Neytman.</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
        <a href="#projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a>
        <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
      </div>
    </nav>
  );
}