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

  // Handle Image Upload to Supabase Storage
  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile-pics/${fileName}`;

      // 1. Upload file to 'portfolio-images' bucket
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get the Public URL
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      
      setFormData({ ...formData, image_url: data.publicUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image: ' + error.message);
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
    console.error('Full Error Object:', error);
    alert(`Save Failed: ${error.message} (Code: ${error.code})`);
  }
};

  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid var(--color-sage)', display: 'block' };

  return (
    <div>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Edit Profile</h2>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        
        {/* Profile Image Preview & Upload */}
        <label>Profile Image</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <img 
            src={formData.image_url || 'https://via.placeholder.com/100'} 
            alt="Preview" 
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-sage)' }} 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={uploading}
          />
        </div>

        <label>Full Name</label>
        <input style={inputStyle} value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
        
        <label>Job Role</label>
        <input style={inputStyle} value={formData.job_role} onChange={(e) => setFormData({...formData, job_role: e.target.value})} />

        {/* Added Organization Field */}
        <label>Organization</label>
        <input style={inputStyle} value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
        
        <label>Bio</label>
        <textarea style={{...inputStyle, height: '100px'}} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
        
        <button 
          onClick={handleSave}
          style={{ 
            background: 'var(--color-dark-green)', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold' 
          }}
        >
          {uploading ? 'Uploading...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}