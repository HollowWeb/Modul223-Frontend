/**
 * Home component for the application.
 * Serves as the landing page with a welcome message, description, and a custom SVG logo.
 */
import React from 'react';
import '../styles/homeStyle.css'

function Home() {
  const theme = localStorage.getItem("theme") || "light";
  // Two different version of svg logo for different themes 
  const lightLogo = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" className="hero-logo-svg">
      <rect width="500" height="200" fill="transparent" />
      <text x="50%" y="50%" font-family="'Times New Roman', Times, serif" font-size="96" text-anchor="middle" fill="black">
        w<tspan fill="#007bff">Y</tspan>Zen
      </text>
      <circle cx="170" cy="65" r="6" fill="red" />
      <circle cx="190" cy="85" r="6" fill="blue" />
      <circle cx="200" cy="65" r="6" fill="yellow" />
    </svg>
  );

  const darkLogo = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" className="hero-logo-svg">
      <rect width="500" height="200" fill="transparent" />
      <text x="50%" y="50%" font-family="'Times New Roman', Times, serif" font-size="96" text-anchor="middle" fill="white">
        w<tspan fill="#007bff">Y</tspan>Zen
      </text>
      <circle cx="170" cy="65" r="6" fill="red" />
      <circle cx="190" cy="85" r="6" fill="blue" />
      <circle cx="200" cy="65" r="6" fill="yellow" />
    </svg>
  );
  // A lot of css used here for animations etc
  return (
    <div className={`home-container ${theme}`}>
      
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-logo">{theme === "light" ? lightLogo : darkLogo}</div>
        <h1 className="hero-title">Welcome to wYZen</h1>
        <p className="hero-description">Collaborative Knowledge Management System</p>
        <div className="hero-buttons">
          <a href="https://github.com/HollowWeb/Modul223-Backend" target='blank'><button className="btn btn-secondary">Learn More</button></a>
          
        </div>
      </div>
    </div>
  );
}

export default Home;