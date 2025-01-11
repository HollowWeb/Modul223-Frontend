const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchArticles() {
  const response = await fetch(`${BASE_URL}/api/articles`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}
