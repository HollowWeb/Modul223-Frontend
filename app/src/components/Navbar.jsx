import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import Material Icons
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-article">Create Article</Link>
        <Link to="/edit-article">Edit Article</Link>
        <Link to="/article-details">Article Details</Link>
        <Link to="/version-history">Version History</Link>
        <Link to="/permissions">Permissions</Link>
        <Link to="/roles">Role Management</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/export">Export</Link>
        <Link to="/tags-categories">Tags/Categories</Link>
        <Link to="/profile">Profile</Link>
      </div>
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
