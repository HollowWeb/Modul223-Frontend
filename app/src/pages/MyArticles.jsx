import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myArticleStyle.css";

import CreateArticle from "./CreateArticle";

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light"; // Retrieve theme from localStorage

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
  
        if (!token) {
          navigate("/login"); // Redirect if no token is found
          return;
        }
  
        // Decode the token to extract userId
        import("jwt-decode").then(({ decode }) => {
          const decodedToken = decode(token);
          const userId = decodedToken.userId;
          console.log("User ID:", userId);
        });
        
  
        if (!userId) {
          throw new Error("User ID not found in token.");
        }
  
        const response = await fetch(`http://localhost:8080/api/articles/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch articles. Status: ${response.status}`);
        }
  
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);

  const handleArticleCreated = (newArticle) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    navigate(`/edit-article/${newArticle.id}`);
  };

  if (loading) {
    return <div className={`my-articles-container ${theme}`}>Loading articles...</div>;
  }

  if (error) {
    return (
      <div className={`my-articles-container ${theme}`}>
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`my-articles-container ${theme}`}>
      <header className={`header ${theme}`}>
        <div className="header-content">
          <h1>My Articles</h1>
          <p>Select an existing article or create a new one.</p>
        </div>
        <button className="btn-create" onClick={() => setShowModal(true)}>
          + Create New Article
        </button>
      </header>

      <section className="all-articles-section">
        <h2>All Articles</h2>
        {articles.length === 0 ? (
          <div className="all-articles-placeholder">
            <p>No articles found. Click "Create New Article" to get started!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div className="article-card" key={article.id}>
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p>{article.content.substring(0, 100)}...</p>
                </div>
                <div className="article-actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit-article/${article.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-history"
                    onClick={() => navigate(`/article-history/${article.id}`)}
                  >
                    Version History
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <CreateArticle
          onClose={() => setShowModal(false)}
          onArticleCreated={handleArticleCreated}
        />
      )}
    </div>
  );
}

export default MyArticles;
