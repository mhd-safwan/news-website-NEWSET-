import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("http://localhost:8000/user/logout");

        // Assuming you want to clear session data or tokens in the frontend
        sessionStorage.removeItem("sessionId");

        // Redirect to login page after successful logout
        navigate("/login");
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default UserLogout;
