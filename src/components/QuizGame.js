
import React, { useState, useEffect } from 'react';
import { generateDeepSeekResponse } from '../utils/deepseek';

export default function QuizGame({ questionCount = 5, type = 'game', duration, onGameComplete }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration ? duration * 60 : null);

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        let prompt;
        switch (type) {
          case 'puzzle':
            prompt = `Generate ${questionCount} algorithmic puzzle questions about programming. Each puzzle should be a small coding challenge or logic puzzle. Format the response as a JSON array where each object has: question (string), options (array of 4 strings), answer (string matching one of the options exactly), and explanation (string explaining the solution).`;
            break;
          case 'project':
            prompt = `Generate ${questionCount} mini-project scenario questions where each question presents a small coding project scenario and asks about the best approach/solution. Format as JSON array with: question (string describing the project scenario), options (array of 4 possible approaches), answer (string matching the best approach), and explanation (string explaining why it's the best choice).`;
            break;
          case 'flash':
            prompt = `Generate ${questionCount} quick, focused questions about programming fundamentals for rapid learning. Make them direct and concise. Format as JSON array with: question (string), options (array of 4 short answers), answer (string matching correct option), and fact (string with a brief interesting fact related to the answer).`;
            break;
          default:
            prompt = `Generate ${questionCount} multiple choice questions about programming concepts. Format the response as a JSON array where each object has: question (string), options (array of 4 strings), and answer (string matching one of the options exactly). Make questions engaging and fun.`;
        }
        const response = await generateDeepSeekResponse(prompt, 'deepseek-chat');
        const parsedQuestions = JSON.parse(response);
        setQuestions(parsedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error generating questions:', error);
        // Fallback to some default questions if API fails
        setQuestions([
          {
            question: "What is the most common way to handle asynchronous operations in modern JavaScript?",
            options: ["Callbacks", "Promises", "async/await", "setTimeout"],
            answer: "async/await"
          }
        ]);
        setLoading(false);
      }
    };

    generateQuestions();
  }, [questionCount]);

  if (loading) {
    return (
      <div className="neon-card">
        <h3>🤖 Generating Your Quiz...</h3>
        <p>The AI is crafting some interesting questions for you!</p>
      </div>
    );
  }

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
