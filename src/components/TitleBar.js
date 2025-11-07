import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TitleBar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: '🏠', path: '/' },
    { label: 'Quests', icon: '⚡', path: '/quests' },
    { label: 'Analytics', icon: '📊', path: '/analytics' },
    { label: 'Account', icon: '👤', path: '/account' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(15,23,42,0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '24px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--neon-1), var(--neon-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }} onClick={() => navigate('/')}>
          <span style={{ fontSize: '28px' }}>⚡</span>
          ZappLearn
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="btn ghost"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px'
              }}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}