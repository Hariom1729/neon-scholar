import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NPCTeacher from './NPCTeacher';
import QuestCard from './QuestCard';
import FeedbackModal from './FeedbackModal';
import StreakCard from './StreakCard';
import Leaderboard from './Leaderboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lastCompleted, setLastCompleted] = useState(null);

  function completeQuest(q) {
    setLastCompleted(q.title);
    setOpen(true);
    setTimeout(() => setOpen(false), 2600);
  }

  const teachers = [
    { name: 'Milo', role: 'Math Mentor', emoji: '🧠' },
    { name: 'Ava', role: 'Story Guide', emoji: '🪄' },
    { name: 'Neo', role: 'Code Coach', emoji: '🤖' },
    { name: 'Zoe', role: 'Design Mentor', emoji: '🎨' }
  ];

  const quests = [
    { title: 'Mini Puzzle — 5 mins', desc: 'Solve the neon sudoku to unlock a badge.' },
    { title: 'Micro Project — 12 mins', desc: 'Create a tiny app using templates.' },
    { title: 'Flash Learning — 3 mins', desc: 'Quick Q&A for dopamine hits.' }
  ];

  return (
    <div className="dashboard">
      <div className="header-row">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>

          <div className="feature-pill" style={{ cursor: 'pointer' }} onClick={() => navigate('/teacher-interaction')}>
            ✔ Cute AI teachers
          </div>
        </div>
      </div>

      <div className="left-panel">
        <div className="neon-card glow">
          <h3>Core Idea</h3>
          <p className="small-muted">Embed learning into a story where AI NPCs create personalized quests, adapt difficulty, and give instant feedback.</p>
          <div style={{ marginTop: 12 }} className="grid-cards">
            <div className="neon-card">
              <strong>AI NPC Teacher Types</strong>
              <p className="small-muted">Mentors, Story Guides, Code Coaches — each with cute reactions and tailored lessons.</p>
            </div>
            <div className="neon-card">
              <strong>1v2 Mentorship</strong>
              <p className="small-muted">Get guidance from two mentors at once.</p>
            </div>
            <div className="neon-card">
              <strong>Quest System</strong>
              <p className="small-muted">Short missions, rewards, branching story progress.</p>
            </div>
            <div className="neon-card">
              <strong>Instant Feedback</strong>
              <p className="small-muted">Feedback with XP, sparkles, and emojis.</p>
            </div>
            <div className="neon-card">
              <strong>Emotional Gamification</strong>
              <p className="small-muted">Teachers empathize, celebrate wins, and adapt rewards.</p>
            </div>
          </div>
        </div>

        <div className="neon-card">
          <h3>Quests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {quests.map((q, i) => (
              <QuestCard key={i} title={q.title} desc={q.desc} onComplete={() => completeQuest(q)} />
            ))}
            <div onClick={() => navigate('/quests')} style={{ cursor: 'pointer' }}>
              <QuestCard title="Game Quests" desc="Play a quiz and earn XP to climb the leaderboard." onComplete={() => {}} />
            </div>
          </div>
        </div>

        <div className="neon-card">
          <h3>Why this works</h3>
          <ul>
            <li>Short missions, dopamine hits</li>
            <li>Personalized — no boring repeating lessons</li>
            <li>Cute AI teachers feel like friends</li>
            <li>Instant progress visualization</li>
          </ul>
        </div>

        <Leaderboard />
      </div>

      <aside className="right-panel">
        <StreakCard />

        <div className="neon-card glow">
          <h4>AI NPCs</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {teachers.map((t, idx) => (
              <NPCTeacher key={idx} name={t.name} role={t.role} emoji={t.emoji} />
            ))}
          </div>
        </div>

        <div className="neon-card">
          <h4>Progress</h4>
          <div style={{ height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ width: '42%', height: 10, background: 'linear-gradient(90deg,var(--neon-1),var(--neon-2))' }} />
          </div>
          <div style={{ marginTop: 8 }} className="small-muted">Short missions completed: 3 • XP: 420</div>
        </div>

        <div className="neon-card">
          <h4>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn primary" onClick={() => alert('Start story mode 🎭')}>Start Story Mode</button>
            <button className="btn ghost" onClick={() => alert('Open settings ⚙️')}>Settings</button>
          </div>
        </div>
      </aside>

      <FeedbackModal open={open} onClose={() => setOpen(false)} title={lastCompleted ? `Completed: ${lastCompleted}` : 'Nice job!'} message={'You earned XP and a little celebration ✨'} />
    </div>
  );
}
