export default function Projects({ projects }) {
  const hasProjects = projects && projects.length > 0;

  return (
    <section id="projects" style={{ padding: '80px 20px', background: 'var(--color-bg-deep)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ 
          color: 'var(--color-text-primary)', 
          borderBottom: '3px solid var(--color-accent)', 
          marginBottom: '40px',
          display: 'inline-block'
        }}>
          Featured Projects
        </h2>
        
        {!hasProjects ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px', 
            borderRadius: '16px',
            color: 'var(--color-text-muted)',
            background: '#000000',
            border: '2px dashed var(--color-charcoal-light)'
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Building something great...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {projects.map((proj) => (
              <div 
                key={proj.project_id} 
                style={{ 
                  background: '#000000',
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.boxShadow = '0 15px 35px var(--color-accent-glow)';
                  // Targets the overlay div to remove the fade
                  const overlay = e.currentTarget.querySelector('.image-overlay');
                  if (overlay) overlay.style.opacity = '0';
                  // Slightly zooms the image
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
                  // Resets the fade
                  const overlay = e.currentTarget.querySelector('.image-overlay');
                  if (overlay) overlay.style.opacity = '1';
                  // Resets image scale
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* 1. Image Area */}
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={proj.image_url || 'https://via.placeholder.com/400x200?text=Project+Coming+Soon'} 
                    alt={proj.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }} 
                  />
                  {/* The Fade Overlay */}
                  <div 
                    className="image-overlay"
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(to bottom, transparent, #000000)',
                      transition: 'opacity 0.4s ease',
                      opacity: 1 // Visible by default
                    }} 
                  />
                </div>

                <div style={{ padding: '25px' }}>
                  <h3 style={{ color: 'var(--color-text-primary)', marginTop: 0, marginBottom: '12px', fontSize: '1.5rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    {proj.description}
                  </p>
                  
                  <div style={{ 
                    marginTop: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'linear-gradient(90deg, #0F52BA 0%, #00BFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    View Details <span>&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}