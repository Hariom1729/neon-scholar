import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { generateDeepSeekResponse } from '../utils/deepseek';
import StudentResponse from '../components/StudentResponse';

export default function MathMentorPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsGenerating(true);
    setExplanation('');
    setVideoUrl('');
    try {
      const prompt = `Create a clear, step-by-step animated explainer script for the math topic: "${topic}". Include a short narrated explanation (3-6 sentences), a list of 4 animation scenes describing what should appear visually in each scene, and a short caption for each scene. Return the result as plain text.`;
      const text = await generateDeepSeekResponse(prompt, 'deepseek-chat');
      // For now we display the text explanation + animation guidance. Video URL generation not implemented here.
      setExplanation(text || `Explanation for ${topic} (no content returned).`);
      // Optionally keep a placeholder video or integration later
      setVideoUrl('');
    } catch (err) {
      console.error(err);
      setExplanation(`Error generating explanation: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestionTopics = [
    'Quadratic Equations',
    'Trigonometry Basics',
    'Probability Theory',
    'Linear Algebra',
    'Calculus Introduction'
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="teacher-header-card">
          <div className="emoji-avatar">🧠</div>
          <div>
            <h2>Math with Milo</h2>
            <p className="subtitle">Visual Math Mentor</p>
          </div>
        </div>
        <button className="btn ghost" onClick={() => navigate('/teacher-types')}>
          Back to Teachers
        </button>
      </div>

      <div className="content-grid math-mentor">
        <div className="neon-card glow input-section">
          <h3>What would you like to learn?</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a math topic or concept..."
              className="topic-input"
            />
            <button
              className="btn primary generate-btn"
              type="submit"
              disabled={isGenerating || !topic.trim()}
            >
              {isGenerating ? 'Generating Visual Explanation...' : 'Generate Animation'}
            </button>
          </form>

          <div className="suggestions">
            <h4>Popular Topics:</h4>
            <div className="suggestion-chips">
              {suggestionTopics.map((t, i) => (
                <button
                  key={i}
                  className="btn ghost chip"
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(videoUrl || isGenerating || explanation) && (
          <div className="neon-card video-section">
            <h3>Your Visual Explanation</h3>
            {isGenerating ? (
              <div className="loading-animation">
                <div className="emoji-spin">🧠</div>
                <p>Milo is preparing your visual explanation...</p>
              </div>
            ) : (
              <>
                <div className="video-container">
                  <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="explanation">{explanation}</p>
                <StudentResponse teacher="Milo" topic={topic} xp={10} onSubmitted={() => { /* placeholder */ }} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}