import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (sessionId) {
      navigate("/admin/dash");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });

      if (response.data.sessionId) {
        sessionStorage.setItem("sessionId", response.data.sessionId);
        navigate("/admin/dash");
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
      </div>
      <div className="login-form-wrapper">
        <div className="login-form-container">
        <img id="img-globe" src=".\public\globe.png" alt="Logo" />
          <h2>Member Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
          </form>
          <a href="/forgot-password" className="forgot-password-link">Forgot Username / Password?</a>
          <a href="/create-account" className="create-account-link">Create your Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
