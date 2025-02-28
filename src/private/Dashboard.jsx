import React, { useState, useEffect } from 'react';
import '../style/Dashboard.css';

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || 'Guest');
  }, []);

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const navigateToPromotions = () => {
    window.location.href = 'PromoDiscount.html'; // Replace with actual path
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-buttons">
          <h1>Welcome <span id="welcomeName">{userName}</span></h1>

          {/* Notification Button */}
          <div className="notification-wrapper">
            <button className="notification-btn" onClick={toggleNotificationDropdown}>🔔</button>
            {showNotificationDropdown && (
              <div className="notification-dropdown">
                <p>No new notifications</p>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <div className="settings-wrapper">
            <button className="settings-btn" onClick={toggleSettingsDropdown}>⚙️</button>
            {showSettingsDropdown && (
              <div className="settings-dropdown">
                <ul>
                  <li onClick={navigateToPromotions}>Promotions and Discounts</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="buttons">
        <div className="button">
          <button>
            <img src="Search.png.jpg" alt="Search" />
            <p>Search</p>
          </button>
        </div>
        <div className="button">
          <button>
            <img src="Profile.png.jpg" alt="Profile" />
            <p>Profile</p>
          </button>
        </div>
        <div className="button">
          <button>
            <img src="Services.png.png" alt="Services" />
            <p>Services</p>
          </button>
        </div>
        <div className="button">
          <button>
            <img src="QA.png.png" alt="FAQs" />
            <p>FAQs</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
