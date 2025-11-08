import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NPCTeacher from './NPCTeacher';
import QuestCard from './QuestCard';
import FeedbackModal from './FeedbackModal';
import StreakCard from './StreakCard';
import Leaderboard from './Leaderboard';
import { getXp } from '../utils/xp';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lastCompleted, setLastCompleted] = useState(null);
  const [xp, setXp] = useState(() => {
    const stored = getXp();
    return stored || 420;
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function onXpUpdated(e) {
      const newXp = (e && e.detail && typeof e.detail.xp === 'number') ? e.detail.xp : getXp();
      setXp(newXp);
    }
    function onXpCompleted(e) {
      const last = e && e.detail && e.detail.lastCompleted;
      if (last) {
        setLastCompleted(last);
        setOpen(true);
        setTimeout(() => setOpen(false), 2600);
      }
    }
    window.addEventListener('xpUpdated', onXpUpdated);
    window.addEventListener('xpCompleted', onXpCompleted);
    return () => {
      window.removeEventListener('xpUpdated', onXpUpdated);
      window.removeEventListener('xpCompleted', onXpCompleted);
    };
  }, []);

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
            <div className="neon-card" onClick={() => navigate('/teacher-types')} style={{ cursor: 'pointer' }}>
              <strong>AI NPC Teacher Types</strong>
              <p className="small-muted">Mentors, Story Guides, Code Coaches — each with cute reactions and tailored lessons.</p>
            </div>
            <div className="neon-card" onClick={() => navigate('/mentorship')} style={{ cursor: 'pointer' }}>
              <strong>1v1 Mentorship</strong>
              <p className="small-muted">Get guidance from two mentors at once.</p>
            </div>
            <div className="neon-card" onClick={() => navigate('/live-quiz')} style={{ cursor: 'pointer' }}>
              <strong>Live Quiz Game</strong>
              <p className="small-muted">Participate in a live quiz contest and see your name on the leaderboard.</p>
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
          <h3>Why this works</h3>
          <ul>
            <li>Short missions, dopamine hits</li>
            <li>Personalized — no boring repeating lessons</li>
            <li>Cute AI teachers feel like friends</li>
            <li>Instant progress visualization</li>
          </ul>
        </div>

        <Leaderboard currentUser={currentUser} />
      </div>

      <aside className="right-panel">
        <StreakCard />

        <div className="neon-card">
          <h4>Progress</h4>
          <div style={{ height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ width: '42%', height: 10, background: 'linear-gradient(90deg,var(--neon-1),var(--neon-2))' }} />
          </div>
          <div style={{ marginTop: 8 }} className="small-muted">Short missions completed: 3 • XP: {xp}</div>
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
