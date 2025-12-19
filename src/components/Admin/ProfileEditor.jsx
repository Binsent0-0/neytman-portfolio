import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProfileEditor() {
  const [formData, setFormData] = useState({
    full_name: '', bio: '', organization: '', job_role: '', image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase.from('profiles').select('*').eq('profile_id', 1).single();
      if (data) setFormData(data);
    }
    getProfile();
  }, []);

  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile-pics/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      setFormData({ ...formData, image_url: data.publicUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          organization: formData.organization,
          job_role: formData.job_role,
          image_url: formData.image_url
        })
        .eq('profile_id', 1);

      if (error) throw error;
      alert('Profile Updated successfully!');
    } catch (error) {
      alert(`Save Failed: ${error.message}`);
    }
  };

  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    marginBottom: '15px', 
    borderRadius: '8px', 
    border: '1px solid var(--color-accent)', 
    background: 'var(--color-bg-dark)', 
    color: 'var(--color-cream-light)',
    display: 'block',
    outline: 'none'
  };

  return (
    <div>
      <h2 style={{ color: 'var(--color-cream-light)', marginBottom: '20px' }}>Edit Profile</h2>
      <div style={{ 
        background: 'var(--color-charcoal)', 
        padding: '30px', 
        borderRadius: '16px', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        border: '1px solid rgba(247, 231, 206, 0.05)'
      }}>
        
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-accent)', fontWeight: 'bold' }}>Profile Image</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
          <img 
            src={formData.image_url || 'https://via.placeholder.com/100'} 
            alt="Preview" 
            style={{ width: '85px', height: '85px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-accent)' }} 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={uploading}
            style={{ color: 'var(--color-cream-light)' }}
          />
        </div>

        <label style={{ color: 'var(--color-cream-light)' }}>Full Name</label>
        <input style={inputStyle} value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
        
        <label style={{ color: 'var(--color-cream-light)' }}>Job Role</label>
        <input style={inputStyle} value={formData.job_role} onChange={(e) => setFormData({...formData, job_role: e.target.value})} />

        <label style={{ color: 'var(--color-cream-light)' }}>Organization</label>
        <input style={inputStyle} value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
        
        <label style={{ color: 'var(--color-cream-light)' }}>Bio</label>
        <textarea style={{...inputStyle, height: '100px', resize: 'vertical'}} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
        
        <button 
          onClick={handleSave}
          style={{ 
            background: 'var(--color-accent)', 
            color: 'white', 
            border: 'none', 
            padding: '14px 28px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          {uploading ? 'Processing...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}