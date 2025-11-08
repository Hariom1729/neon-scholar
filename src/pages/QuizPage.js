import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizGame from '../components/QuizGame';
import { addXp } from '../utils/xp';

export default function QuizPage() {
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

  return (
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
