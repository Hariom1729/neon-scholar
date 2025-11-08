import React from 'react';
import './MentorshipPage.css';

export default function MentorshipPage() {
  return (
    <div className="mentorship-page">
      <div className="student-section">
        <h2>Student</h2>
        {/* Student-specific content goes here */}
      </div>
      <div className="teacher-section">
        <h2>Teacher</h2>
        {/* Teacher-specific content goes here */}
      </div>
    </div>
  );
}
