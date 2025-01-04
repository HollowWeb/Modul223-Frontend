import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import Material Icons
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Navbar({ darkMode, toggleDarkMode }) {
  const [adminDropdown, setAdminDropdown] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setAdminDropdown(!adminDropdown);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setAdminDropdown(false);
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-articles">My Articles</Link>

        {/* Admin Dropdown */}
        <div className="admin-dropdown" onMouseLeave={closeDropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Admin ▼
          </button>
          {adminDropdown && (
            <div className="dropdown-menu">
              <Link to="/tags-categories" onClick={closeDropdown}>Tags/Categories</Link>
              <Link to="/analytics" onClick={closeDropdown}>Analytics</Link>
              <Link to="/roles" onClick={closeDropdown}>Role Management</Link>
              <Link to="/permissions" onClick={closeDropdown}>Permissions</Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
