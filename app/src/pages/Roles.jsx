import React from 'react';
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode"; 

function Roles() {
  const roles = getRolesFromToken();

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
