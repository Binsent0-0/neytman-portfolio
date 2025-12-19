import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProfileEditor() {
  const [formData, setFormData] = useState({
    full_name: '', bio: '', organization: '', job_role: '', image_url: ''
  });

  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase.from('profiles').select('*').eq('profile_id', 1).single();
      if (data) setFormData(data);
    }
    getProfile();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.from('profiles').update(formData).eq('profile_id', 1);
    alert(error ? 'Error saving' : 'Profile Updated!');
  };

  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid var(--color-sage)' };

  return (
    <div>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Edit Profile</h2>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <label>Full Name</label>
        <input style={inputStyle} value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
        
        <label>Job Role</label>
        <input style={inputStyle} value={formData.job_role} onChange={(e) => setFormData({...formData, job_role: e.target.value})} />
        
        <label>Bio</label>
        <textarea style={{...inputStyle, height: '100px'}} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
        
        <button 
          onClick={handleSave}
          style={{ background: 'var(--color-dark-green)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}