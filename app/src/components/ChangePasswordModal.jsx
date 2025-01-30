/**
 * Modal to change password
 */
import React, { useState } from "react";

const ChangePasswordModal = ({ userId, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const theme = localStorage.getItem("theme") || "light"; // Fetch theme

  const handleSubmit = () => {
    if (!password) {
      alert("Password cannot be empty!");
      return;
    }
    onSubmit(userId, password);
  };

  return (
    <div className={`change-password-modal ${theme === "dark" ? "dark-mode" : ""}`}>
      <h2>Change Password for User ID: {userId}</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        className={`${theme === "dark" ? "dark-mode" : ""}`}
      />
      <div className="modal-actions">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
