import React from 'react';
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";

function Analytics() {
  const roles = getRolesFromToken();
  
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" />; 
  }
  return (
    <div>
      <h1>Analytics</h1>
      <p>This page will provide insights into article views, edits, and user engagement statistics.</p>
    </div>
  );
}

export default Analytics;
