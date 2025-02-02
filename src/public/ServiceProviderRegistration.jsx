import React, { useState } from "react";
import "../style/ServiceProviderRegistration.css"; // Keep your existing CSS

const ServiceProviderSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    
    const { fullName, address, email, contact, password, confirmPassword } = formData;

    if (!fullName.trim()) return alert("Full Name is required.");
    if (!address.trim()) return alert("Address is required.");
    if (!email.trim()) return alert("Email is required.");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.trim())) return alert("Enter a valid email address.");

    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(contact.trim())) return alert("Enter a valid 10-digit contact number.");

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password.trim())) 
      return alert("Password must be 8+ characters, including letters, numbers, and special characters.");

    if (password !== confirmPassword) return alert("Passwords do not match.");

    alert("Signup successful!");
    setFormData({ fullName: "", address: "", email: "", contact: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <h1>Sign Up as a Service Provider</h1>
          <form onSubmit={validateForm}>
            <input type="text" id="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <br />
            <input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <br />
            <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <br />
            <input type="text" id="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
            <br />
            <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <br />
            <input type="password" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <br />
            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderSignUp;
