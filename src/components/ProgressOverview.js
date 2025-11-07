import React from 'react';

export default function ProgressOverview({ xp = 420, completed = 12 }) {
  const percent = Math.min(100, Math.round((xp / 1000) * 100));
  const badges = [
    { name: 'Quick Learner', unlocked: true },
    { name: 'Problem Solver', unlocked: true },
    { name: 'Creative Coder', unlocked: false },
  ];

  return (
    <div className="neon-card">
      <h3>Progress Overview</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div className="small-muted">XP</div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>{xp}</div>

          <div style={{ marginTop: 12 }}>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: `${percent}%`, height: 10, background: 'linear-gradient(90deg,var(--neon-1),var(--neon-2))' }} />
            </div>
            <div className="small-muted" style={{ marginTop: 8 }}>{percent}% to next level</div>
          </div>
        </div>

        <div style={{ width: 140 }}>
          <div className="small-muted">Badges</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {badges.map((b, i) => (
              <div key={i} style={{
                padding: '6px 8px',
                borderRadius: 8,
                background: b.unlocked ? 'linear-gradient(90deg,var(--neon-1),var(--neon-2))' : 'rgba(255,255,255,0.03)',
                color: b.unlocked ? '#0b0b10' : '#dfe9ff',
                fontWeight: 700,
                fontSize: 12
              }}>{b.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }} className="small-muted">Quests completed: {completed}</div>
    </div>
  );
}
