import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const INITIAL_VISIBLE_USERS = 5;

export default function Leaderboard({ currentUser }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(INITIAL_VISIBLE_USERS);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setLeaderboardData(users);
    });

    return () => unsubscribe();
  }, []);

  const showAllUsers = () => {
    setVisibleUsers(leaderboardData.length);
  };

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

  const currentUserId = currentUser ? currentUser.uid : null;

  return (
    <div className="neon-card glow">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h4 style={{ margin: 0 }}>Live Leaderboard</h4>
        <div className="small-muted">Updates in real-time</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {leaderboardData.slice(0, visibleUsers).map((user, index) => (
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
      {leaderboardData.length > visibleUsers && (
        <button
          className="btn ghost"
          style={{ width: '100%', marginTop: '12px' }}
          onClick={showAllUsers}
        >
          View Full Rankings 🏆
        </button>
      )}
    </div>
  );
}
