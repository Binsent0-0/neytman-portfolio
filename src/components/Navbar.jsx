export default function Navbar() {
  const linkStyle = {
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={{ 
      /* Set to solid black */
      background: '#000000', 
      padding: '1rem 2rem', 
      position: 'sticky', 
      top: 0, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      /* Subtle sapphire-tinted border for a clean edge against the body */
      borderBottom: '1px solid rgba(15, 82, 186, 0.2)', 
      zIndex: 2000,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' 
    }}>
        <div style={{ 
            fontWeight: '800', 
            fontSize: '1.6rem', 
            letterSpacing: '-0.5px',
            /* Radial gradient transitioning from Sapphire (#0F52BA) to Light Blue (#00BFFF) */
            background: 'radial-gradient(circle, #0F52BA 0%, #00BFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'default',
            /* Adds a subtle glow to make the sapphire/light blue pop against the black navbar */
            filter: 'drop-shadow(0 0 8px rgba(0, 191, 255, 0.3))'
            }}>
        Neytman.
        </div>
      
      <div style={{ display: 'flex', gap: '35px' }}>
        {['About', 'Projects', 'Contact'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--color-accent)';
              e.target.style.textShadow = '0 0 12px var(--color-accent-glow)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--color-text-primary)';
              e.target.style.textShadow = 'none';
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}