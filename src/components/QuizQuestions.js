import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: "Jupiter",
  },
  {
    question: "Who wrote the novel \"To Kill a Mockingbird\"?",
    options: ["Harper Lee", "J.K. Rowling", "Stephen King", "George Orwell"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
];

export default function QuizQuestions({ currentUser }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = async (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      if (currentUser) {
        const quizScoreRef = doc(db, "quizScores", currentUser.uid);
        await setDoc(quizScoreRef, { 
          name: currentUser.displayName || currentUser.email,
          score: score + (answer === questions[currentQuestionIndex].answer ? 1 : 0),
        }, { merge: true });
      }
    }
  };

  if (quizFinished) {
    return (
      <div className='neon-card'>
        <h2>Quiz Finished!</h2>
        <p>Your score: {score}/{questions.length}</p>
      </div>
    );
  }

  return (
    <div className='neon-card'>
      <h2>{questions[currentQuestionIndex].question}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {questions[currentQuestionIndex].options.map((option) => (
          <button className='btn primary' key={option} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
