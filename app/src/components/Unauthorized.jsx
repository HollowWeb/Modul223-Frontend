/**
 * Component page which gets shown when access got denied.
 */
import React from "react";

function Unauthorized() {
  return (
    <div>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
}

export default Unauthorized;
