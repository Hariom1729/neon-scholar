import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/ui.css';
import Dashboard from './components/Dashboard';
import TeacherInteraction from './components/TeacherInteraction';
import QuestsPage from './pages/QuestsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TitleBar from './components/TitleBar';
import AchievementsFooter from './components/AchievementsFooter';

function App() {
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
