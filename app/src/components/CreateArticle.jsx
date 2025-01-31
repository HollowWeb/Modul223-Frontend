/**
 * Modul where users can create there own article
 */
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/createArticleStyle.css";

const CreateArticle = ({ onClose, onArticleCreated }) => {
  // Set default states
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [previewMode, setPreviewMode] = useState("none"); // "none", "side-by-side", "preview-only"
  const [isSubmitting, setIsSubmitting] = useState(false);


  // When saving the article make post request to backend
  const handleCreateArticle = async () => {
    // Prevent save button from beeing pressed more than one before complete 
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

      // Throw error since article could not be created and responce is not 200
      if (!response.ok) {
        throw new Error(`Failed to create article. Status: ${response.status}`);
      }

      const createdArticle = await response.json();
      onArticleCreated(createdArticle);
      onClose();
      // catch any error that ocure while creating article
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      // Free save button again
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <header className="modal-header">
        <h2>Create New Article</h2>
        <button className="btn-close" onClick={onClose}>✕</button>
      </header>
      {/* Switch between showing Markdown compiled preview */}
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
      {/* Actual conten with or without preview */}
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
      {/* Save button that triggers post request */}
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
