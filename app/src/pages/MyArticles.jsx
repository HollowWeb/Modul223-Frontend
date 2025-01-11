import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myArticleStyle.css";
import { fetchArticles } from "../api.js";

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const navigate = useNavigate();

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

  const handleOpenModal = () => {
    setNewArticle({ title: "", content: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateArticle = async () => {
    try {
      const BASE_URL = "http://localhost:8080"; 

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
        <p>Manage your articles efficiently and beautifully.</p>
        <button className="btn-create" onClick={handleOpenModal}>
          + Create New Article
        </button>
      </header>
      <ul className="articles-list">
        {articles.map((article) => (
          <li className="article-item" key={article.id}>
            <div className="article-details">
              <h2>{article.title}</h2>
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
          </li>
        ))}
      </ul>

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
