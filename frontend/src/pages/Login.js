// src/pages/Login.js
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import ev2 from "../IMG/ev2.png";
import { FaChargingStation } from "react-icons/fa";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      // Basic client-side validation
      if (!email || !password) {
        alert("Email and password are required");
        return;
      }

      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/chargers");
    } catch (err) {
      if (err.response) {
        // Server responded with status code
        alert(err.response.data.message || "Login failed");
      } else {
        // Network or unknown error
        console.error("Login error:", err.message);
        alert("An error occurred during login");
      }
    }
  };

  return (
    <div className="outterLogin">
      <div className="auth-container">
        <div className="login-header">
          <img src={ev2} className="login-icon" />
          <h2>Welcome to ChargePoint Hub</h2>
          <p className="login-tagline">
            Manage your EV charging stations efficiently and effortlessly.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
