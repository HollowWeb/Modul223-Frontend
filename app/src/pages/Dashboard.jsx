/**
 * Dashboard that allows any user logged in or not to view articles 
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/allArticlesStyle.css";

const AllArticles = () => {
  // INIT State 
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = localStorage.getItem("theme") || "light";
  // INIT navigate to redirect users to view articles page
  const navigate = useNavigate();

  // Fetch articles and tags
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch articles
        const articlesResponse = await fetch("http://localhost:8080/api/articles/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!articlesResponse.ok) {
          throw new Error(`Failed to fetch articles. Status: ${articlesResponse.status}`);
        }
        const articlesData = await articlesResponse.json();

        // Fetch tags that are used to filter
        const tagsResponse = await fetch("http://localhost:8080/api/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!tagsResponse.ok) {
          throw new Error(`Failed to fetch tags. Status: ${tagsResponse.status}`);
        }
        const tagsData = await tagsResponse.json();

        setArticles(articlesData);
        setFilteredArticles(articlesData);
        setTags(tagsData.map((tag) => tag.tagName)); // Extract tag names
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedTags);
  };

  // Handle tag selection
  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    applyFilters(searchQuery, updatedTags);
  };

  // Apply search and tag filters
  const applyFilters = (query, tags) => {
    const filtered = articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(query);
      const matchesTags = tags.length
        ? tags.every((tag) => article.tags.includes(tag))
        : true; // Show all if no tags are selected
      return matchesSearch && matchesTags;
    });
    setFilteredArticles(filtered);
  };
  // While fetching show Loading 
  if (loading) {
    return <div className={`all-articles-container ${theme}`}>Loading articles...</div>;
  }
  // If Loading throw error show user that articles could not be loaded [Backend Down not working etc...]
  if (error) {
    return (
      <div className={`all-articles-container ${theme}`}>
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`all-articles-container ${theme}`}>
      <header className={`header ${theme}`}>
        <h1>All Articles</h1>
        <p>Explore all published articles.</p>
      </header>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
          className={`search-input ${theme}`}
        />
        <div className="tags-filter">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag-button ${
                selectedTags.includes(tag) ? "active" : ""
              } ${theme}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div className={`article-card ${theme}`} key={article.id}>
            <div className="article-header">
              <h2>{article.title}</h2>
            </div>
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span className={`article-tag ${theme}`} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="article-content">
              <p>{article.content.substring(0, 100)}...</p>
            </div>
            <div className="article-actions">
              <button
                className={`btn-view ${theme}`}
                onClick={() => navigate(`/view-article/${article.id}`)}
              >
                View Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
