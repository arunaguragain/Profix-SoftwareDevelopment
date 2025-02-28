import React from 'react';
import './ProfixSupport.css';

const ProfixSupport = () => {
    return (
        <div className="support-container">
            <header className="support-header">
                <h1>Welcome to Profix</h1>
                <p>Your trusted partner for home repair services.</p>
            </header>
            <div className="support-content">
                <h2>Real-Time Support</h2>
                <div className="support-box">
                    <h3>Contact Us Anytime</h3>
                    <p><strong>24/7 Helpline:</strong> <a href="tel:+9779856000852">+977 9856000852</a></p>
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/9779856000852" target="_blank" rel="noopener noreferrer">Chat on WhatsApp - 9856000852</a></p>
                    <p><strong>Email:</strong> <a href="mailto:support@profix.com">support@profix.com</a></p>
                    <p>We’re here to help you with quick and reliable responses!</p>
                </div>
            </div>
        </div>
    );
};

export default ProfixSupport;