
import React, { useState } from "react"; 
import "../styles/registerStyle.css";

function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    //--------------- BACKEND CALL  IMPLEMENTATION HERE --------------------------
  };

  return (
    <div className="registration-container">
      <h1>Create an Account</h1>
      <p>Register to access all features of our platform.</p>
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