import { useState, useEffect } from 'react';

export default function About({ profile }) {
  // Use data from DB or fallback to your provided info
  const name = profile?.full_name || "Nathaniel Santos";
  const role = profile?.job_role || "Full Stack Developer";
  const org = profile?.organization || "Independent Developer";
  
  const words = [name, role, org];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typewriter Effect Logic
  // Typewriter Effect Logic
  useEffect(() => {
    // Total time allowed for typing the full word (in milliseconds)
    const typingGoal = 1500; // 1.5s to type
    const erasingGoal = 800;  // 0.8s to erase
    const pauseTime = 1000;   // 1s pause when word is finished

    // Calculate speed based on word length
    const currentWordLength = words[index].length;
    const typingSpeed = typingGoal / currentWordLength;
    const erasingSpeed = erasingGoal / currentWordLength;

    // 1. Finished typing -> Wait then start reversing
    if (subIndex === currentWordLength + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    // 2. Finished erasing -> Move to next word
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // 3. Set the interval for the next character
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? erasingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <section id="about">
      <h2>About Me</h2>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        <img 
          src={profile?.image_url || "https://via.placeholder.com/200"} 
          alt="Nathaniel" 
          style={{ width: '200px', height: '200px', borderRadius: '50%', border: '5px solid var(--color-sage)', objectFit: 'cover' }} 
        />
        <div>
          {/* The Typing Header */}
          <h3 style={{ fontSize: '2rem', minHeight: '1.2em', color: 'var(--color-dark-green)' }}>
            {`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? '' : '|'}`}
          </h3>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
            {profile?.bio || "Loading biography..."}
          </p>
          
          <div style={{ marginTop: '10px', color: 'var(--color-sage)', fontWeight: 'bold' }}>
            <span>{role}</span> @ <span>{org}</span>
          </div>
        </div>
      </div>
    </section>
  );
}