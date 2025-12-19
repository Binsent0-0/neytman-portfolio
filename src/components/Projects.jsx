export default function Projects({ projects }) {
  const hasProjects = projects && projects.length > 0;

  return (
    /* Background set to transparent/inherit to blend with the main page */
    <section id="projects" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>Projects</h2>
        
        {!hasProjects ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            borderRadius: '12px',
            color: 'var(--color-dark-green)',
            border: '2px dashed var(--color-sage)'
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>No Projects yet</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px' 
          }}>
            {projects.map((proj) => (
              <div 
                key={proj.project_id} 
                style={{ 
                  /* Card background now uses your light green palette */
                  background: 'var(--color-light-green)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* 1. Image Area */}
                <div style={{ height: '200px', overflow: 'hidden', background: 'rgba(0,0,0,0.05)' }}>
                  <img 
                    src={proj.image_url || 'https://via.placeholder.com/400x200?text=No+Image'} 
                    alt={proj.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div style={{ padding: '20px' }}>
                  {/* 2. Title (Dark Green for contrast) */}
                  <h3 style={{ 
                    color: 'var(--color-dark-green)', 
                    marginTop: 0, 
                    marginBottom: '10px',
                    fontSize: '1.4rem',
                    fontWeight: 'bold'
                  }}>
                    {proj.title}
                  </h3>

                  {/* 3. Description (Darker shade for readability on green) */}
                  <p style={{ 
                    color: '#3d4430', 
                    fontSize: '0.95rem', 
                    lineHeight: '1.5',
                    margin: 0 
                  }}>
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}