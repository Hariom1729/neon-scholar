import React from 'react';
import Dashboard from '../components/Dashboard';
import AchievementsFooter from '../components/AchievementsFooter';

export default function QuestsPage() {
  return (
    <div>
      <Dashboard />
      <div style={{ marginTop: 24 }}>
        <AchievementsFooter />
      </div>
    </div>
  );
}
