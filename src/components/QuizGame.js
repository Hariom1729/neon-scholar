import React, { useState, useEffect } from 'react';
import { generateGeminiResponse } from '../utils/gemini';
import './QuizGame.css';

const QuizGame = ({ questionCount, type, initialQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQuestions = async () => {
      if (initialQuestions) {
        setQuestions(initialQuestions);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let prompt;
        switch (type) {
          case 'puzzle':
            prompt = `Generate ${questionCount} algorithmic puzzle questions about programming. The response MUST be a JSON array where each object has: "question" (string), "options" (array of 4 strings), "answer" (string matching one of the options exactly), and "explanation" (string). Do not include any other text or formatting.`;
            break;
          case 'project':
            prompt = `Generate ${questionCount} mini-project scenario questions. The response MUST be a JSON array where each object has: "question" (string), "options" (array of 4 strings), "answer" (string), and "explanation" (string).`;
            break;
          case 'flash':
            prompt = `Generate ${questionCount} flashcard-style questions about general knowledge. The response MUST be a JSON array where each object has: "question" (string), "options" (array of 4 strings), "answer" (string), and "explanation" (string).`;
            break;
          case 'game':
            prompt = `Generate ${questionCount} programming quiz questions. The questions can cover topics like data structures, algorithms, and language features. The response MUST be a JSON array where each object has: "question" (string), "options" (array of 4 strings), "answer" (string), and "explanation" (string). Do not include any other text or formatting.`;
            break;
          default:
            prompt = `Generate 1 general knowledge quiz question.`;
        }

        const responseText = await generateGeminiResponse(prompt);
        
        const jsonMatch = responseText.match(/\n*```json\n([\s\S]*?)\n```|([\s\S]*)/);
        const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[2]).trim() : '';

        if (!jsonString) {
          throw new Error('No valid JSON content found in the API response.');
        }

        const parsedQuestions = JSON.parse(jsonString);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error('Error generating or parsing questions:', error);
        setQuestions([
          {
            question: "What is the most common way to handle asynchronous operations in modern JavaScript?",
            options: ["Callbacks", "Promises", "async/await", "setTimeout"],
            answer: "async/await"
          },
          {
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "High-Level Text Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
            answer: "HyperText Markup Language"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    generateQuestions();
  }, [questionCount, type, initialQuestions]);

  const handleAnswerOptionClick = (option) => {
    if (questions[currentQuestion] && option === questions[currentQuestion].answer) {
      setScore(score + 10);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return (
      <div className="neon-card">
        <h3>🤖 Generating Your Quiz...</h3>
        <p>The AI is crafting some interesting questions for you!</p>
      </div>
    );
  }

  if (showScore || !questions || questions.length === 0) {
    return (
      <div className='score-section neon-card'>
        <h2>You scored {score} out of {questions.length * 10}</h2>
        <button onClick={() => window.location.reload()} className="btn secondary">Play Again</button>
      </div>
    );
  }

  return (
    <div className="neon-card">
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Quiz</h3>
      <div className='question-section'>
        <div className='question-count'>
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className='question-text'>{questions[currentQuestion]?.question}</div>
      </div>
      <div className='answer-section'>
        {questions[currentQuestion]?.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerOptionClick(option)} className="btn quiz-option">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizGame;
