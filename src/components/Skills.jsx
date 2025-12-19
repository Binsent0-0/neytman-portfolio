import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaJava, 
  FaPython, 
  FaReact, 
  FaDatabase,
  FaHashtag 
} from 'react-icons/fa';

export default function Skills() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "JS", icon: <FaJsSquare /> },
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "React", icon: <FaReact /> },
    { name: "C#", icon: <FaHashtag /> }, 
    { name: "SQL", icon: <FaDatabase /> },
  ];

  return (
    <section id="skills">
      <h2 style={{ 
        color: 'var(--color-cream-light)', 
        borderBottom: '2px solid var(--color-accent)',
        marginBottom: '30px' 
      }}>
        Technical Skills
      </h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        gap: '15px', 
        flexWrap: 'wrap', 
        marginTop: '20px' 
      }}>
        {skills.map((skill) => (
          <div 
            key={skill.name} 
            style={{ 
              background: 'var(--color-charcoal)', // Deep charcoal background
              color: 'var(--color-cream-light)',  // Light cream text
              padding: '12px 24px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              border: '1px solid rgba(146, 129, 122, 0.2)', // Subtle bronze border
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(57, 62, 70, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(146, 129, 122, 0.2)';
              e.currentTarget.style.background = 'var(--color-charcoal)';
            }}
          >
            <span style={{ 
              fontSize: '1.4rem', 
              display: 'flex', 
              color: 'var(--color-accent)' // Bronze color for the icon itself
            }}>
              {skill.icon}
            </span>
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}