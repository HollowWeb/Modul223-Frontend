/**
 * Roles component for managing user roles and permissions.
 * Accessible only to users with the "ADMIN" role. Redirects unauthorized users.
 */
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";
import React, { useState, useEffect } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import '../styles/manageUsersStyle.css'
import RoleManagementModal from "../components/RoleManagementModal";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // List of available roles
  const [selectedUserForRoles, setSelectedUserForRoles] = useState(null); // User for managing roles
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null); // User for changing password
  const [newPassword, setNewPassword] = useState(""); // Password input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = localStorage.getItem("theme") || "light"; // Retrieve theme


  const UserRoles = getRolesFromToken();
  if (!UserRoles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" />;
  }

  

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
  
        // Fetch Users
        const usersResponse = await fetch("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users. Status: ${usersResponse.status}`);
        }
  
        const usersData = await usersResponse.json();
        setUsers(usersData);
  
        // Fetch Roles
        const rolesResponse = await fetch("http://localhost:8080/api/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!rolesResponse.ok) {
          throw new Error(`Failed to fetch roles. Status: ${rolesResponse.status}`);
        }
  
        // Map roles to an array of role names
        const rolesData = await rolesResponse.json();
        const roleNames = rolesData.map((role) => role.roleName);
        setRoles(roleNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsersAndRoles();
  }, []);
  

  const handleChangePassword = async () => {
    if (!newPassword) {
      alert("Password cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`http://localhost:8080/api/users/${selectedUserForPassword}/password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error(`Failed to change password. Status: ${response.status}`);
      }

      alert("Password changed successfully!");
      setSelectedUserForPassword(null);
      setNewPassword("");
    } catch (err) {
      alert("Failed to change password. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
      }

      // Remove the user from the UI after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user. Please try again.");
      console.error(err);
    }
  };

  const handleUpdateRoles = async (userId, updatedRoles) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const payload = {
        username: users.find((user) => user.id === userId).username,
        email: users.find((user) => user.id === userId).email,
        password: null, // Keep password unchanged
        roles: updatedRoles,
      };

      const response = await fetch(`http://localhost:8080/api/users/${userId}/admin-update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update roles. Status: ${response.status}`);
      }

      const updatedUser = await response.json();

      // Update the user in the UI
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );

      alert("Roles updated successfully!");
      setSelectedUserForRoles(null);
    } catch (err) {
      alert("Failed to update roles. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`manage-users-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <h1>Manage Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.roles.join(", ")}</td>
      <td>
        <div className="action-buttons">
          <button
            className="btn-manage-roles"
            onClick={() => setSelectedUserForRoles(user)}
          >
            Manage Roles
          </button>
          <button
            className="btn-change-password"
            onClick={() => setSelectedUserForPassword(user.id)}
          >
            Change Password
          </button>
          <button
            className="btn-delete-user"
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete User
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Role Management Modal */}
      {selectedUserForRoles && (
        <RoleManagementModal
          user={selectedUserForRoles}
          roles={roles}
          onClose={() => setSelectedUserForRoles(null)}
          onSave={handleUpdateRoles}
        />
      )}

      {/* Change Password Modal */}
      {selectedUserForPassword && (
        <div className={`change-password-modal ${theme === "dark" ? "dark-mode" : ""}`}>
          <h2>Change Password for User ID: {selectedUserForPassword}</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className={`${theme === "dark" ? "dark-mode" : ""}`}
          />
          <div className="modal-actions">
            <button onClick={handleChangePassword}>Submit</button>
            <button onClick={() => setSelectedUserForPassword(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default ManageUsers;
