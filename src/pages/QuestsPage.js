import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import AchievementsFooter from '../components/AchievementsFooter';
import QuizGame from '../components/QuizGame';
import Leaderboard from '../components/Leaderboard';

export default function QuestsPage() {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: '1', name: 'Alex', xp: 420, streak: 7, avatar: '👨‍🎓' },
    { id: '2', name: 'Maria', xp: 385, streak: 5, avatar: '👩‍🎓' },
    { id: '3', name: 'James', xp: 350, streak: 4, avatar: '👨‍🎓' },
    { id: '4', name: 'Sarah', xp: 325, streak: 3, avatar: '👩‍🎓' },
    { id: '5', name: 'Mike', xp: 310, streak: 2, avatar: '👨‍🎓' }
  ]);

  const handleGameComplete = (score) => {
    const newLeaderboardData = leaderboardData.map(user => {
      if (user.id === '1') { // Assuming the current user is Alex
        return { ...user, xp: user.xp + score };
      }
      return user;
    });
    setLeaderboardData(newLeaderboardData.sort((a, b) => b.xp - a.xp));
  };

  return (
    <div>
      <Dashboard />
      <div style={{ padding: '20px' }}>
        <QuizGame onGameComplete={handleGameComplete} />
        <div style={{ marginTop: 24 }}>
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <AchievementsFooter />
      </div>
    </div>
  );
}
