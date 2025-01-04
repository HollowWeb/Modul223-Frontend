import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyArticles() {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' },
  ]);

  const handleCreateArticle = () => {
    alert('Redirect to Create Article Form (To be implemented)');
  };

  const handleEditArticle = (id) => {
    alert(`Edit Article ${id} (To be implemented)`);
  };

  const handleVersionHistory = (id) => {
    alert(`View Version History for Article ${id} (To be implemented)`);
  };

  return (
    <div>
      <h1>My Articles</h1>
      <p>This page lets users manage their articles.</p>
      <button onClick={handleCreateArticle}>+ Create New Article</button>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title}
            <button onClick={() => handleEditArticle(article.id)}>Edit</button>
            <button onClick={() => handleVersionHistory(article.id)}>Version History</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyArticles;
