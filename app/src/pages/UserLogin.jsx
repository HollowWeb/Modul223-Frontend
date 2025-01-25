/**
 * UserLogin component for handling user login.
 * Provides a form for entering username and password and handles authentication with the backend.
 */
import React, { useState } from "react";
import "../styles/loginStyle.css"; // Optional CSS for styling

function UserLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  /**
   * Handles input changes in the login form.
   * Updates the state with the new form values.
   * @param {Event} e - The change event from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    /**
   * Handles the form submission for user login.
   * Sends a POST request to the backend to authenticate the user.
   * @param {Event} e - The submit event from the form.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Parse JSON response
        const data = await response.json();

        // Extract Authorization header
        const tokenHeader = response.headers.get("Authorization");
        if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
          const token = tokenHeader.split(" ")[1];

          // Save token to localStorage
          localStorage.setItem("jwtToken", token);

          // Redirect user to dashboard or home page
          window.location.href = "/dashboard";
        } else {
          setMessage("Login successful, but no token received.");
        }
      } else {
        // Handle errors from the backend
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Unexpected error occurred."}`);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </label>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
