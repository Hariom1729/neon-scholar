import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import './components/ui.css';
import Dashboard from './components/Dashboard';
import TeacherInteraction from './components/TeacherInteraction';
import QuestsPage from './pages/QuestsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AccountPage from './pages/AccountPage';
import TeacherTypesPage from './pages/TeacherTypesPage';
import MathMentorPage from './pages/MathMentorPage';
import StoryGuidePage from './pages/StoryGuidePage';
import CodeCoachPage from './pages/CodeCoachPage';
import DesignMentorPage from './pages/DesignMentorPage';
import QuizPage from './pages/QuizPage';
import PuzzlePage from './pages/PuzzlePage';
import MicroProjectPage from './pages/MicroProjectPage';
import TitleBar from './components/TitleBar';
import LiveQuizPage from './pages/LiveQuizPage';
import MentorshipPage from './pages/MentorshipPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          setShowNamePrompt(true);
        } else {
          setCurrentUser({ ...user, ...userDoc.data() });
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() && auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        name: username,
        xp: 0,
        streak: 0,
        avatar: auth.currentUser.photoURL || '👨‍🎓',
        createdAt: serverTimestamp()
      });
      const userDoc = await getDoc(userRef);
      setCurrentUser({ ...auth.currentUser, ...userDoc.data() });
      setShowNamePrompt(false);
    }
  };

  if (showNamePrompt) {
    return (
      <div className='centered-view'>
        <div className='neon-card'>
          <h2>Welcome!</h2>
          <p>Please enter your name to continue.</p>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              className='neon-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
            />
            <button type="submit" className='neon-button'>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App neon-bg">
        <TitleBar />
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teacher-interaction" element={<TeacherInteraction />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/teacher-types" element={<TeacherTypesPage />} />
            <Route path="/math-mentor" element={<MathMentorPage />} />
            <Route path="/story-guide" element={<StoryGuidePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/puzzle" element={<PuzzlePage />} />
            <Route path="/code-coach" element={<CodeCoachPage />} />
            <Route path="/design-mentor" element={<DesignMentorPage />} />
            <Route path="/micro-project" element={<MicroProjectPage />} />
            <Route path="/live-quiz" element={<LiveQuizPage />} />
            <Route path="/mentorship" element={<MentorshipPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
