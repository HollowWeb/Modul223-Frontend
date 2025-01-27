/**
 * Profile component for managing user account information.
 * Allows users to view and update their username, email, and password.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profileStyle.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user details. Status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
        setUpdatedDetails(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleUpdateDetails = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("http://localhost:8080/api/users/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user details. Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
      alert("Profile updated successfully.");
    } catch (err) {
      alert("Error updating profile. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const token = localStorage.getItem("jwtToken");
  
      const response = await fetch(`http://localhost:8080/api/users/${user.id}/change-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          oldPassword, 
          newPassword 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to change password. Status: ${response.status}`);
      }
  
      alert("Password changed successfully.");
      setOldPassword(""); // Reset the old password input
      setNewPassword(""); // Reset the new password input
      setConfirmPassword(""); // Reset the confirm password input
    } catch (err) {
      alert("Error changing password. Please try again.");
    }
  };

  if (loading) {
    return <div className={`profile-container ${theme}`}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={`profile-container ${theme}`}>
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`profile-container ${theme}`}>
      <h1 className="profile-title">My Profile</h1>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-field">
          <label>Username</label>
          {editing ? (
            <input
              type="text"
              value={updatedDetails.username || ""}
              onChange={(e) =>
                setUpdatedDetails({ ...updatedDetails, username: e.target.value })
              }
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          {editing ? (
            <input
              type="email"
              value={updatedDetails.email || ""}
              onChange={(e) =>
                setUpdatedDetails({ ...updatedDetails, email: e.target.value })
              }
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="profile-actions">
        {editing ? (
          <>
            <button className="btn-save" onClick={handleUpdateDetails}>
              Save Changes
            </button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn-edit" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {/* Password Change */}
      <div className="password-change-dropdown">
  <button
    className="btn-toggle-password"
    onClick={() => setShowPasswordChange((prev) => !prev)}
  >
    <span>Change Password</span>
    <span className="arrow-icon">{showPasswordChange ? "▲" : "▼"}</span>
  </button>

  {showPasswordChange && (
    <div className="password-change">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn-change-password" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  )}
</div>
    </div>
  );
};

export default Profile;
