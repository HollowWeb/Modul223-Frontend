import React from 'react';
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";

function Permissions() {
const roles = getRolesFromToken();
  
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" />; 
  }

  return (
    <div>
      <h1>Permissions</h1>
      <p>This page will allow administrators to manage user roles and permissions for viewing, editing, and deleting articles.</p>
    </div>
  );
}

export default Permissions;
