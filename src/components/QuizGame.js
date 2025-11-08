
import React, { useState } from 'react';

const questions = [
  {
    question: "What is the output of the following code? `console.log(typeof null);`",
    options: ["'null'", "'object'", "'undefined'", "'string'"],
    answer: "'object'",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["string", "number", "boolean", "character"],
    answer: "character",
  },
  {
    question: "What does the `===` operator do in JavaScript?",
    options: ["Compares for equality without type conversion", "Compares for equality with type conversion", "Assigns a value to a variable", "None of the above"],
    answer: "Compares for equality without type conversion",
  },
];

export default function QuizGame({ onGameComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 10);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      onGameComplete(score + (option === questions[currentQuestion].answer ? 10 : 0));
    }
  };

  return (
    <div className="neon-card">
      <h3>JavaScript Quiz</h3>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length * 10}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)} className="btn primary">
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
