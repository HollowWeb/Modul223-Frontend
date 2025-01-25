
import React, { useState } from "react"; 
import "../styles/registerStyle.css";

function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
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
          setMessage("Registration successful, but no token received.");
        }
      } else {
        // Handle errors from the backend
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Unexpected error occurred."}`);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="registration-container">
      <h1>Create an Account</h1>
      <p>Register to access all features of our platform.</p>

      {message && <p className="message">{message}</p>}

      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegistration;