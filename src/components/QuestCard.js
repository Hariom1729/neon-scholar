import React, { useState } from 'react';
import QuizGame from './QuizGame'; // Import the new QuizGame component

export default function QuestCard({ title, desc, xp, onComplete, quizType, quizQuestions }) {
  const [isQuizActive, setIsQuizActive] = useState(false);

  const handleQuizComplete = (score) => {
    console.log(`Quiz finished with score: ${score}`);
    if (score > 0) {
      // You can add more logic here, like giving XP based on the score
      if (typeof onComplete === 'function') {
        onComplete({ title, xp, score });
      }
    }
    // Reset state
    setIsQuizActive(false);
  };

  // A quest is a quiz if it has a quizType or pre-defined questions
  const isQuizQuest = quizType || (quizQuestions && quizQuestions.length > 0);

  if (isQuizActive) {
    return (
      <QuizGame 
        type={quizType} 
        questions={quizQuestions}
        onGameComplete={handleQuizComplete} 
      />
    );
  }

  return (
    <div className="neon-card quest">
      <h4>{title}</h4>
      <p>{desc}</p>

      <div className="actions">
        {isQuizQuest ? (
          <button className="btn primary" onClick={() => setIsQuizActive(true)}>Start Quest ⚡️</button>
        ) : (
          <button className="btn primary" onClick={() => onComplete({ title, xp })}>Complete ✅</button>
        )}
        <button className="btn ghost">Later ⏳</button>
      </div>
      
      {xp && <div className="xp-badge">+{xp} XP</div>}
    </div>
  );
}
