import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyArticles from './pages/MyArticles';
import ViewArticle from './pages/ViewArticle';
import Permissions from './pages/Permissions';
import Roles from './pages/Roles';
import Analytics from './pages/Analytics';
import TagsCategories from './pages/TagsCategories';
import Profile from './pages/Profile';
import UnderDevelopment from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import { Routes, Route } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/view-article" element={<ViewArticle />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tags-categories" element={<TagsCategories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/login" element={<UnderDevelopment />} />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
