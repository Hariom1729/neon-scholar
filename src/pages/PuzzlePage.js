import React, { useState, useEffect } from 'react';
import { generateDeepSeekResponse } from '../utils/deepseek';
import { addXp } from '../utils/xp';

export default function PuzzlePage() {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = async () => {
    setLoading(true);
    try {
      const prompt = `Generate a programming puzzle with the following format:
      {
        "question": "A challenging but fun programming puzzle question",
        "hints": ["Hint 1", "Hint 2", "Hint 3"],
        "solution": "The detailed solution explanation",
        "testCases": [
          {"input": "example input", "output": "expected output"},
          {"input": "another input", "output": "expected output"}
        ],
        "difficulty": "medium",
        "category": "algorithms/data-structures/logic",
        "xpReward": 50
      }
      Make it engaging and educational. Focus on logic, algorithms, or data structures.`;

      const response = await generateDeepSeekResponse(prompt, 'deepseek-chat');
      const parsedPuzzle = JSON.parse(response);
      setPuzzle(parsedPuzzle);
    } catch (error) {
      console.error('Error generating puzzle:', error);
      // Fallback puzzle if API fails
      setPuzzle({
        question: "Given an array of numbers, write a solution to find the two numbers that add up to a target sum.",
        hints: [
          "Think about using a hash table",
          "You can solve this in O(n) time",
          "What if you store the numbers you've seen?"
        ],
        solution: "Use a hash map to store each number as you iterate. For each number, check if its complement exists in the hash map.",
        testCases: [
          { input: "[2, 7, 11, 15], target = 9", output: "[0, 1] (2 + 7 = 9)" },
          { input: "[3, 2, 4], target = 6", output: "[1, 2] (2 + 4 = 6)" }
        ],
        difficulty: "medium",
        category: "algorithms",
        xpReward: 50
      });
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please provide an answer first!'
      });
      return;
    }

    // Award XP for attempting the puzzle
    addXp(puzzle.xpReward);
    setShowSolution(true);
    setFeedback({
      type: 'success',
      message: 'Great attempt! Check out the solution below.'
    });
  };

  if (loading) {
    return (
      <div className="puzzle-container" style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        border: '2px solid #0ff',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#0ff' }}>🧩 Generating Your Puzzle...</h2>
          <p>The AI is crafting a challenging puzzle for you!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="puzzle-container" style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      border: '2px solid #0ff',
      color: '#fff'
    }}>
      <h2 style={{ color: '#0ff', marginBottom: '20px' }}>🧩 Programming Puzzle Challenge</h2>

      <div className="puzzle-info" style={{ marginBottom: '20px' }}>
        <span style={{
          background: '#0ff',
          color: '#000',
          padding: '5px 10px',
          borderRadius: '5px',
          marginRight: '10px'
        }}>
          {puzzle.difficulty.toUpperCase()}
        </span>
        <span style={{
          background: '#0ff',
          color: '#000',
          padding: '5px 10px',
          borderRadius: '5px'
        }}>
          {puzzle.category}
        </span>
      </div>

      <div className="puzzle-question" style={{ marginBottom: '20px' }}>
        <h3>Challenge:</h3>
        <p>{puzzle.question}</p>
      </div>

      <div className="test-cases" style={{ marginBottom: '20px' }}>
        <h3>Test Cases:</h3>
        {puzzle.testCases.map((testCase, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>Input:</strong> {testCase.input}
            <br />
            <strong>Expected Output:</strong> {testCase.output}
          </div>
        ))}
      </div>

      <div className="hints" style={{ marginBottom: '20px' }}>
        <h3>Hints:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {puzzle.hints.map((hint, index) => (
            <button
              key={index}
              onClick={() => alert(hint)}
              style={{
                background: 'transparent',
                border: '1px solid #0ff',
                color: '#0ff',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Hint #{index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="answer-section" style={{ marginBottom: '20px' }}>
        <h3>Your Solution:</h3>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Write your solution here..."
          style={{
            width: '100%',
            minHeight: '150px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid #0ff',
            borderRadius: '5px',
            padding: '10px',
            color: '#fff',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: '#0ff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Submit Solution
        </button>
      </div>

      {feedback && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          background: feedback.type === 'error' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
          borderRadius: '5px'
        }}>
          {feedback.message}
        </div>
      )}

      {showSolution && (
        <div className="solution" style={{
          padding: '20px',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: '5px'
        }}>
          <h3>Solution Explanation:</h3>
          <p>{puzzle.solution}</p>
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={generatePuzzle}
          style={{
            background: 'transparent',
            border: '2px solid #0ff',
            color: '#0ff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Another Puzzle
        </button>
      </div>
    </div>
  );
}