import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [newProj, setNewProj] = useState({ title: '', description: '', image_url: '' });

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').eq('profile_id', 1);
    setProjects(data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Image Upload to Storage
  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      setNewProj({ ...newProj, image_url: data.publicUrl });
      alert("Image uploaded!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddProject = async () => {
    if (!newProj.title || !newProj.image_url) {
      return alert("Title and Image are required");
    }
    
    const { error } = await supabase.from('projects').insert([{ ...newProj, profile_id: 1 }]);
    if (!error) {
      setNewProj({ title: '', description: '', image_url: '' });
      fetchProjects();
    } else {
      alert("Error adding project: " + error.message);
    }
  };

  const handleDelete = async (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      const { error } = await supabase.from('projects').delete().eq('project_id', projectId);
      if (error) {
        alert("Error deleting project: " + error.message);
      } else {
        fetchProjects();
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ color: 'var(--color-dark-green)', marginBottom: '20px' }}>Manage Projects</h2>
      
      {/* Add New Project Form */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add New Project</h3>
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Project Image</label>
        <div style={{ marginBottom: '20px' }}>
          {newProj.image_url && (
            <img 
              src={newProj.image_url} 
              alt="Preview" 
              style={{ width: '120px', height: '80px', borderRadius: '8px', objectFit: 'cover', display: 'block', marginBottom: '10px', border: '1px solid #ddd' }} 
            />
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={uploading} 
          />
        </div>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title</label>
        <input 
          placeholder="Project Title" 
          value={newProj.title} 
          onChange={e => setNewProj({...newProj, title: e.target.value})} 
          style={inputStyle} 
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
        <textarea 
          placeholder="What is this project about?" 
          value={newProj.description} 
          onChange={e => setNewProj({...newProj, description: e.target.value})} 
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
        />
        
        <button 
          onClick={handleAddProject} 
          style={{...btnStyle, opacity: uploading ? 0.5 : 1, width: '100%', marginTop: '10px'}} 
          disabled={uploading}
        >
          {uploading ? 'Uploading Image...' : 'Add Project to Portfolio'}
        </button>
      </div>

      {/* List Existing Projects */}
      <h3 style={{ marginBottom: '15px' }}>Existing Projects</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {projects.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No projects found in database.</p>
        ) : (
          projects.map(p => (
            <div 
              key={p.project_id} 
              style={{ 
                padding: '15px', 
                background: 'var(--color-light-green)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {/* Left Side: Thumbnail and Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img 
                  src={p.image_url} 
                  alt="" 
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', background: 'white' }} 
                />
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-dark-green)', fontSize: '1.1rem' }}>{p.title}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#555' }}>ID: {p.project_id}</span>
                </div>
              </div>

              {/* Right Side: Action Button */}
              <button 
                onClick={() => handleDelete(p.project_id, p.title)}
                style={{ 
                  background: '#ff4d4d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 18px', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#cc0000'}
                onMouseLeave={(e) => e.target.style.background = '#ff4d4d'}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  marginBottom: '15px', 
  borderRadius: '8px', 
  border: '1px solid #ddd',
  boxSizing: 'border-box',
  fontSize: '1rem'
};

const btnStyle = { 
  background: 'var(--color-dark-green)', 
  color: 'white', 
  padding: '12px 24px', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '1rem'
};