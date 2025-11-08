import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { generateGeminiResponse } from '../utils/gemini';
import StudentResponse from '../components/StudentResponse';

export default function DesignMentorPage() {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [design, setDesign] = useState('');

  const styles = [
    'Minimalist', 'Neon/Cyberpunk', 'Material Design',
    'Neumorphism', 'Glassmorphism', 'Retro'
  ];

  const generateDesign = async () => {
    setIsGenerating(true);
    setDesign('');
    try {
      const prompt = `Create a practical design guide for the project: "${projectType}" with the style: ${style}. Include a suggested color palette, typography choices, a simple layout wireframe description, and three actionable next steps. Return as plain text.`;
      const text = await generateGeminiResponse(prompt);
      setDesign(text || 'No design generated.');
    } catch (error) {
      console.error('Design generation error:', error);
      setDesign('Sorry, there was an error generating your design. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectType.trim() && style) {
      generateDesign();
    }
  };

  const suggestionProjects = [
    'Modern Landing Page',
    'Mobile App Dashboard',
    'E-commerce Product Page',
    'Social Media Profile'
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="teacher-header-card">
          <div className="emoji-avatar">🎨</div>
          <div>
            <h2>Design with Zoe</h2>
            <p className="subtitle">Visual Design Mentor</p>
          </div>
        </div>
        <button className="btn ghost" onClick={() => navigate('/teacher-types')}>
          Back to Teachers
        </button>
      </div>

      <div className="content-grid design-mentor">
        <div className="neon-card glow input-section">
          <h3>What would you like to design?</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="Enter your design project idea..."
              className="topic-input"
            />

            <div className="style-selection">
              <h4>Choose a Style:</h4>
              <div className="style-chips">
                {styles.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`btn ${style === s ? 'primary' : 'ghost'} chip`}
                    onClick={() => setStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn primary generate-btn"
              type="submit"
              disabled={isGenerating || !projectType.trim() || !style}
            >
              {isGenerating ? 'Creating Design Concept...' : 'Generate Design Guide'}
            </button>
          </form>

          <div className="suggestions">
            <h4>Project Ideas:</h4>
            <div className="suggestion-list">
              {suggestionProjects.map((project, i) => (
                <button
                  key={i}
                  className="btn ghost text-left"
                  onClick={() => setProjectType(project)}
                >
                  {project}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(design || isGenerating) && (
          <div className="neon-card output-section">
            <h3>Your Design Guide</h3>
            {isGenerating ? (
              <div className="loading-animation">
                <div className="emoji-spin">🎨</div>
                <p>Zoe is crafting your design...</p>
              </div>
            ) : (
              <div className="design-guide">
                <pre className="design-preview">{design}</pre>
                <div className="action-buttons">
                  <button className="btn primary">View Mockup</button>
                  <button className="btn ghost">Export Guide</button>
                </div>
              </div>
            )}
          </div>
        )}
        {design && (
          <StudentResponse teacher="Zoe" topic={projectType} xp={10} onSubmitted={() => { }} />
        )}
      </div>
    </div>
  );
}