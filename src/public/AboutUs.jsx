import React from 'react';
import '../style/aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <div className="header-content">
          <h1>About Profix</h1>
          <p className="header-subtitle">Connecting Homes with Professional Services</p>
        </div>
      </header>

      <nav className="breadcrumb">
        <a href="/" className="breadcrumb-link">Home</a>
        <span className="breadcrumb-separator">/</span>
        <span className="current-page">About Us</span>
      </nav>

      <section className="about-section">
        <div className="about-content">
          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>
              Profix is your trusted platform for booking home repair services, 
              bridging the gap between skilled local service providers and 
              homeowners seeking reliable, efficient solutions.
            </p>
          </div>

          <div className="about-values">
            <h2>What We Stand For</h2>
            <ul>
              <li>
                <strong>Local Empowerment:</strong> We provide a platform for local 
                service professionals to showcase their skills and expand their reach.
              </li>
              <li>
                <strong>Convenience:</strong> Seamless booking of carpentry, 
                plumbing, and electrical services at your fingertips.
              </li>
              <li>
                <strong>Quality Assurance:</strong> Connecting you with vetted, 
                professional service providers you can trust.
              </li>
            </ul>
          </div>

          <div className="about-commitment">
            <h2>Our Commitment</h2>
            <p>
              At Profix, we're more than just a service platform. We're building 
              a community of trusted professionals dedicated to maintaining and 
              improving homes across the region. Your home repair solutions are 
              just a click away!
            </p>
          </div>
        </div>
      </section>

      <section className="service-highlights">
        <h2>Services We Cover</h2>
        <div className="service-icons">
          <div className="service-item">
            <i className="icon-carpentry"></i>
            <span>Carpentry</span>
          </div>
          <div className="service-item">
            <i className="icon-plumbing"></i>
            <span>Plumbing</span>
          </div>
          <div className="service-item">
            <i className="icon-electrical"></i>
            <span>Electrical</span>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <div className="footer-content">
          <p>&copy; 2025 Profix. All rights reserved.</p>
          <div className="footer-links">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;