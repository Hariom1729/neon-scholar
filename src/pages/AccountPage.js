import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import './AccountPage.css';

// Import Avatars
import avatarStudent1 from './avatars/Student1.png';
import avatarStudent2 from './avatars/Student2.png';
import avatarKid1 from './avatars/kid1.png';
import avatarKid2 from './avatars/kid2.png';

const avatars = [avatarStudent1, avatarStudent2, avatarKid1, avatarKid2];
const timezones = ['GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-09:00', 'GMT-08:00', 'GMT-07:00', 'GMT-06:00', 'GMT-05:00', 'GMT-04:00', 'GMT-03:00', 'GMT-02:00', 'GMT-01:00', 'GMT+00:00', 'GMT+01:00', 'GMT+02:00', 'GMT+03:00', 'GMT+04:00', 'GMT+05:00', 'GMT+06:00', 'GMT+07:00', 'GMT+08:00', 'GMT+09:00', 'GMT+10:00', 'GMT+11:00', 'GMT+12:00'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan'];

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // User Profile State
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const [photoURL, setPhotoURL] = useState(avatars[0]);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Set initial state from currentUser or mock data
        setDisplayName(currentUser.displayName || 'codingMaster');
        setPhotoURL(currentUser.photoURL || avatars[0]);
        setEmail(currentUser.email || 'coder@example.com');
        
        // Mock data for other fields
        setFullName('Alex Doe');
        setBio('Software developer passionate about creating amazing web experiences.');
        setPhoneNumber('+1 234 567 890');
        setDateOfBirth('1990-01-01');
        setGender('Male');
        setCountry('United States');
        setTimezone('GMT-05:00');

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

  const handleCancelEdit = () => {
    setIsEditing(false);
    // In a real app, you'd reset state to original values here
  };

  const handleDeleteAccount = () => {
      deleteUser(user).then(() => {
          navigate('/');
      }).catch((error) => {
          console.error("Error deleting account: ", error);
          // Handle errors, e.g., re-authentication required
      });
  };

  const renderUserDetails = () => (
    <div className="profile-section">
        <img src={photoURL} alt="Profile" className="profile-avatar" />
        <div className="profile-info">
            <h2>{fullName}</h2>
            <p>@{displayName}</p>
            <p>{bio}</p>
        </div>
    </div>
  );

  const renderEditForm = () => (
    <div className="edit-layout">
        <div className="section-title">Choose Your Character</div>
        <div className="avatar-selector">
          {avatars.map((avatarUrl, index) => (
            <img 
              key={index}
              src={avatarUrl} 
              alt={`avatar ${index + 1}`} 
              className={`avatar-option ${photoURL === avatarUrl ? 'selected' : ''}`}
              onClick={() => setPhotoURL(avatarUrl)}
            />
          ))}
        </div>

        <div className="fields-grid">
            <div className="section-title">Personal Information</div>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="input" />
            </div>
            <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
            </div>
            
            <div className="input-group full-width">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="textarea" />
            </div>

            <div className="section-title">Contact & Basic Information</div>
            <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </div>
            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input" />
            </div>
            
            <div className="input-group">
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="input" />
            </div>
            <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="select">
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
            </div>
             <div className="input-group">
                <label htmlFor="country">Country</label>
                <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="select">
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="select">
                    {timezones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
        </div>
    </div>
  );

  const renderDeleteModal = () => (
      <div className="modal-overlay">
          <div className="modal">
              <h2>Delete Account</h2>
              <p>Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
              <div className="modal-buttons">
                  <button onClick={handleDeleteAccount} className="btn danger">Confirm Delete</button>
                  <button onClick={() => setShowDeleteModal(false)} className="btn ghost">Cancel</button>
              </div>
          </div>
      </div>
  );

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="account-page">
      {showDeleteModal && renderDeleteModal()}

      <h1 className="account-header">Account Settings</h1>
      
      {isEditing ? renderEditForm() : renderUserDetails()}

      <div className="button-group">
        {isEditing ? (
            <>
                <button onClick={handleUpdateProfile} className="btn primary">Save Changes</button>
                <button onClick={handleCancelEdit} className="btn ghost">Cancel</button>
            </>
        ) : (
            <button onClick={() => setIsEditing(true)} className="btn primary">Edit Profile</button>
        )}
      </div>

      <div className="danger-zone">
        <div className="section-title">Danger Zone</div>
        <div className="danger-zone-content">
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button onClick={() => setShowDeleteModal(true)} className="btn danger">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
