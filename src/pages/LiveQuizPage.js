import React, { useState, useEffect } from 'react';
import ContestantRegistration from '../components/ContestantRegistration';
import JoinQuiz from '../components/JoinQuiz';
import QuizQuestions from '../components/QuizQuestions';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './LiveQuizPage.css';

export default function LiveQuizPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="live-quiz-page">
      <div className="neon-card">
        <h2>Live Quiz Game</h2>
        <p>Welcome to the live quiz! Get ready to compete against other players in real-time.</p>
        {isRegistered ? (
          <QuizQuestions currentUser={currentUser} />
        ) : (
          <>
            <ContestantRegistration />
            <JoinQuiz onJoin={() => setIsRegistered(true)} />
          </>
        )}
      </div>
    </div>
  );
}
