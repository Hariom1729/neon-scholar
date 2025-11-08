import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ContestantRegistration() {
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setName(user.displayName || '');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const quizScoreRef = doc(db, "quizScores", currentUser.uid);
      await setDoc(quizScoreRef, { 
        name: name,
        score: 0,
      });
      console.log(`Registered: ${name}`);
    }
  };

  return (
    <div className="contestant-registration">
      <h3>Register for the Quiz</h3>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn primary">Register</button>
      </form>
    </div>
  );
}
