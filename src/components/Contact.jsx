import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const iconStyle = {
    color: 'var(--color-accent)', // Sapphire Blue
    fontSize: '45px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const hoverEffect = (e) => {
    e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
    /* Transition to Light Blue on hover */
    e.currentTarget.style.color = '#00BFFF'; 
    e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--color-accent-glow))';
  };

  const resetEffect = (e) => {
    e.currentTarget.style.transform = 'scale(1) translateY(0)';
    e.currentTarget.style.color = 'var(--color-accent)';
    e.currentTarget.style.filter = 'none';
  };

  return (
    <section id="contact" style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--color-bg-deep)' }}>
      <h2 style={{ 
        color: 'var(--color-text-primary)', 
        borderBottom: '3px solid var(--color-accent)',
        marginBottom: '30px',
        display: 'inline-block'
      }}>
        Get In Touch
      </h2>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '50px 40px', 
        background: '#000000', // Solid Black Card
        color: 'var(--color-text-primary)',
        borderRadius: '20px',
        maxWidth: '500px', // Slightly wider for 3 icons
        margin: '20px auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
          Email: <strong style={{ color: 'var(--color-accent)' }}>socutethaniel@gmail.com</strong>
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
          Phone: <strong style={{ color: 'var(--color-accent)' }}>09190649070</strong>
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          {/* Facebook */}
          <a href="https://www.facebook.com/nathaniel.santos.394560" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <FaFacebook style={iconStyle} onMouseEnter={hoverEffect} onMouseLeave={resetEffect} />
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/nathaniel-santos-b03391394/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <FaLinkedin style={iconStyle} onMouseEnter={hoverEffect} onMouseLeave={resetEffect} />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/_neytman_" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <FaInstagram style={iconStyle} onMouseEnter={hoverEffect} onMouseLeave={resetEffect} />
          </a>
        </div>
      </div>
    </section>
  );
}