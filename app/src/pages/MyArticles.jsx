/**
 * MyArticles component for managing the user's articles.
 * Allows users to view a list of their articles, create new ones, and navigate to editing or history pages.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myArticleStyle.css";
import { fetchArticles } from "../api.js";

function MyArticles() {
  // State to hold the list of articles
  const [articles, setArticles] = useState([]);

  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to store new article details
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  // Hook for navigation
  const navigate = useNavigate();

  /**
   * Fetch articles on component mount.
   * Calls the `fetchArticles` function and updates the articles state.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * Opens the modal for creating a new article.
   * Resets the new article state.
   */
  const handleOpenModal = () => {
    setNewArticle({ title: "", content: "" });
    setShowModal(true);
  };

  /**
   * Closes the modal without saving changes.
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Handles the creation of a new article.
   * Sends the article data to the backend and updates the articles state.
   */
  const handleCreateArticle = async () => {
    try {
      const BASE_URL = "http://localhost:8080"; // Backend URL

      const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newArticle.title,
          content: newArticle.content || "",
          status: "DRAFT",
          createdById: 1, // Replace with the actual user ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create article. Status: ${response.status}`);
      }

      const createdArticle = await response.json();

      // Update the articles state and navigate to the edit page for the new article
      setArticles((prevArticles) => [...prevArticles, createdArticle]);
      setShowModal(false);
      navigate(`/edit-article/${createdArticle.id}`);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className="my-articles-container">
  
      <header className="header">
        <h1>My Articles</h1>
        <p>Select an already existing Article or create a new one.</p>
        <button className="btn-create" onClick={handleOpenModal}>
          + Create New Article
        </button>
      </header>

 
      <section className="all-articles-section">
        <h2>All Articles</h2>
        <div className="all-articles-placeholder">
          <p>
            This section will display a list of all articles in the future also
            when logged in correctly.
          </p>
        </div>
      </section>

    
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Article</h2>

        
            <label>
              Title:
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
                placeholder="Enter article title"
              />
            </label>
            <label>
              Content:
              <textarea
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, content: e.target.value })
                }
                placeholder="Enter article content"
              />
            </label>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleCreateArticle}>
                Save
              </button>
              <button className="btn-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyArticles;
