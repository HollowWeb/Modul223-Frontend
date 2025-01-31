/**
 * Nav to navigate page
 */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

// Import Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Navbar({ darkMode, toggleDarkMode }) {
  const [adminDropdown, setAdminDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in based on token presence in localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token); 
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setAdminDropdown(!adminDropdown);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setAdminDropdown(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove token
    setIsLoggedIn(false); 
    navigate("/"); 
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
              <Link to="/tags-categories" onClick={closeDropdown}>
                Tags/Categories
              </Link>
              <Link to="/analytics" onClick={closeDropdown}>
                Analytics
              </Link>
              <Link to="/roles" onClick={closeDropdown}>
                Users
              </Link>
              <Link to="/pending-articles" onClick={closeDropdown}>
                Pending Articles
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
