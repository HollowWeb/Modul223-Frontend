import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import ArticleDetails from './pages/ArticleDetails';
import VersionHistory from './pages/VersionHistory';
import Permissions from './pages/Permissions';
import Roles from './pages/Roles';
import Analytics from './pages/Analytics';
import Export from './pages/Export';
import TagsCategories from './pages/TagsCategories';
import Profile from './pages/Profile';
import UnderDevelopment from './pages/UnderDevelopment';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article" element={<EditArticle />} />
          <Route path="/article-details" element={<ArticleDetails />} />
          <Route path="/version-history" element={<VersionHistory />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/export" element={<Export />} />
          <Route path="/tags-categories" element={<TagsCategories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<UnderDevelopment />} />
          <Route path="/register" element={<UnderDevelopment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
