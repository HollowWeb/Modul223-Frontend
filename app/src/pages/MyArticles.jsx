/**
 * MyArticles component for managing the user's articles.
 * Allows users to view a list of their articles, create new ones, and navigate to editing or history pages.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myArticleStyle.css";
import { jwtDecode } from "jwt-decode";
import CreateArticle from "./CreateArticle";
import TagManagementModal from "../components/TagManagementModal";

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null); // Track the selected article
  const [showTagsModal, setShowTagsModal] = useState(false); // Control the modal visibility
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

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
        console.log("Fetched Articles:", data); // Debugging output
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
        <button className={`btn-create ${theme}`} onClick={() => setShowModal(true)}>
          + Create New Article
        </button>
      </header>

      <section className="all-articles-section">
        <h2>All Articles</h2>
        {articles.length === 0 ? (
          <div className={`all-articles-placeholder ${theme}`}>
            <p>No articles found. Click "Create New Article" to get started!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div className={`article-card ${theme}`} key={article.id}>
                <span className={`article-status ${theme}`}>{article.status.toUpperCase()}</span>
                <div className="article-header">
                  <h2>{article.title}</h2>
                </div>
                <div className="article-content">
                  <p>{article.content.substring(0, 100)}...</p>
                </div>
                <div className="article-tags">
                  <strong>Tags:</strong>{" "}
                  {article.tags && article.tags.length > 0
                    ? article.tags.join(", ") // Directly join the strings in the tags array
                    : "No tags"}
                </div>

                <div className="article-actions">
                  <button
                    className={`btn-edit ${theme}`}
                    onClick={() => navigate(`/edit-article/${article.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn-manage-tags ${theme}`}
                    onClick={() => {
                      setSelectedArticle(article); // Set the current article
                      setShowTagsModal(true); // Open the modal
                    }}
                  >
                    Manage Tags
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
          onArticleCreated={(newArticle) => {
            setArticles((prevArticles) => [...prevArticles, newArticle]);
            setShowModal(false);
          }}
        />
      )}

      {showTagsModal && selectedArticle && (
        <TagManagementModal
          article={selectedArticle}
          onClose={() => setShowTagsModal(false)}
          onTagsUpdated={(articleId, updatedTags) => {
            setArticles((prevArticles) =>
              prevArticles.map((article) =>
                article.id === articleId ? { ...article, tags: updatedTags } : article
              )
            );
            setShowTagsModal(false);
          }}
        />
      )}
    </div>
  );
}

export default MyArticles;