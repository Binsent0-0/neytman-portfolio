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

  useEffect(() => { fetchProjects(); }, []);

  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      setNewProj({ ...newProj, image_url: data.publicUrl });
      alert("Uploaded!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddProject = async () => {
    if (!newProj.title || !newProj.image_url) return alert("Title and Image required");
    const { error } = await supabase.from('projects').insert([{ ...newProj, profile_id: 1 }]);
    if (!error) {
      setNewProj({ title: '', description: '', image_url: '' });
      fetchProjects();
    }
  };

  const handleDelete = async (projectId, projectTitle) => {
    if (window.confirm(`Delete "${projectTitle}"?`)) {
      await supabase.from('projects').delete().eq('project_id', projectId);
      fetchProjects();
    }
  };

  const inputStyle = { 
    width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', 
    border: '1px solid var(--color-accent)', background: 'var(--color-bg-dark)', 
    color: 'var(--color-cream-light)', boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ color: 'var(--color-cream-light)', marginBottom: '25px' }}>Manage Portfolio</h2>
      
      <div style={{ 
        background: 'var(--color-charcoal)', padding: '30px', borderRadius: '16px', 
        marginBottom: '40px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' 
      }}>
        <h3 style={{ color: 'var(--color-accent)', marginTop: 0 }}>Add New Project</h3>
        
        <label style={{ color: 'var(--color-cream-light)', display: 'block', margin: '15px 0 8px' }}>Project Cover</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          {newProj.image_url && <img src={newProj.image_url} style={{ width: '100px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--color-accent)' }} alt="Preview" />}
          <input type="file" onChange={handleImageUpload} disabled={uploading} style={{ color: 'var(--color-cream-light)' }} />
        </div>

        <input placeholder="Title" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} style={inputStyle} />
        <textarea placeholder="Description" value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} style={{ ...inputStyle, minHeight: '100px' }} />
        
        <button onClick={handleAddProject} disabled={uploading} style={{ 
          background: 'var(--color-accent)', color: 'white', padding: '14px', width: '100%', 
          borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' 
        }}>
          {uploading ? 'Uploading...' : 'Add Project'}
        </button>
      </div>

      <h3 style={{ color: 'var(--color-cream-light)', marginBottom: '20px' }}>Existing Portfolio</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {projects.map(p => (
          <div key={p.project_id} style={{ 
            padding: '15px', background: 'var(--color-charcoal)', borderRadius: '12px', 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid rgba(247, 231, 206, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={p.image_url} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} alt="" />
              <strong style={{ color: 'var(--color-cream-light)' }}>{p.title}</strong>
            </div>
            <button onClick={() => handleDelete(p.project_id, p.title)} style={{ 
              background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', 
              padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' 
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}