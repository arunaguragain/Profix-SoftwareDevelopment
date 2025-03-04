import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import "../style/ServiceProviderLogin.css";

const ServiceProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying login errors
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/serviceproviders/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token for future requests
        localStorage.setItem("serviceProvider", JSON.stringify(response.data.serviceProvider));
        alert("Login successful!");
        navigate("/serviceproviderprofile"); // Redirect to profile page
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <div id="form" className="content">
            <h1>Login as a Service Provider</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br /><br />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br /><br />
              <button type="submit" className="btn" id="button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderLogin;
