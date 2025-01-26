/**
 * Entry point for the React application.
 * Initializes the application and sets up the router for handling routes.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
   /**
   * Wraps the application in `React.StrictMode` for development warnings.
   * Adds `Router` for managing client-side routing.
   */
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
