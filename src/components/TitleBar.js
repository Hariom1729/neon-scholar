import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default function TitleBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error during sign-in:", error);
    });
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error during sign-out:", error);
    });
  };

  const menuItems = [
    { label: 'Home', icon: '🏠', path: '/' },
    { label: 'Quests', icon: '⚡', path: '/quests' },
    { label: 'Analytics', icon: '📊', path: '/analytics' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
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
        {/* Logo with favicon */}
        <div style={{
          fontSize: '24px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--neon-1), var(--neon-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }} onClick={() => navigate('/')}>
          <img
            src="/fevicon.png"
            alt="ZappLearn"
            style={{ width: 36, height: 36, borderRadius: 8, boxShadow: '0 6px 18px rgba(155,89,255,0.18)' }}
          />
          <span style={{ display: 'inline-block', lineHeight: 1 }}>{'ZappLearn'}</span>
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
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                className="btn ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px'
                }}
                onClick={() => navigate('/account')}
              >
                <img src={user.photoURL} alt="User" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                <span>Account</span>
              </button>
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '8px',
                display: 'none'
              }}>
                <button
                  className="btn ghost"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    width: '100%'
                  }}
                  onClick={handleLogout}
                >
                  <span>🔒</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn ghost"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px'
              }}
              onClick={handleLogin}
            >
              <span>👤</span>
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
