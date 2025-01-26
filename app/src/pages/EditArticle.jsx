import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/editArticleStyle.css";

const EditArticle = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: "", content: "" });
  const [previewMode, setPreviewMode] = useState("side-by-side"); // Default to side-by-side
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = localStorage.getItem("theme") || "light";

  // Fetch the article on component mount
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
        setArticle({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setArticle((prev) => ({ ...prev, content }));
  };

  const handleUpdateArticle = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update article. Status: ${response.status}`);
      }

      navigate("/my-articles"); // Go back to the MyArticles page
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`edit-article-page ${theme === "dark" ? "dark-mode" : ""}`}>
    <div className="edit-header">
      <button className="btn-back" onClick={() => navigate("/my-articles")}>
        Back
      </button>
      <div className="preview-controls">
        <button
          className={`btn-preview ${previewMode === "none" ? "active" : ""}`}
          onClick={() => setPreviewMode("none")}
        >
          Edit Only
        </button>
        <button
          className={`btn-preview ${previewMode === "side-by-side" ? "active" : ""}`}
          onClick={() => setPreviewMode("side-by-side")}
        >
          Side-by-Side
        </button>
        <button
          className={`btn-preview ${previewMode === "preview-only" ? "active" : ""}`}
          onClick={() => setPreviewMode("preview-only")}
        >
          Preview Only
        </button>
      </div>
    </div>

      <main
        className={`edit-article-body ${previewMode === "side-by-side"
          ? "split-view"
          : previewMode === "preview-only"
          ? "full-width"
          : ""
        }`}
      >
        {(previewMode === "none" || previewMode === "side-by-side") && (
          <section className="edit-section">
            <label>Title:</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) =>
                setArticle((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              value={article.content}
              onChange={handleContentChange}
            ></textarea>
          </section>
        )}

        {(previewMode === "side-by-side" || previewMode === "preview-only") && (
          <section className="preview-section">
            <h3>Markdown Preview</h3>
            <div className="preview-inner">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </section>
        )}
      </main>

      <footer className={`edit-footer ${theme === "dark" ? "dark-mode" : ""}`}>
  <button
    className="btn-save"
    onClick={handleUpdateArticle}
    disabled={isSubmitting}
  >
    {isSubmitting ? "Saving..." : "Save"}
  </button>
  <button className="btn-cancel" onClick={() => navigate("/my-articles")}>
    Cancel
  </button>
</footer>
    </div>
  );
};

export default EditArticle;