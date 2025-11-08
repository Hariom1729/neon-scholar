import React from 'react';

export default function JoinQuiz({ onJoin }) {
  const handleJoin = () => {
    // Handle joining the quiz logic here
    console.log('Joined the quiz!');
    if (onJoin) {
      onJoin();
    }
  };

  return (
    <div className="join-quiz">
      <h3>Ready to Play?</h3>
      <button onClick={handleJoin} className="btn primary">Join the Quiz</button>
    </div>
  );
}
