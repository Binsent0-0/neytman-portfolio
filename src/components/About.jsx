import { useState, useEffect } from 'react';

export default function About({ profile }) {
  const name = profile?.full_name || "Nathaniel Santos";
  const role = profile?.job_role || "Information Technology Student";
  const org = profile?.organization || "La Consolacion University Philippines";
  
  const words = [name, role, org];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const typingGoal = 1500;
    const erasingGoal = 800;
    const pauseTime = 1000;

    const currentWordLength = words[index].length;
    const typingSpeed = typingGoal / currentWordLength;
    const erasingSpeed = erasingGoal / currentWordLength;

    if (subIndex === currentWordLength + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? erasingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <section id="about">
      <h2 style={{ color: 'var(--color-cream-light)', borderBottomColor: 'var(--color-accent)' }}>
        About Me
      </h2>
      
      {/* Container ensures items start from the left (flex-start) */}
      <div style={{ 
        display: 'flex', 
        gap: '35px', 
        alignItems: 'flex-start', // Aligns top of image with top of text
        marginTop: '30px', 
        flexWrap: 'wrap' 
      }}>
        
        {/* Photo on the Left */}
        <img 
          src={profile?.image_url || "https://via.placeholder.com/200"} 
          alt="Nathaniel" 
          style={{ 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            border: '4px solid var(--color-accent)', 
            objectFit: 'cover',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            flexShrink: 0 // Prevents image from getting squished
          }} 
        />

        {/* Text Content on the Right */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ 
            fontSize: '2.5rem', 
            minHeight: '1.2em', 
            color: 'var(--color-cream-light)', 
            margin: '0 0 10px 0'
          }}>
            {`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? '' : '|'}`}
          </h3>
          
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.8', 
            maxWidth: '600px', 
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0'
          }}>
            {profile?.bio || "Loading biography..."}
          </p>
          
          <div style={{ 
            marginTop: '20px', 
            color: 'var(--color-accent)', 
            fontWeight: 'bold', 
            fontSize: '1.1rem'
          }}>
            <span>{role}</span> @ <span style={{ color: 'var(--color-cream-light)' }}>{org}</span>
          </div>
        </div>
      </div>
    </section>
  );
}