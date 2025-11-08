import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Simplified auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="App neon-bg">
        <TitleBar />
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Dashboard currentUser={currentUser} />} />
            <Route path="/teacher-interaction" element={<TeacherInteraction />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/account" element={<AccountPage currentUser={currentUser} />} />
            <Route path="/teacher-types" element={<TeacherTypesPage />} />
            <Route path="/math-mentor" element={<MathMentorPage />} />
            <Route path="/story-guide" element={<StoryGuidePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/puzzle" element={<PuzzlePage />} />
            <Route path="/code-coach" element={<CodeCoachPage />} />
            <Route path="/design-mentor" element={<DesignMentorPage />} />
            <Route path="/micro-project" element={<MicroProjectPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
