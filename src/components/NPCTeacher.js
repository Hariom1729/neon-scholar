import React from 'react';

export default function NPCTeacher({ name = 'Milo', role = 'AI Mentor', emoji = '🤖' }) {
  return (
    <div className="neon-card npc-card">
      <div className="npc-avatar float" aria-hidden>
        <span style={{ fontSize: '44px' }}>{emoji}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="npc-name">{name}</div>
        <div className="npc-role">{role} • Cute companion</div>
      </div>
    </div>
  );
}
