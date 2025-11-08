import React, { useState } from 'react';
import { addXp as addXpLocal } from '../utils/xp';

export default function StudentResponse({ teacher, topic, xp = 10, onSubmitted }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const resp = {
      teacher,
      topic,
      text,
      rating,
      xp,
      timestamp: Date.now()
    };
    try {
      // store response
      const existing = JSON.parse(localStorage.getItem('studentResponses') || '[]');
      existing.push(resp);
      localStorage.setItem('studentResponses', JSON.stringify(existing));

      // award xp and notify app
      addXpLocal(xp);
      // notify which topic was completed so UI (Dashboard) can show celebration
      try {
        window.dispatchEvent(new CustomEvent('xpCompleted', { detail: { lastCompleted: `${teacher}: ${topic}` } }));
      } catch (e) {
        // ignore
      }
      setStatus({ type: 'success', message: `Thanks! You earned ${xp} XP.` });
      setText('');
      setRating(5);
      if (typeof onSubmitted === 'function') onSubmitted(resp);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Unable to save response.' });
    }
    setTimeout(() => setStatus(null), 2200);
  }

  return (
    <div style={{ marginTop: 12 }} className="neon-card">
      <h4>Reflect on this lesson</h4>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you learn? Any questions?" rows={3} style={{ width: '100%', marginBottom: 8 }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <label style={{ marginRight: 8 }}>Understanding:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={1}>1 - Not clear</option>
            <option value={2}>2</option>
            <option value={3}>3 - Somewhat</option>
            <option value={4}>4</option>
            <option value={5}>5 - Clear</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn primary" type="submit">Submit Response & Earn XP</button>
          <button className="btn ghost" type="button" onClick={() => { setText(''); setRating(5); }}>Clear</button>
        </div>
      </form>
      {status && <div style={{ marginTop: 8 }} className={status.type === 'success' ? 'small-muted' : 'error-text'}>{status.message}</div>}
    </div>
  );
}
