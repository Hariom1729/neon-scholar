import React, { useState, useEffect } from 'react';

const INITIAL_VISIBLE_USERS = 5;

export default function Leaderboard({ currentUser }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [quizLeaderboardData, setQuizLeaderboardData] = useState([]);
  const [showQuizLeaderboard, setShowQuizLeaderboard] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(INITIAL_VISIBLE_USERS);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const users = await response.json();
        setLeaderboardData(users);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchUsers();
    // The original query was: query(collection(db, "users"), orderBy("xp", "desc"), orderBy("createdAt", "asc"))
    // This composite query requires a special index in Firestore.
    // We are simplifying it to a single orderBy to avoid the error.
    const q = query(collection(db, "users"), orderBy("xp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setLeaderboardData(users);
    }, (error) => {
      console.error("Error fetching leaderboard data: ", error);
    });

    const quizQuery = query(collection(db, "quizScores"), orderBy("score", "desc"));
    const quizUnsubscribe = onSnapshot(quizQuery, (querySnapshot) => {
      const quizUsers = [];
      querySnapshot.forEach((doc) => {
        quizUsers.push({ id: doc.id, ...doc.data() });
      });
      setQuizLeaderboardData(quizUsers);
    }, (error) => {
      console.error("Error fetching quiz leaderboard data: ", error);
    });

    return () => {
      unsubscribe();
      quizUnsubscribe();
    };
  }, []);

  useEffect(() => {
    setVisibleUsers(INITIAL_VISIBLE_USERS);
  }, [showQuizLeaderboard]);

  const showAllUsers = () => {
    const dataLength = showQuizLeaderboard ? quizLeaderboardData.length : leaderboardData.length;
    setVisibleUsers(dataLength);
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
  const dataToDisplay = showQuizLeaderboard ? quizLeaderboardData : leaderboardData;

  return (
    <div className="neon-card glow">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h4 style={{ margin: 0 }}>{showQuizLeaderboard ? 'Live Quiz Leaderboard' : 'Live Leaderboard'}</h4>
        <button className="btn ghost" onClick={() => setShowQuizLeaderboard(!showQuizLeaderboard)}>
          {showQuizLeaderboard ? 'Show XP Leaderboard' : 'Show Quiz Leaderboard'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dataToDisplay.slice(0, visibleUsers).map((user, index) => (
          <div
            key={user._id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: user._id === currentUserId ? 
                'linear-gradient(90deg, rgba(155,89,255,0.1), rgba(255,110,199,0.05))' :
                'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: user._id === currentUserId ? 
                '1px solid rgba(155,89,255,0.2)' :
                '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              width: '24px',
              fontWeight: 'bold',
              ...getRankStyle(index)
            }}>
              {getPositionEmoji(index) || `#${index + 1}`}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{user.name}</div>
              <div className="small-muted">🔥 {user.streak || 0} day streak</div>
              {!showQuizLeaderboard && <div className="small-muted">🔥 {user.streak} day streak</div>}
            </div>

            <div style={{
              fontWeight: '600',
              color: 'var(--neon-2)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '12px' }}>{showQuizLeaderboard ? 'Score' : 'XP'}</span>
              {showQuizLeaderboard ? user.score : user.xp}
            </div>
          </div>
        ))}
      </div>

      {dataToDisplay.length > visibleUsers && (
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
