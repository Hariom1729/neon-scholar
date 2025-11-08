import React from 'react';
import { useNavigate } from 'react-router-dom';
import NPCTeacher from '../components/NPCTeacher';
import './pages.css';

export default function TeacherTypesPage() {
  const navigate = useNavigate();

  const teacherTypes = [
    {
      name: 'Milo',
      role: 'Math Mentor',
      emoji: '🧠',
      description: 'Makes complex math concepts simple and fun. Uses visual examples and real-world applications.',
      specialties: ['Visual Math', 'Problem Solving', 'Number Theory'],
      catchphrase: "Let's break this down step by step!"
    },
    {
      name: 'Ava',
      role: 'Story Guide',
      emoji: '🪄',
      description: 'Brings learning to life through interactive storytelling and creative writing exercises.',
      specialties: ['Creative Writing', 'Literature', 'Character Development'],
      catchphrase: "Every lesson tells a story!"
    },
    {
      name: 'Neo',
      role: 'Code Coach',
      emoji: '🤖',
      description: 'Makes coding accessible with hands-on projects and instant feedback.',
      specialties: ['Programming Basics', 'Web Development', 'Game Design'],
      catchphrase: "Let's debug this together!"
    },
    {
      name: 'Zoe',
      role: 'Design Mentor',
      emoji: '🎨',
      description: 'Teaches design thinking and creative problem-solving through visual projects.',
      specialties: ['UI/UX Design', 'Color Theory', 'Digital Art'],
      catchphrase: "Design is about solving problems beautifully!"
    }
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <h2>AI NPC Teacher Types</h2>
        <button className="btn ghost" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>

      <div className="content-grid">
        {teacherTypes.map((teacher, idx) => (
          <div key={idx} className="neon-card glow teacher-card">
            <div className="teacher-header">
              <NPCTeacher name={teacher.name} role={teacher.role} emoji={teacher.emoji} />
            </div>
            <div className="teacher-content">
              <p>{teacher.description}</p>
              <div className="specialties">
                <strong>Specialties:</strong>
                <ul>
                  {teacher.specialties.map((specialty, i) => (
                    <li key={i}>{specialty}</li>
                  ))}
                </ul>
              </div>
              <div className="catchphrase">
                <em>"{teacher.catchphrase}"</em>
              </div>
            </div>
            <button
              className="btn primary"
              onClick={() => {
                switch (teacher.name) {
                  case 'Milo':
                    navigate('/math-mentor');
                    break;
                  case 'Ava':
                    navigate('/story-guide');
                    break;
                  case 'Neo':
                    navigate('/code-coach');
                    break;
                  case 'Zoe':
                    navigate('/design-mentor');
                    break;
                  default:
                    alert(`Starting lesson with ${teacher.name}!`);
                }
              }}
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}