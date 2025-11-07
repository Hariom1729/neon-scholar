import React from 'react';

export default function QuestCard({ title, desc, onComplete }) {
  return (
    <div className="neon-card quest">
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="actions">
        <button className="btn primary" onClick={onComplete}>Complete ✅</button>
        <button className="btn ghost">Later ⏳</button>
      </div>
    </div>
  );
}
