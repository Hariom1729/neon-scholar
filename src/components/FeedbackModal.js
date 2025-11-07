import React from 'react';
import Confetti from './Confetti';

export default function FeedbackModal({ open, onClose, title = 'Nice job!', message = 'You finished the quest' }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-card neon-card glow">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 44 }}>🎉</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{title}</div>
            <div className="small-muted">{message}</div>
          </div>
        </div>
        <div style={{ marginTop: 12 }} className="small-muted">Instant feedback • +25 XP • Mood up 😄</div>
      </div>
      <Confetti active={true} count={48} />
    </div>
  );
}
