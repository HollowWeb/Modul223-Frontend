/**
 * The main application component for the frontend.
 * Handles routing, dark mode toggle, and the overall structure of the application.
 */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyArticles from './pages/MyArticles';
import ViewArticle from './pages/ViewArticle';
import Roles from './pages/ManageUser';
import Analytics from './pages/Analytics';
import TagsCategories from './pages/TagsCategories';
import Profile from './pages/Profile';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import { Routes, Route } from 'react-router-dom';
import Unauthorized from './components/Unauthorized';
import EditArticle from './pages/EditArticle'
import PendingArticles from './pages/PendingArticles';
/**
 * The main application component for the frontend.
 * Handles routing, dark mode toggle, and the overall structure of the application.
 */
function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  // add class dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  /**
   * Toggles the dark mode state and saves the preference to localStorage.
   */
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    /**
     * Main container for the application.
     * Includes the Navbar, routing for pages, and Footer.
     */
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/view-article/:id" element={<ViewArticle />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tags-categories" element={<TagsCategories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="/pending-articles" element={<PendingArticles />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
