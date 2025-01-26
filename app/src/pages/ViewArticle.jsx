import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/viewArticleStyle.css";

const ViewArticle = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch article. Status: ${response.status}`);
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`view-article-container ${theme === "dark" ? "dark-mode" : ""}`} style={{width: '80%'}}>
      <button className={`btn-back ${theme === "dark" ? "dark-mode" : ""}`} onClick={() => navigate(-1)}>
        Back
      </button>
      <div className={`article-markdown ${theme === "dark" ? "dark-mode" : ""}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ViewArticle;
