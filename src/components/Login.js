import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import axios from "axios"; // Import Axios
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      const response = await axios.post("http://localhost:7002/money_plant/login", {
        userEmail: email,
        Password: password,
      });
      
      if (response.status === 200) {
        console.log("Login Successful:", response.data);

        // Save token or user info if needed
        localStorage.setItem("user_id", response.data.results[0].user_id);
        localStorage.setItem("token", response.data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        console.error("Unexpected response:", response);
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err.response || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
