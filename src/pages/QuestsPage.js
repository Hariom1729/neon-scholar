import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AchievementsFooter from '../components/AchievementsFooter';
import Leaderboard from '../components/Leaderboard';
import './QuestsPage.css';

export default function QuestsPage() {
  const navigate = useNavigate();

  const handleQuestClick = (quest) => {
    console.log('Quest clicked:', quest);
    if (quest.type === 'puzzle') {
      navigate('/puzzle');
    } else if (quest.type === 'project') {
      navigate('/micro-project');
    } else {
      navigate(`/quiz?type=${quest.type}${quest.duration ? `&duration=${quest.duration}` : ''}`);
    }
  };

  const quests = [
    {
      title: "Mini Puzzle — 5 mins",
      description: "Solve programming puzzles to unlock a badge",
      type: "puzzle",
      icon: "🧩",
      duration: 5
    },
    {
      title: "Micro Project — 12 mins",
      description: "Create a tiny app using templates",
      type: "project",
      icon: "🛠️",
      duration: 12
    },
    {
      title: "Flash Learning — 3 mins",
      description: "Quick Q&A for dopamine hits",
      type: "flash",
      icon: "⚡",
      duration: 3
    },
    {
      title: "Game Quests",
      description: "Play a quiz and earn XP to climb the leaderboard",
      type: "game",
      icon: "🎮",
      route: "/quiz?type=game"
    }
  ];

  return (
    <div>
      <Dashboard />
      <div style={{ padding: '20px' }}>
          <div className="quests-grid">
          {quests.map((quest, index) => (
            <div key={index} className="neon-card quest-card" onClick={() => handleQuestClick(quest)}>
              <div className="quest-header">
                <span className="quest-icon">{quest.icon}</span>
                <h3>{quest.title}</h3>
              </div>
              <p>{quest.description}</p>
            </div>
          ))} 
        </div>
        <div style={{ marginTop: 24 }}>
          <Leaderboard />
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <AchievementsFooter />
      </div>
    </div>
  );
}
