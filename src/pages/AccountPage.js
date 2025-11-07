import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('This is a bio.');
  const [location, setLocation] = useState('Somewhere on Earth');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
      } else {
        setUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (user) {
      updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL
      }).then(() => {
        setIsEditing(false);
      }).catch((error) => {
        console.error("Error updating profile: ", error);
      });
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        setBio('This is a bio.');
        setLocation('Somewhere on Earth');
    }
  }

  if (!user) {
    return (
      <div style={{ padding: '20px', color: 'white' }}>
        <h1>Account</h1>
        <p>Please log in to see your account details.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'white', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{textAlign: 'center', marginBottom: '40px'}}>Account Details</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <img src={photoURL} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        <div>
            {isEditing ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="input"
                        placeholder="Display Name"
                        style={{fontSize: '20px'}}
                    />
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="input"
                        placeholder="Photo URL"
                    />
                    <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="input"
                        placeholder="Bio"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input"
                        placeholder="Location"
                    />
                </div>
            ) : (
                <div>
                    <h2>{displayName}</h2>
                    <p style={{color: 'rgba(255,255,255,0.8)', fontStyle: 'italic'}}>{bio}</p>
                    <p style={{color: 'rgba(255,255,255,0.6)'}}>{location}</p>
                </div>
            )}
            <p style={{color: 'rgba(255,255,255,0.7)'}}>{user.email}</p>
        </div>
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        {isEditing ? (
            <>
                <button onClick={handleUpdateProfile} className="btn primary">Save</button>
                <button onClick={handleCancelEdit} className="btn ghost">Cancel</button>
            </>
        ) : (
            <button onClick={() => setIsEditing(true)} className="btn primary">Edit Profile</button>
        )}
        <button onClick={handleLogout} className="btn ghost">Logout</button>
      </div>
    </div>
  );
}
