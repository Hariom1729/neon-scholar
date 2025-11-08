import React, { useState, useEffect } from 'react';
import StreakCalendar from './StreakCalendar';

export default function StreakCard() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('learningStreak');
    return saved ? JSON.parse(saved) : {
      count: 0,
      lastLogin: null,
      dates: {} // Track all streak dates
    };
  });
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    // Only run this logic if it's a new day
    if (streak.lastLogin !== today) {
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
      const isConsecutive = streak.lastLogin === yesterday;

      const newCount = isConsecutive ? streak.count + 1 : 1;
      const newDates = { ...streak.dates, [today]: true };

      const newStreak = {
        count: newCount,
        lastLogin: today,
        dates: newDates
      };

      setStreak(newStreak);
      localStorage.setItem('learningStreak', JSON.stringify(newStreak));

      if (newCount > 0 && newCount % 5 === 0) {
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
      }
    }
  }, [streak.count, streak.dates, streak.lastLogin]); // Added dependencies

  const rewards = {
    5: '🎉 5-Day Bonus: New Theme Unlocked!',
    10: '🌟 10-Day Power: Double XP Day!',
    15: '🎨 15-Day Gift: Custom Avatar Frame!',
    20: '🏆 20-Day Achievement: Special Badge!',
    25: '💫 25-Day Reward: Rare Teacher NPC!',
    30: '👑 30-Day Crown: Learning Legend Status!'
  };

  const currentMilestone = Math.floor(streak.count / 5) * 5;
  const nextMilestone = currentMilestone + 5;
  const progressToNext = ((streak.count - currentMilestone) / 5) * 100;

  return (
    <div className="neon-card glow" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          fontSize: '32px',
          background: 'linear-gradient(135deg, var(--neon-1), var(--neon-2))',
          borderRadius: '16px',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(155,89,255,0.3)'
        }}>
          {streak.count >= 30 ? '👑' : '🔥'}
        </div>
        <div>
          <h4 style={{ margin: 0 }}>Learning Streak</h4>
          <div className="small-muted">{streak.count} days • Keep it going!</div>
        </div>
      </div>

      {/* Progress to next reward */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span className="small-muted">Current: {currentMilestone} days</span>
          <span className="small-muted">Next: {nextMilestone} days</span>
        </div>
        <div style={{
          height: '6px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressToNext}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--neon-1), var(--neon-2))',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Calendar View */}
      <div style={{ margin: '16px 0' }}>
        <StreakCalendar streakDates={streak.dates} />
      </div>

      {/* Next reward preview */}
      <div className="small-muted">
        Next reward at {nextMilestone} days:
        <div style={{
          marginTop: '4px',
          padding: '8px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          {rewards[nextMilestone] || '🎁 Mystery Reward!'}
        </div>
      </div>

      {/* Reward animation */}
      {showReward && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(155,89,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'reward-pulse 3s ease-out forwards'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255,110,199,0.8)'
          }}>
            {rewards[streak.count] || '🎁 Reward Unlocked!'}
          </div>
        </div>
      )}

      <style>{`
        @keyframes reward-pulse {
          0% { opacity: 0; transform: scale(0.8); }
          10% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
