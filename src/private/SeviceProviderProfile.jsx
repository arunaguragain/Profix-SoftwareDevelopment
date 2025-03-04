import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import "../style/seviceproviderprofile.css"; // Corrected typo in import

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [historyMessage, setHistoryMessage] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Close notification dropdown when clicking outside
  const closeNotifications = () => {
    if (showNotifications) setShowNotifications(false);
  };

  // Navigate to /deletepopup when delete icon is clicked
  const handleDeleteClick = () => {
    navigate('/deletepopup'); // Navigate to /deletepopup using useNavigate
  };

  return (
    <div className="profile-container" onClick={closeNotifications}>
      {/* Navbar */}
      <nav className="profile-navbar">
        <div className="navbar-left">
          <div className="profile-logo"></div>
          <h1 className="profile-title">Your Profile</h1>
        </div>
        <div className="navbar-right">
          <button 
            className="icon-button notification-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
          >
            <i className="notification-icon">🔔</i>
          </button>
          <button 
            className="icon-button delete-btn"
            onClick={handleDeleteClick} // Attach the delete handler here
          >
            <i className="delete-icon">🗑️</i>
          </button>
        </div>
        {showNotifications && (
          <div className="notification-panel">
            <div className="notification-header">
              <h3>Notifications</h3>
            </div>
            <div className="notification-content">
              <p>No new notifications</p>
            </div>
          </div>
        )}
      </nav>

      {/* Main Layout */}
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div 
              className="profile-photo" 
              style={{ backgroundImage: photo ? `url(${photo})` : "none" }}
            >
              {!photo && <span className="photo-placeholder">+</span>}
              <label className="photo-upload-label">
                <input 
                  type="file" 
                  onChange={handlePhotoUpload} 
                  className="photo-upload-input" 
                  accept="image/*"
                />
              </label>
            </div>
            <div className="profile-info">
              <div className="profile-rating">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span 
                    key={num} 
                    className={`rating-star ${num <= rating ? "active" : ""}`} 
                    onClick={() => setRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">{rating > 0 ? `${rating}.0/5.0` : "Rate Yourself"}</span>
            </div>
          </div>

          <div className="profile-description">
            <h3 className="section-title">About Me</h3>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe your services, experience, and expertise..."
              className="description-textarea"
            ></textarea>
          </div>
        </div>

        {/* Action Panel */}
        <div className="action-panel">
          <div className="action-buttons">
            <button 
              className="action-button history-btn" 
              onClick={() => setHistoryMessage("You have no history records.")}
            >
              <i className="action-icon">⏳</i>
              <span className="action-text">History</span>
            </button>
            
            <button 
              className="action-button appointments-btn" 
              onClick={() => setPendingMessage("No pending appointments.")}
            >
              <i className="action-icon">📅</i>
              <span className="action-text">Appointments</span>
            </button>
            
            <button className="action-button settings-btn">
              <i className="action-icon">⚙️</i>
              <span className="action-text">Settings</span>
            </button>
          </div>

          {historyMessage && (
            <div className="message-panel">
              <h3 className="panel-title">History</h3>
              <p className="panel-message">{historyMessage}</p>
            </div>
          )}
          
          {pendingMessage && (
            <div className="message-panel">
              <h3 className="panel-title">Appointments</h3>
              <p className="panel-message">{pendingMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
