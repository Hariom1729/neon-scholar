import React, { useState } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizGame from '../components/QuizGame';

export default function QuizPage() {
  const [gameId, setGameId] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  const startQuiz = (count) => {
    setQuestionCount(count);
    setGameId(prevId => prevId + 1); // This forces a The AI is taking a nap! What is the most common way to handle asynchronous operations in modern JavaScript?new component instance
  };

  // If a question count is selected, render the game with a unique key
  if (gameId > 0) {
    return <QuizGame key={gameId} questionCount={questionCount} type="game" />;
  }
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const quizType = searchParams.get('type') || 'javascript';

  const handleGameComplete = (score) => {
    console.log('Quiz complete! Score:', score);
    addXp(score);
    navigate('/quests');
  };

  const questionCount = quizType === 'flash' ? 10 : 5;

  // Otherwise, show the selection screen
  return (
    <div className="neon-card-container" style={{ textAlign: 'center' }}>
      <div className="neon-card large">
        <h2><span role="img" aria-label="game controller">🎮</span> Quiz Challenge</h2>
        <p>Test your general programming knowledge!</p>
        <p className="small-muted" style={{ marginBottom: '24px' }}>How many questions would you like to answer?</p>
        <div className="button-group">
          <button className="btn primary large" onClick={() => startQuiz(5)}>5 Questions</button>
          <button className="btn primary large" onClick={() => startQuiz(10)}>10 Questions</button>
          <button className="btn primary large" onClick={() => startQuiz(15)}>15 Questions</button>
        </div>
      </div>
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <QuizGame 
        key={quizType} 
        topic={quizType} 
        questionCount={questionCount}
        onGameComplete={handleGameComplete} 
      />
    </div>
  );
}
