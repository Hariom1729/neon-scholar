import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { generateGeminiResponse } from '../utils/gemini';
import StudentResponse from '../components/StudentResponse';

export default function CodeCoachPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tutorial, setTutorial] = useState('');

  const languages = [
    'Python', 'JavaScript', 'HTML/CSS',
    'Java', 'React', 'Node.js'
  ];

  const generateTutorial = async () => {
    setIsGenerating(true);
    setTutorial('');
    try {
      const prompt = `Create an interactive coding tutorial for the project/topic: "${topic}" using ${language}. Include a brief explanation, step-by-step instructions (3 steps), an example code snippet, and two practice exercises. Return as plain text.`;
      const text = await generateGeminiResponse(prompt);
      setTutorial(text || 'No tutorial generated.');
    } catch (error) {
      console.error('Tutorial generation error:', error);
      setTutorial('Sorry, there was an error generating your tutorial. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && language) {
      generateTutorial();
    }
  };

  const suggestionTopics = [
    'Building a To-Do App',
    'Creating an Interactive Game',
    'API Integration Basics',
    'Responsive Web Design'
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="teacher-header-card">
          <div className="emoji-avatar">🤖</div>
          <div>
            <h2>Code with Neo</h2>
            <p className="subtitle">Interactive Code Coach</p>
          </div>
        </div>
        <button className="btn ghost" onClick={() => navigate('/teacher-types')}>
          Back to Teachers
        </button>
      </div>

      <div className="content-grid code-coach">
        <div className="neon-card glow input-section">
          <h3>What would you like to build?</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a coding topic or project idea..."
              className="topic-input"
            />

            <div className="language-selection">
              <h4>Choose a Language/Framework:</h4>
              <div className="language-chips">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`btn ${language === lang ? 'primary' : 'ghost'} chip`}
                    onClick={() => setLanguage(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn primary generate-btn"
              type="submit"
              disabled={isGenerating || !topic.trim() || !language}
            >
              {isGenerating ? 'Creating Tutorial...' : 'Generate Interactive Tutorial'}
            </button>
          </form>

          <div className="suggestions">
            <h4>Project Ideas:</h4>
            <div className="suggestion-list">
              {suggestionTopics.map((t, i) => (
                <button
                  key={i}
                  className="btn ghost text-left"
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(tutorial || isGenerating) && (
          <div className="neon-card output-section">
            <h3>Your Coding Tutorial</h3>
            {isGenerating ? (
              <div className="loading-animation">
                <div className="emoji-spin">🤖</div>
                <p>Neo is preparing your tutorial...</p>
              </div>
            ) : (
              <div className="tutorial-content">
                <pre className="code-preview">{tutorial}</pre>
                <div className="action-buttons">
                  <button className="btn primary">Run Code</button>
                  <button className="btn ghost">Save Progress</button>
                </div>
              </div>
            )}
          </div>
        )}
        {tutorial && (
          <StudentResponse teacher="Neo" topic={topic} xp={12} onSubmitted={() => { }} />
        )}
      </div>
    </div>
  );
}