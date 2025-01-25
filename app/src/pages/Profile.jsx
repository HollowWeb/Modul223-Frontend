/**
 * Profile component for managing user account information.
 * Allows users to view and update their username, email, and password.
 */
import React, { useState } from 'react';

function Profile() {
  // Placeholder states for user information
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   /**
   * Handles saving profile changes.
   * Placeholder logic to demonstrate saving action.
   */
  const handleSave = () => {
    // Placeholder logic for saving profile changes
    alert('Profile changes saved!');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Manage your account information here.</p>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
