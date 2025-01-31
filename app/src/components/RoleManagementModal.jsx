/**
 * Modal that allows for changing user roles
 */
import React, { useState } from "react";

const RoleManagementModal = ({ user, roles, onClose, onSave }) => {
  // Get the targeted users Roles
  const [userRoles, setUserRoles] = useState(user.roles || []); 
  const theme = localStorage.getItem("theme") || "light"; 
  // set the state of the roles when changes are made
  const toggleRole = (role) => {
    setUserRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role) 
        : [...prevRoles, role] 
    );
  };
  // Call the onSave function passed as a prop
  const handleSave = () => {
    onSave(user.id, userRoles); 
  };

  return (
    <div className={`manage-roles-modal ${theme === "dark" ? "dark-mode" : ""}`}>
      <h2>Manage Roles for User: {user.username}</h2>
      <div className="roles-list">
        {roles.map((role) => (
          <label key={role}>
            <input
              type="checkbox"
              checked={userRoles.includes(role)}
              onChange={() => toggleRole(role)}
            />
            {role}
          </label>
        ))}
      </div>
      <div className="modal-actions">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RoleManagementModal;
