/**
 * Admin page to add new Tag or alter Delete existing ones
 */
import React, { useState, useEffect } from "react";
import { getRolesFromToken } from "../util/auth/jwtDecode";
import '../styles/TagsCategories.css';

const TagManagement = () => {
  // INIT STATE
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editingTagName, setEditingTagName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = localStorage.getItem("theme") || "light";
  const roles = getRolesFromToken();

  /**
 * Check if the user has the "ADMIN" role.
 * If not, redirect them to the "Unauthorized" page.
 */
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" />;
  }
  // Get all tags from backend 
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/api/tags", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tags. Status: ${response.status}`);
        }

        const data = await response.json();
        setTags(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);
  // Create a new tag (Tag names are unique)
  const handleCreateTag = async () => {
    if (!newTag.trim()) {
      alert("Tag name cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/api/tags", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagName: newTag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create tag. Status: ${response.status}`);
      }

      const createdTag = await response.json();
      setTags((prevTags) => [...prevTags, createdTag]);
      setNewTag("");
    } catch (err) {
      alert("Failed to create tag. Please try again.");
      console.error(err);
    }
  };
  // Update existing tag(s)
  const handleUpdateTag = async (id) => {
    if (!editingTagName.trim()) {
      alert("Tag name cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/tags/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagName: editingTagName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update tag. Status: ${response.status}`);
      }

      const updatedTag = await response.json();
      setTags((prevTags) =>
        prevTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
      );
      setEditingTag(null);
      setEditingTagName("");
    } catch (err) {
      alert("Failed to update tag. Please try again.");
      console.error(err);
    }
  };

  // Show state of fetching
  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`tag-management-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <h1>Tag Management</h1>

      <div className="create-tag-section">
        <input
          type="text"
          placeholder="Enter new tag name"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className={`${theme === "dark" ? "dark-mode" : ""}`}
        />
        <button onClick={handleCreateTag}>Create Tag</button>
      </div>

      <table className="tag-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.id}</td>
              <td>
                {editingTag === tag.id ? (
                  <input
                    type="text"
                    value={editingTagName}
                    onChange={(e) => setEditingTagName(e.target.value)}
                    className={`${theme === "dark" ? "dark-mode" : ""}`}
                  />
                ) : (
                  tag.tagName
                )}
              </td>
              <td>
                {editingTag === tag.id ? (
                  <>
                    <button onClick={() => handleUpdateTag(tag.id)}>Save</button>
                    <button onClick={() => setEditingTag(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingTag(tag.id);
                        setEditingTagName(tag.tagName);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagManagement;
