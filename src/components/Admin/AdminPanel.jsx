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
    background: 'var(--color-dark-green)',
    color: 'white',
    padding: '30px 20px',
    position: 'fixed',
    display: 'flex',           
    flexDirection: 'column',    
    zIndex: 1000,
    boxSizing: 'border-box'
  };

  const navItem = (id) => ({
    padding: '12px 15px',
    cursor: 'pointer',
    background: activeTab === id ? 'var(--color-sage)' : 'transparent',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: '0.3s',
    fontWeight: activeTab === id ? 'bold' : 'normal'
  });

  return (
    <div style={{ display: 'flex', background: '#F6F0D7', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <aside style={sidebarStyle}>
        {/* Title now matches the Cream background color #F6F0D7 */}
        <h2 style={{ 
          fontSize: '1.8rem', 
          color: '#F6F0D7', 
          marginBottom: '40px',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(246, 240, 215, 0.2)', // Subtle cream line
          textAlign: 'center'
        }}>
          Admin Panel
        </h2>

        <nav style={{ flex: 1 }}>
          <div style={navItem('profile')} onClick={() => setActiveTab('profile')}>
            Profile
          </div>
          <div style={navItem('projects')} onClick={() => setActiveTab('projects')}>
            Projects
          </div>
        </nav>

        {/* Logout Button - Raised significantly from the bottom */}
        <div style={{ paddingBottom: '60px' }}> 
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              width: '100%',
              background: 'transparent',
              color: '#F6F0D7',
              border: '2px solid #F6F0D7',
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
                e.target.style.borderColor = '#F6F0D7';
                e.target.style.color = '#F6F0D7';
            }}
          >
            Logout & Return Home
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '250px', flex: 1, padding: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', margin: 0 }}>
            {activeTab === 'profile' ? 'Profile Management' : 'Project Portfolio'}
          </h1>
          <hr style={{ border: 'none', borderBottom: '2px solid var(--color-sage)', width: '50px', margin: '10px 0' }} />
        </header>

        <section>
          {activeTab === 'profile' ? <ProfileEditor /> : <ProjectManager />}
        </section>
      </main>
    </div>
  );
}