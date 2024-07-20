import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (sessionId) {
      navigate("/"); // Redirect to home or dashboard if session exists
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/Userlog", {
        email,
        password,
      });

      if (response.data.sessionId) {
        sessionStorage.setItem("sessionId", response.data.sessionId);
        navigate("/"); // Redirect to home or dashboard after successful login
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid credentials");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="path-to-your-logo.png" alt="Logo" />
      </div>
      <div className="login-form-wrapper">
        <div className="login-form-container">
          <h2>Member Login</h2>
          <form>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" onClick={handleLogin}>Login</button>
          </form>
          <a href="/forgot-password" className="forgot-password-link">Forgot email / Password?</a>
          <a href="/create-account" className="create-account-link">Create your Account</a>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
