import React from 'react';
import QuizGame from '../components/QuizGame';

export default function QuestsPage() {
  // The QuizGame component will now generate its own questions from the Gemini API
  // since we are not passing any initialQuestions prop.
  return (
    <div className="quests-container">
      <h1 className="app-title">Daily Quests</h1>
      <p className="page-description">Complete quests to earn rewards and level up!</p>
      
      <div className="neon-card-grid">
        {/* Flashcard Challenge */}
        <div className="neon-card-wrapper">
          <div className="neon-card-glow"></div>
          <div className="neon-card">
            <h3>Flashcard Challenge</h3>
            <p>Test your knowledge with quick-fire questions.</p>
            <QuizGame type="flash" questionCount={3} />
          </div>
        </div>

        {/* Algorithmic Puzzle */}
        <div className="neon-card-wrapper">
          <div className="neon-card-glow"></div>
          <div className="neon-card">
            <h3>Algorithmic Puzzle</h3>
            <p>Solve a brain-teasing puzzle.</p>
            <QuizGame type="puzzle" questionCount={1} />
          </div>
        </div>

        {/* Mini-Project Scenario */}
        <div className="neon-card-wrapper">
          <div className="neon-card-glow"></div>
          <div className="neon-card">
            <h3>Mini-Project Scenario</h3>
            <p>Apply your skills to a real-world problem.</p>
            <QuizGame type="project" questionCount={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
