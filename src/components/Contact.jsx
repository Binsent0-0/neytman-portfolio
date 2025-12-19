import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const iconStyle = {
    color: 'var(--color-cream)',
    fontSize: '40px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <section id="contact" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Get In Touch</h2>
      <div style={{ 
        marginTop: '20px', 
        padding: '40px', 
        background: 'var(--color-sage)', 
        color: 'white', 
        borderRadius: '15px',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        <p>Email: <strong>socutethaniel@gmail.com</strong></p>
        <p style={{ marginBottom: '30px' }}>Phone: <strong>09190649070</strong></p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          {/* Facebook Icon */}
          <a 
            href="https://www.facebook.com/nathaniel.santos.394560" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook 
              style={iconStyle} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = 'var(--color-cream)';
              }}
            />
          </a>

          {/* Instagram Icon */}
          <a 
            href="https://www.instagram.com/_neytman_" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram 
              style={iconStyle} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = 'var(--color-cream)';
              }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}