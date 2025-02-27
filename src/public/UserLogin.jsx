import { useState } from "react";
import "../style/userlogin.css"; 

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <div id="form" className="content">
            <h1>Login as a User</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
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

export default UserLogin;
