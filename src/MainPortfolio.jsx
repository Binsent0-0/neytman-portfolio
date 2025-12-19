import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.js';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function MainPortfolio() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: profileData } = await supabase.from('profiles').select('*').eq('profile_id', 1).single();
        setProfile(profileData);

        const { data: projectData } = await supabase.from('projects').select('*').eq('profile_id', 1);
        setProjects(projectData || []);
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="loading-screen">Loading Portfolio...</div>;

  return (
    <div>
      <Navbar />
      <About profile={profile} />
      <Skills />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}