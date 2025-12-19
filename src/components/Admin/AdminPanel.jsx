import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileEditor from './ProfileEditor'; 
import ProjectManager from './ProjectManager';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    background: 'var(--color-charcoal)', // Updated to Charcoal
    color: 'var(--color-cream-light)', 
    padding: '30px 20px',
    position: 'fixed',
    display: 'flex',           
    flexDirection: 'column',    
    zIndex: 1000,
    boxSizing: 'border-box',
    borderRight: '1px solid rgba(247, 231, 206, 0.05)'
  };

  const navItem = (id) => ({
    padding: '12px 15px',
    cursor: 'pointer',
    background: activeTab === id ? 'var(--color-accent)' : 'transparent', // Bronze for active
    color: activeTab === id ? 'white' : 'var(--color-cream-light)',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: '0.3s',
    fontWeight: activeTab === id ? 'bold' : 'normal'
  });

  return (
    <div style={{ display: 'flex', background: 'var(--color-bg-dark)', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <aside style={sidebarStyle}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: 'var(--color-cream-light)', // Matching text
          marginBottom: '40px',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(247, 231, 206, 0.1)',
          textAlign: 'center',
          letterSpacing: '1px'
        }}>
          ADMIN PANEL
        </h2>

        <nav style={{ flex: 1 }}>
          <div style={navItem('profile')} onClick={() => setActiveTab('profile')}>
            Profile
          </div>
          <div style={navItem('projects')} onClick={() => setActiveTab('projects')}>
            Projects
          </div>
        </nav>

        {/* Logout Button */}
        <div style={{ paddingBottom: '40px' }}> 
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              width: '100%',
              background: 'transparent',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-accent)',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
                e.target.style.background = '#ff4d4d';
                e.target.style.borderColor = '#ff4d4d';
                e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.color = 'var(--color-accent)';
            }}
          >
            Logout & Return Home
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '250px', flex: 1, padding: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-cream-light)', margin: 0 }}>
            {activeTab === 'profile' ? 'Profile Management' : 'Project Portfolio'}
          </h1>
          <hr style={{ border: 'none', borderBottom: '2px solid var(--color-accent)', width: '50px', margin: '10px 0' }} />
        </header>

        <section style={{ color: 'var(--color-cream-light)' }}>
          {activeTab === 'profile' ? <ProfileEditor /> : <ProjectManager />}
        </section>
      </main>
    </div>
  );
}