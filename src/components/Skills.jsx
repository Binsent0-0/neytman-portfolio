import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaJava, 
  FaPython, 
  FaReact, 
  FaDatabase,
  FaHashtag // Using this as a clean fallback for C# if SiCsharp fails
} from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb'; // Tabler Icons often has better brand support

export default function Skills() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "JS", icon: <FaJsSquare /> },
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "React", icon: <FaReact /> },
    { name: "C#", icon: <FaHashtag /> }, // Reliable fallback
    { name: "SQL", icon: <FaDatabase /> },
  ];

  return (
    <section id="skills" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Skills</h2>
      
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
              background: 'var(--color-sage)', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '1.4rem', display: 'flex' }}>{skill.icon}</span>
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}