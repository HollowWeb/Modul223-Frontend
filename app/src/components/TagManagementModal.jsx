/**
 * Modul to add new Tags to Article
 */
import React, { useState, useEffect } from "react";

const ManageTagsModal = ({ article, onClose, onTagsUpdated }) => {
    // Use an empty array as the default if article or article.tags is undefined
    const [selectedTags, setSelectedTags] = useState(article?.tags || []); 
    const [availableTags, setAvailableTags] = useState([]);
    const theme = localStorage.getItem("theme") || "light";
    // Get all tags that are in DB
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
                    throw new Error("Failed to fetch tags.");
                }

                const data = await response.json();
                setAvailableTags(data);
            } catch (err) {
                console.error("Error fetching tags:", err);
            } 
        };

        fetchTags();
    }, []);
    // Change state of tags when changes are made
    const handleTagChange = (tagName) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tagName)
                ? prevTags.filter((name) => name !== tagName) // Remove tag if already selected
                : [...prevTags, tagName] // Add tag if not selected
        );
    };

    // Update Article with new Tags 
    const handleSaveTags = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/articles/${article.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tags: selectedTags }), // Pass the array of strings
            });

            if (!response.ok) {
                throw new Error("Failed to update tags.");
            }
            
            onTagsUpdated(article.id, selectedTags);
            onClose();
        } catch (err) {
            console.error("Error updating tags:", err);
            alert("Failed to update tags. Please try again.");
        }
    };

    // Render nothing if article is undefined
    if (!article) {
        return null; 
    }



    return (
        <div className={`manage-tags-modal-container ${theme}`}>
            <h2 className={`manage-tags-modal-title ${theme}`}>Manage Tags for "{article.title}"</h2>
            <div className="manage-tags-selection">
                {availableTags.map((tag) => (
                    <label key={tag.id} className={theme}>
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.tagName)}
                            onChange={() => handleTagChange(tag.tagName)}
                        />
                        {tag.tagName}
                    </label>
                ))}
            </div>
            <div className="manage-tags-modal-actions">
                <button onClick={handleSaveTags} className={`btn-save-tags ${theme}`}>
                    Save
                </button>
                <button onClick={onClose} className={`btn-cancel-tags ${theme}`}>
                    Cancel
                </button>
            </div>
        </div>

    );
};

export default ManageTagsModal;
