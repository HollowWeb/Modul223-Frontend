import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRolesFromToken } from "../util/auth/jwtDecode";
import "../styles/pendingArticles.css";

const PendingArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const roles = getRolesFromToken();
    const theme = localStorage.getItem("theme") || "light";
    /**
     * Check if the user has the "ADMIN" role.
     * If not, redirect them to the "Unauthorized" page.
     */
    if (!roles.includes("ADMIN")) {
        return <Navigate to="/unauthorized" />;
    }

    useEffect(() => {
        const fetchPendingArticles = async () => {
            try {
                const token = localStorage.getItem("jwtToken");

                const response = await fetch("http://localhost:8080/api/articles/pending", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch articles. Status: ${response.status}`);
                }

                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingArticles();
    }, []);

    const handleApproveArticle = async (articleId) => {
        try {
            const token = localStorage.getItem("jwtToken");

            const response = await fetch(`http://localhost:8080/api/articles/${articleId}/approve`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to approve article. Status: ${response.status}`);
            }

            // Update the UI after approval
            setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
            alert("Article approved successfully!");
        } catch (error) {
            console.error("Error approving article:", error);
            alert("Failed to approve the article. Please try again.");
        }
    };

    const handleDenyArticle = async (articleId) => {
        try {
            const token = localStorage.getItem("jwtToken");

            const response = await fetch(`http://localhost:8080/api/articles/${articleId}/deny`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to deny article. Status: ${response.status}`);
            }

            // Update the UI after denial
            setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
            alert("Article denied successfully!");
        } catch (error) {
            console.error("Error denying article:", error);
            alert("Failed to deny the article. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading pending articles...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`pending-articles-container ${theme === "dark" ? "dark-mode" : ""}`}>
            <h1>Pending Approval Articles</h1>
            {articles.length === 0 ? (
                <p>No pending articles at the moment.</p>
            ) : (
                <div className="articles-grid">
                    {articles.map((article) => (
                        <div
                            className={`article-card ${theme === "dark" ? "dark-mode" : ""}`}
                            key={article.id}
                        >
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 100)}...</p>
                            <div className="article-actions">
                                <button
                                    className="view"
                                    onClick={() => navigate(`/view-article/${article.id}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="approve"
                                    onClick={() => handleApproveArticle(article.id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="deny"
                                    onClick={() => handleDenyArticle(article.id)}
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingArticles;
