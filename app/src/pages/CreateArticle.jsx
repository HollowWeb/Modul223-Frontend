import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/createArticleStyle.css";

const CreateArticle = ({ onClose, onArticleCreated }) => {
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [previewMode, setPreviewMode] = useState("none"); // "none", "side-by-side", "preview-only"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setNewArticle((prev) => ({ ...prev, content }));
  };

  const handleCreateArticle = async () => {
    setIsSubmitting(true);
    try {
      const BASE_URL = "http://localhost:8080";

      const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({
          title: newArticle.title,
          content: newArticle.content || "",
          status: "DRAFT",
        }),
        credentials: "include", // This ensures cookies or credentials are sent
      });


      if (!response.ok) {
        throw new Error(`Failed to create article. Status: ${response.status}`);
      }

      const createdArticle = await response.json();
      onArticleCreated(createdArticle);
      onClose();
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <header className="modal-header">
        <h2>Create New Article</h2>
        <button className="btn-close" onClick={onClose}>✕</button>
      </header>

      <div className="preview-controls">
        <button
          className={`btn-preview ${previewMode === "none" ? "active" : ""}`}
          onClick={() => setPreviewMode("none")}
        >
          Don't Show Preview
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
          Only Preview
        </button>
      </div>

      <div
        className={`modal-body ${previewMode === "side-by-side"
          ? "split-view"
          : previewMode === "preview-only"
            ? "full-width"
            : ""
          }`}
      >
        {(previewMode === "none" || previewMode === "side-by-side") && (
          <div className="edit-section">
            <label>Title:</label>
            <input
              type="text"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle((prev) => ({ ...prev, content: e.target.value }))
              }
            ></textarea>
          </div>
        )}

        {(previewMode === "side-by-side" || previewMode === "preview-only") && (
          <div className="preview-section">
            <h3>Markdown Preview</h3>
            <div className="preview-inner">
              <div className="preview-content">
                <ReactMarkdown>{newArticle.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="modal-actions">
        <button
          className="btn-save"
          onClick={handleCreateArticle}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateArticle;
