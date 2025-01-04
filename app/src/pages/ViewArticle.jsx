import React from 'react';

function ViewArticle() {
  const handleExport = () => {
    alert('Export options: PDF or HTML (To be implemented)');
  };

  return (
    <div>
      <h1>View Article</h1>
      <p>This page displays the full content of an article.</p>
      <p>Expected Features:</p>
      <ul>
        <li>Show article content with tags/categories.</li>
        <li>Allow comments and discussions.</li>
        <li>Export article in PDF or HTML format.</li>
      </ul>
      <button onClick={handleExport}>Export Article</button>
    </div>
  );
}

export default ViewArticle;
