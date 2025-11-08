import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, runTransaction } from 'firebase/firestore';

export default function QuestCard({ title, desc, onComplete, questions }) {
  const [openPuzzle, setOpenPuzzle] = useState(false);
  const [answered, setAnswered] = useState({});
  const [feedback, setFeedback] = useState(null);

  async function handleChoice(q, idx) {
    if (answered[q.id]) return; // already answered
    const correct = idx === q.answerIndex;

    if (correct) {
      setFeedback({ type: 'success', text: `Nice! +${q.xp} XP 🎉` });
      setAnswered(prev => ({ ...prev, [q.id]: true }));

      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
          await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) {
              // This case should ideally not happen if user is logged in
              // as App.js creates the user doc.
              return;
            }
            const currentXp = userDoc.data().xp || 0;
            const newXp = currentXp + q.xp;
            transaction.update(userRef, { xp: newXp });
          });
        } catch (error) {
          console.error("Failed to update XP:", error);
          // Optionally, set an error feedback state here
        }
      }

      // notify parent quest completion for reward UI
      if (typeof onComplete === 'function') {
        onComplete({ title });
      }
    } else {
      setFeedback({ type: 'error', text: 'Not quite — try again.' });
    }
    // clear feedback after a short delay
    setTimeout(() => setFeedback(null), 1800);
  }

  return (
    <div className="neon-card quest">
      <h4>{title}</h4>
      <p>{desc}</p>

      {questions && questions.length > 0 ? (
        <div className="puzzle-area">
          {!openPuzzle ? (
            <div className="actions">
              <button className="btn primary" onClick={() => setOpenPuzzle(true)}>Start Puzzle 🧩</button>
              <button className="btn ghost" onClick={() => setOpenPuzzle(false)}>Later ⏳</button>
            </div>
          ) : (
            <div>
              {questions.map(q => (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600 }}>{q.prompt}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    {q.choices.map((c, i) => (
                      <button key={i} className={`btn ${answered[q.id] ? 'ghost' : 'primary'}`} onClick={() => handleChoice(q, i)} disabled={!!answered[q.id]}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn ghost" onClick={() => setOpenPuzzle(false)}>Close</button>
              </div>
            </div>
          )}
          {feedback && (
            <div style={{ marginTop: 8 }} className={feedback.type === 'success' ? 'small-muted' : 'error-text'}>{feedback.text}</div>
          )}
        </div>
      ) : (
        <div className="actions">
          <button className="btn primary" onClick={onComplete}>Complete ✅</button>
          <button className="btn ghost">Later ⏳</button>
        </div>
      )}
    </div>
  );
}
