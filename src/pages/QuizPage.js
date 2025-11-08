import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuizGame from '../components/QuizGame';
import { addXp } from '../utils/xp';

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Get quiz parameters from URL
  const quizType = searchParams.get('type') || 'game';
  const duration = searchParams.get('duration') ? parseInt(searchParams.get('duration')) : null;

  console.log('Quiz Parameters:', { quizType, duration });

  const handleQuizComplete = (score) => {
    addXp(score);
    // Navigate back to quests page after a short delay
    setTimeout(() => navigate('/quests'), 3000);
  };

  if (!quizStarted) {
    const quizInfo = {
      puzzle: {
        title: '🧩 Mini Puzzle Challenge',
        description: 'Solve coding puzzles and algorithmic challenges to earn your badge!',
        counts: [3, 5]
      },
      project: {
        title: '🛠️ Micro Project Quiz',
        description: 'Test your software architecture and development skills!',
        counts: [2, 4]
      },
      flash: {
        title: '⚡ Flash Learning',
        description: 'Quick-fire questions to boost your programming knowledge!',
        counts: [5, 8]
      },
      game: {
        title: '🎮 Quiz Challenge',
        description: 'Test your general programming knowledge!',
        counts: [5, 10, 15]
      }
    };

    const currentQuiz = quizInfo[quizType] || quizInfo.game;

    return (
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div className="neon-card" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #0ff',
          borderRadius: '10px',
          padding: '30px',
          color: '#fff'
        }}>
          <h2 style={{ color: '#0ff', textAlign: 'center', marginBottom: '20px' }}>
            {currentQuiz.title}
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            {currentQuiz.description}
          </p>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            How many questions would you like to answer?
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${currentQuiz.counts.length}, 1fr)`,
            gap: '15px',
            marginBottom: '20px'
          }}>
            {currentQuiz.counts.map(count => (
              <button
                key={count}
                onClick={() => {
                  setSelectedCount(count);
                  setQuizStarted(true);
                }}
                style={{
                  padding: '15px',
                  background: '#0ff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {count} Questions
              </button>
            ))}
          </div>
          {duration && (
            <p style={{
              color: '#0ff',
              textAlign: 'center',
              fontSize: '1.1rem',
              marginTop: '20px'
            }}>
              ⏱️ Time limit: {duration} minutes
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <QuizGame
        questionCount={selectedCount}
        type={quizType}
        duration={duration}
        onGameComplete={handleQuizComplete}
      />
    </div>
  );
}