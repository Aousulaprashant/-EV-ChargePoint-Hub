// src/pages/Register.js
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

import ev2 from "../IMG/ev2.png";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = formData;

      // Basic client-side validation
      if (!name || !email || !password) {
        alert("All fields are required");
        return;
      }

      await axios.post("/auth/register", { name, email, password });
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      if (err.response) {
        // Server responded with status code
        alert(err.response.data.message || "Registration failed");
      } else {
        // Network or unknown error
        console.error("Register error:", err.message);
        alert("An error occurred during registration");
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
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
