import React, { useState, useEffect } from 'react';
import "../style/dashboard.css"

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || 'Guest');
  }, []);

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    if (showSettingsDropdown) setShowSettingsDropdown(false);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
    if (showNotificationDropdown) setShowNotificationDropdown(false);
  };

  const navigateToPromotions = () => {
    window.location.href = 'PromoDiscount.html'; // Replace with actual path
  };

  const handleButtonHover = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleButtonLeave = () => {
    setActiveButton(null);
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 24 24" className="logo-svg">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" fill="url(#logo-gradient)" />
            </svg>
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3a0ca3" />
                <stop offset="100%" stopColor="#4895ef" />
              </linearGradient>
            </defs>
          </div>
        </div>
        
        <div className="nav-content">
          <div className="welcome-container">
            <h1 className="welcome-text">Welcome, <span className="user-name">{userName}</span></h1>
          </div>
          
          <div className="nav-controls">
            <div className="notification-wrapper">
              <button className="notification-btn" onClick={toggleNotificationDropdown} aria-label="Notifications">
                <svg viewBox="0 0 24 24" className="notification-icon">
                  <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" fill="currentColor" />
                </svg>
                {showNotificationDropdown ? null : <span className="notification-badge">0</span>}
              </button>
              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notifications-list">
                    <div className="empty-notifications">
                      <svg viewBox="0 0 24 24" className="empty-icon">
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" fill="currentColor" />
                      </svg>
                      <p>No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="settings-wrapper">
              <button className="settings-btn" onClick={toggleSettingsDropdown} aria-label="Settings">
                <svg viewBox="0 0 24 24" className="settings-icon">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" fill="currentColor" />
                </svg>
              </button>
              {showSettingsDropdown && (
                <div className="settings-dropdown">
                  <div className="dropdown-header">
                    <h3>Settings</h3>
                  </div>
                  <ul>
                    <li onClick={navigateToPromotions}>
                      <svg viewBox="0 0 24 24" className="menu-icon">
                        <path d="M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.78 12.45,22 13,22C13.55,22 14.05,21.78 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.94 21.41,11.58M5.5,7C4.67,7 4,6.33 4,5.5C4,4.67 4.67,4 5.5,4C6.33,4 7,4.67 7,5.5C7,6.33 6.33,7 5.5,7Z" fill="currentColor" />
                      </svg>
                      Promotions and Discounts
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" className="menu-icon">
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" fill="currentColor" />
                      </svg>
                      Account Settings
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" className="menu-icon">
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" fill="currentColor" />
                      </svg>
                      Preferences
                    </li>
                    <li className="logout-option">
                      <svg viewBox="0 0 24 24" className="menu-icon">
                        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" fill="currentColor" />
                      </svg>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="profile-wrapper">
              <button className="profile-btn" aria-label="Profile">
                <div className="profile-avatar">
                  <svg viewBox="0 0 24 24" className="avatar-icon">
                    <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="section-title">
          <h2>Quick Access</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="buttons">
          <div className="button">
            <button 
              className={`button-card ${activeButton === 'search' ? 'active' : ''}`}
              onMouseEnter={() => handleButtonHover('search')}
              onMouseLeave={handleButtonLeave}
            >
              <div className="button-icon">
                <svg viewBox="0 0 24 24" className="feature-icon">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" fill="currentColor" />
                </svg>
              </div>
              <p>Search</p>
              <div className="button-description">Find services and information</div>
            </button>
          </div>
          
          <div className="button">
            <button 
              className={`button-card ${activeButton === 'profile' ? 'active' : ''}`}
              onMouseEnter={() => handleButtonHover('profile')}
              onMouseLeave={handleButtonLeave}
              onClick={() => window.location.href = '/userprofile'}
            >
              <div className="button-icon">
                <svg viewBox="0 0 24 24" className="feature-icon">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" fill="currentColor" />
                </svg>
              </div>
              <p>Profile</p>
              <div className="button-description">Manage your account details</div>
            </button>
          </div>
          
          <div className="button">
            <button 
              className={`button-card ${activeButton === 'services' ? 'active' : ''}`}
              onMouseEnter={() => handleButtonHover('services')}
              onMouseLeave={handleButtonLeave}
            >
              <div className="button-icon">
                <svg viewBox="0 0 24 24" className="feature-icon">
                  <path d="M16,15H8V5H16M16,1H8A2,2 0 0,0 6,3V17A2,2 0 0,0 8,19H16A2,2 0 0,0 18,17V3A2,2 0 0,0 16,1M19,21H5A2,2 0 0,1 3,19V23H21V19A2,2 0 0,1 19,21Z" fill="currentColor" />
                </svg>
              </div>
              <p>Services</p>
              <div className="button-description">Browse available services</div>
            </button>
          </div>
          
          <div className="button">
            <button 
              className={`button-card ${activeButton === 'faqs' ? 'active' : ''}`}
              onMouseEnter={() => handleButtonHover('faqs')}
              onMouseLeave={handleButtonLeave}
            >
              <div className="button-icon">
                <svg viewBox="0 0 24 24" className="feature-icon">
                  <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" fill="currentColor" />
                </svg>
              </div>
              <p>FAQs</p>
              <div className="button-description">Get answers to common questions</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;