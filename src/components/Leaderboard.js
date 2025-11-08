import React from 'react';

export default function Leaderboard({ leaderboardData = [], currentUserId = '1' }) {

  const getRankStyle = (index) => {
    switch (index) {
      case 0: return { color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }; // Gold
      case 1: return { color: '#C0C0C0', textShadow: '0 0 10px rgba(192, 192, 192, 0.5)' }; // Silver
      case 2: return { color: '#CD7F32', textShadow: '0 0 10px rgba(205, 127, 50, 0.5)' }; // Bronze
      default: return { color: '#fff' };
    }
  };

  const getPositionEmoji = (index) => {
    switch (index) {
      case 0: return '👑';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="neon-card glow">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h4 style={{ margin: 0 }}>Live Leaderboard</h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {leaderboardData.map((user, index) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: user.id === currentUserId ?
                'linear-gradient(90deg, rgba(155,89,255,0.1), rgba(255,110,199,0.05))' :
                'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: user.id === currentUserId ?
                '1px solid rgba(155,89,255,0.2)' :
                '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Rank */}
            <div style={{
              width: '24px',
              fontWeight: 'bold',
              ...getRankStyle(index)
            }}>
              {getPositionEmoji(index) || `#${index + 1}`}
            </div>

            {/* Avatar */}
            <div style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--neon-1), var(--neon-2))',
              borderRadius: '8px',
              fontSize: '20px'
            }}>
              {user.avatar}
            </div>

            {/* Name and streak */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{user.name}</div>
              <div className="small-muted">🔥 {user.streak} day streak</div>
            </div>

            {/* XP */}
            <div style={{
              fontWeight: '600',
              color: 'var(--neon-2)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '12px' }}>XP</span>
              {user.xp}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button
        className="btn ghost"
        style={{ width: '100%', marginTop: '12px' }}
        onClick={() => alert('Full leaderboard coming soon!')}
      >
        View Full Rankings 🏆
      </button>
    </div>
  );
}
