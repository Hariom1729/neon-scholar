import React from 'react';
import StreakCard from '../components/StreakCard';
import ProgressOverview from '../components/ProgressOverview';
import AchievementsFooter from '../components/AchievementsFooter';
import Leaderboard from '../components/Leaderboard';

export default function AnalyticsPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ProgressOverview xp={520} completed={18} />
          <div className="neon-card">
            <h3>Streak & Habits</h3>
            <p className="small-muted">Your daily learning habit and visual calendar are shown here.</p>
            <div style={{ marginTop: 12 }}>
              <StreakCard />
            </div>
          </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Leaderboard />
        </aside>
      </div>

      {/* Compact Achievements footer for analytics page */}
      <div style={{ marginTop: 24 }}>
        <AchievementsFooter compact={true} />
      </div>
    </div>
  );
}
