import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { generateGeminiResponse } from '../utils/gemini';
import StudentResponse from '../components/StudentResponse';

export default function StoryGuidePage() {
  const navigate = useNavigate();
  const [storyPrompt, setStoryPrompt] = useState('');
  const [genre, setGenre] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyOutline, setStoryOutline] = useState('');

  const genres = [
    'Fantasy', 'Mystery', 'Science Fiction',
    'Adventure', 'Historical', 'Contemporary'
  ];

  const generateStory = async () => {
    setIsGenerating(true);
    setStoryOutline('');
    try {
      const prompt = `Create a detailed story outline for the idea: "${storyPrompt}" in the ${genre} genre. Include a 3-5 sentence synopsis, chapter breakdown with 3 chapters, and three specific writing prompts for the student to continue the story. Return as plain text.`;
      const text = await generateGeminiResponse(prompt);
      setStoryOutline(text || 'No story generated.');
    } catch (error) {
      console.error('Story generation error:', error);
      setStoryOutline('Sorry, there was an error generating your story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storyPrompt.trim() && genre) {
      generateStory();
    }
  };

  const suggestionPrompts = [
    'A magical library that comes alive at night',
    'Time-traveling siblings solve historical mysteries',
    'A young inventor creates an emotion-reading device',
    'The last bookstore in a digital world'
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <div className="teacher-header-card">
          <div className="emoji-avatar">🪄</div>
          <div>
            <h2>Stories with Ava</h2>
            <p className="subtitle">Interactive Story Guide</p>
          </div>
        </div>
        <button className="btn ghost" onClick={() => navigate('/teacher-types')}>
          Back to Teachers
        </button>
      </div>

      <div className="content-grid story-guide">
        <div className="neon-card glow input-section">
          <h3>What story shall we create today?</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={storyPrompt}
              onChange={(e) => setStoryPrompt(e.target.value)}
              placeholder="Enter your story idea or prompt..."
              className="story-input"
              rows={3}
            />

            <div className="genre-selection">
              <h4>Choose a Genre:</h4>
              <div className="genre-chips">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`btn ${genre === g ? 'primary' : 'ghost'} chip`}
                    onClick={() => setGenre(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn primary generate-btn"
              type="submit"
              disabled={isGenerating || !storyPrompt.trim() || !genre}
            >
              {isGenerating ? 'Crafting Your Story...' : 'Create Story Outline'}
            </button>
          </form>

          <div className="suggestions">
            <h4>Story Prompt Ideas:</h4>
            <div className="suggestion-list">
              {suggestionPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="btn ghost text-left"
                  onClick={() => setStoryPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(storyOutline || isGenerating) && (
          <div className="neon-card output-section">
            <h3>Your Story Blueprint</h3>
            {isGenerating ? (
              <div className="loading-animation">
                <div className="emoji-spin">🪄</div>
                <p>Ava is weaving your story...</p>
              </div>
            ) : (
              <div className="story-outline">
                <pre>{storyOutline}</pre>
                <div className="action-buttons">
                  <button className="btn primary">Continue Writing</button>
                  <button className="btn ghost">Save Draft</button>
                </div>
              </div>
            )}
          </div>
        )}
        {storyOutline && (
          <StudentResponse teacher="Ava" topic={storyPrompt} xp={8} onSubmitted={() => { }} />
        )}
      </div>
    </div>
  );
}