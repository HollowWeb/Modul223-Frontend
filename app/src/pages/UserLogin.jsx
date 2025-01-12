import React, { useState } from "react";
import "../styles/loginStyle.css"; // Optional CSS for styling

function UserLogin() {
  const [formData, setFormData] = useState({
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
    console.log("Login form submitted:", formData);
    // -----------BACKEND CALL IMPLEMENTATION HERE----------------
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
