/**
 * Roles component for managing user roles and permissions.
 * Accessible only to users with the "ADMIN" role. Redirects unauthorized users.
 */
import React from 'react';
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";

function Roles() {
  // Retrieve roles from the JWT token
  const roles = getRolesFromToken();

  /**
   * Check if the user has the "ADMIN" role.
   * If not, redirect them to the "Unauthorized" page.
   */
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div>
      <h1>Role Management</h1>

      <p>This page allows admins to manage user roles and permissions.</p>

      <p>Expected Features:</p>
      <ul>
        <li>View existing roles and their permissions.</li>
        <li>Add, edit, or delete roles.</li>
      </ul>
    </div>
  );
}

export default Roles;
