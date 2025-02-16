import React, { useState } from "react";
import ".//style/ServiceProviderLogin.css";

const ServiceProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    
    console.log("Attempting login with:", { email, password });
    
    if (email === "provider@example.com" && password === "password123") {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <div id="form" className="content">
            <h1>Login as a Service Provider</h1>
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
