
import React from 'react';
import './MicroProjectPage.css';

export default function MicroProjectPage() {
  return (
    <div className="micro-project-page">
      <h1>Math and Science Questions</h1>
      <div className="question-card">
        <h2>Question 1: Math</h2>
        <p>What is 2 + 2?</p>
        <input type="text" placeholder="Your answer..." />
      </div>
      <div className="question-card">
        <h2>Question 2: Science</h2>
        <p>What is the chemical symbol for water?</p>
        <input type="text" placeholder="Your answer..." />
      </div>
      <button>Submit Answers</button>
    </div>
  );
}
