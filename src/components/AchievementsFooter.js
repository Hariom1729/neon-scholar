import React from 'react';

export default function AchievementsFooter({ compact = false }) {
  const achievements = [
    { icon: '🏆', name: 'Great Start', desc: '30-day streak achieved', progress: 100 },
    { icon: '🌟', name: 'Fast Learner', desc: 'Completed 50 quests', progress: 75 },
    { icon: '🎯', name: 'Growth Hero', desc: 'Perfect score streak', progress: 60 },
    { icon: '🚀', name: 'Learning Explorer', desc: 'Finish 5 quests in a day', progress: 40 },
    { icon: '🎨', name: 'Newbie', desc: 'Create 10 projects', progress: 25 }
  ];

  // Compact variant uses a smaller footprint for analytics view
  if (compact) {
    return (
      <div style={{ padding: '12px 0', marginTop: '24px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {achievements.slice(0, 3).map(a => (
              <div key={a.name} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(155,89,255,0.08), rgba(126,255,245,0.03))' }}>{a.icon}</div>
                <div style={{ minWidth: 120 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{a.name}</div>
                  <div className="small-muted" style={{ fontSize: 12 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800 }}>Achievements</div>
            <div className="small-muted">Keep learning to unlock more</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      borderTop: '1px solid rgba(15, 23, 42, 0.8)',
      background: 'rgba(103, 3, 149, 0.12)',
      backdropFilter: 'blur(12px)',
      padding: '24px',
      marginTop: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{
          marginTop: 0,
          background: 'linear-gradient(135deg, var(--neon-1), var(--neon-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Recent Achievements
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          {achievements.map((achievement, index) => (
            <div
              key={achievement.name}
              className="neon-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  fontSize: '28px',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(155,89,255,0.08), rgba(255,110,199,0.04))',
                  borderRadius: '10px'
                }}>
                  {achievement.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '700' }}>{achievement.name}</div>
                  <div className="small-muted">{achievement.desc}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${achievement.progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--neon-1), var(--neon-2))',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div className="small-muted" style={{ textAlign: 'right' }}>
                {achievement.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}