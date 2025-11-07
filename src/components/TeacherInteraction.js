import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ui.css';

export default function TeacherInteraction() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with Gemini API
      // This is a placeholder response
      const dummyResponse = "Based on your input, here's a personalized learning path...";
      setResponse(dummyResponse);

      // Here you would integrate with Veo3 API for video generation
      // This is a placeholder video URL
      const dummyVideoUrl = "https://example.com/generated-video.mp4";
      setVideoUrl(dummyVideoUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="header-row">
        <div className="app-title">AI Teacher Interaction</div>
        <button className="btn ghost" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>

      <div className="left-panel">
        <div className="neon-card glow">
          <h3>Chat with AI Teacher</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask your AI teacher anything... (e.g., 'Can you explain quantum physics in simple terms?')"
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '12px',
                color: '#fff',
                marginBottom: '12px'
              }}
            />
            <button
              className="btn primary"
              type="submit"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? 'Processing...' : 'Get Response & Generate Video'}
            </button>
          </form>
        </div>

        {response && (
          <div className="neon-card">
            <h3>AI Response</h3>
            <div className="response-content" style={{ whiteSpace: 'pre-wrap' }}>
              {response}
            </div>
          </div>
        )}

        {videoUrl && (
          <div className="neon-card">
            <h3>Generated Video Explanation</h3>
            <div className="video-container" style={{ marginTop: '12px' }}>
              <video
                controls
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.2)'
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>

      <aside className="right-panel">
        <div className="neon-card">
          <h4>Tips for Better Responses</h4>
          <ul className="small-muted" style={{ paddingLeft: '20px' }}>
            <li>Be specific with your questions</li>
            <li>Mention your current knowledge level</li>
            <li>Ask for examples when needed</li>
            <li>Request simpler explanations if needed</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}