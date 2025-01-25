/**
 * Permissions component for managing user roles and permissions.
 * Accessible only to users with the "ADMIN" role. Redirects unauthorized users.
 */
import React from 'react';
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";

function Permissions() {
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
      <h1>Permissions</h1>

      <p>
        This page will allow administrators to manage user roles and permissions
        for viewing, editing, and deleting articles.
      </p>
    </div>
  );
}

export default Permissions;
