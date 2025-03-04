import React, { useState } from "react";
import "../style/ServiceProviderRegistration.css";

const ServiceProviderSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear error when user types
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};
    const { fullName, address, email, contact, password, confirmPassword } = formData;

    // Validation checks
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!email.trim()) newErrors.email = "Email is required";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() && !emailPattern.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    const contactPattern = /^[0-9]{10}$/;
    if (!contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!contactPattern.test(contact.trim())) {
      newErrors.contact = "Enter a valid 10-digit contact number";
    }

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(password.trim())) {
      newErrors.password = "Password must be 8+ characters with letters, numbers, and special characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Form submission success
    setTimeout(() => {
      // Simulating API call delay
      setIsSubmitting(false);
      alert("Registration successful! Welcome aboard.");
      setFormData({
        fullName: "",
        address: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }, 1500);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="service-provider-container">
      <div className="service-provider-form-wrapper">
        <div className="form-header">
          <h1>Become a Service Provider</h1>
          <p>Join our network of professionals and grow your business</p>
        </div>
        
        <form onSubmit={validateForm} className="service-provider-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-container">
              <i className="fas fa-user icon"></i>
              <input 
                type="text" 
                id="fullName" 
                placeholder="Enter your full name" 
                value={formData.fullName} 
                onChange={handleChange} 
                className={errors.fullName ? "error-input" : ""}
              />
            </div>
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-container">
              <i className="fas fa-map-marker-alt icon"></i>
              <input 
                type="text" 
                id="address" 
                placeholder="Enter your address" 
                value={formData.address} 
                onChange={handleChange}
                className={errors.address ? "error-input" : ""}
              />
            </div>
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <i className="fas fa-envelope icon"></i>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className={errors.email ? "error-input" : ""}
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <div className="input-container">
                <i className="fas fa-phone icon"></i>
                <input 
                  type="text" 
                  id="contact" 
                  placeholder="10-digit number" 
                  value={formData.contact} 
                  onChange={handleChange}
                  className={errors.contact ? "error-input" : ""}
                />
              </div>
              {errors.contact && <div className="error-message">{errors.contact}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <i className="fas fa-lock icon"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Create a secure password" 
                value={formData.password} 
                onChange={handleChange}
                className={errors.password ? "error-input" : ""}
              />
              <i 
                className={`password-toggle fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} 
                onClick={() => togglePasswordVisibility('password')}
              ></i>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <i className="fas fa-lock icon"></i>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                className={errors.confirmPassword ? "error-input" : ""}
              />
              <i 
                className={`password-toggle fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} 
                onClick={() => togglePasswordVisibility('confirm')}
              ></i>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Processing...</span>
              </>
            ) : (
              "Register as Service Provider"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderSignUp;