/**
 * Home component for the application.
 * Serves as the landing page with a welcome message, description, and a custom SVG logo.
 */
import React from 'react';

function Home() {

  /**
   * Chatgpt code for the creation of our logo on the landing page.
   */
  return (
    <div>
      <h1>Welcome to wYZen</h1>
      <p>Collaborative Knowledge Management System</p>


      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" xmlns:xlink="http://www.w3.org/1999/xlink">

  <rect width="500" height="200" fill="white" />


  <text x="50%" y="50%" font-family="'Times New Roman', Times, serif" font-size="72" text-anchor="middle" fill="black">
    w<tspan fill="#007bff">Y</tspan>Zen
  </text>

  <circle cx="170" cy="65" r="4" fill="red" />
  <circle cx="190" cy="85" r="4" fill="blue" />
  <circle cx="210" cy="65" r="4" fill="yellow" />
</svg>

    </div>
  );
}

export default Home;