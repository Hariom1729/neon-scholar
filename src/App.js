import React, { useEffect } from 'react';
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
import AccountPage from './pages/AccountPage'; // Import AccountPage
import TeacherTypesPage from './pages/TeacherTypesPage';
import MathMentorPage from './pages/MathMentorPage';
import StoryGuidePage from './pages/StoryGuidePage';
import CodeCoachPage from './pages/CodeCoachPage';
import DesignMentorPage from './pages/DesignMentorPage';
import QuizPage from './pages/QuizPage';
import PuzzlePage from './pages/PuzzlePage';
import TitleBar from './components/TitleBar';
import AchievementsFooter from './components/AchievementsFooter';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          // Add new user to Firestore
          setDoc(userRef, {
            name: currentUser.displayName || 'New User',
            xp: 0,
            streak: 0,
            avatar: currentUser.photoURL || '👨‍🎓',
            createdAt: serverTimestamp()
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
            <Route path="/account" element={<AccountPage />} /> {/* Add account route */}
            <Route path="/teacher-types" element={<TeacherTypesPage />} />
            <Route path="/math-mentor" element={<MathMentorPage />} />
            <Route path="/story-guide" element={<StoryGuidePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/puzzle" element={<PuzzlePage />} />
            <Route path="/code-coach" element={<CodeCoachPage />} />
            <Route path="/design-mentor" element={<DesignMentorPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;