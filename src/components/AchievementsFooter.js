import React from 'react';

export default function AchievementsFooter() {
  const achievements = [
    { icon: '🏆', name: 'Great Start', desc: '30-day streak achieved', progress: 100 },
    { icon: '🌟', name: 'Fast Learner', desc: 'Completed 50 quests', progress: 75 },
    { icon: '🎯', name: 'Growth Hero', desc: 'Perfect score streak', progress: 60 },
    { icon: '🚀', name: 'Learning Explorer', desc: 'Finish 5 quests in a day', progress: 40 },
    { icon: '🎨', name: 'Newbie', desc: 'Create 10 projects', progress: 25 }
  ];

  return (
    <div style={{
      borderTop: '1px solid rgba(15, 23, 42, 0.8)',
      background: 'rgba(103, 3, 149, 0.24)',
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
                  fontSize: '32px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(155,89,255,0.1), rgba(255,110,199,0.05))',
                  borderRadius: '12px'
                }}>
                  {achievement.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>{achievement.name}</div>
                  <div className="small-muted">{achievement.desc}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '2px',
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