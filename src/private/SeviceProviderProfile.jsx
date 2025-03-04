import React, { useState } from "react";
import "../style/SeviceProviderProfile.css"; // Import CSS file

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [historyMessage, setHistoryMessage] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"></div>
        <h1>Your Profile</h1>
        <div className="nav-buttons">
          <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>🔔</button>
          <button className="delete-btn">🗑️</button>
        </div>
        {showNotifications && <div className="notification-dropdown">No new notifications</div>}
      </nav>

      {/* Main Layout */}
      <div className="main-layout">
        <div className="content-section">
          {/* Photo Upload */}
          <div className="photo-box" style={{ backgroundImage: photo ? `url(${photo})` : "none" }}>
            <label className="photo-upload-label">
              Upload Photo
              <input type="file" onChange={handlePhotoUpload} className="photo-upload-input" />
            </label>
          </div>

          {/* Rating System */}
          <div className="rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} className={num <= rating ? "active" : ""} onClick={() => setRating(num)}>★</span>
            ))}
          </div>

          {/* Description Box */}
          <div className="description-box">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here..."></textarea>
          </div>
        </div>

        {/* Side Buttons */}
        <div className="side-buttons">
          <button onClick={() => setHistoryMessage("You have no history records.")}>⏳</button>
          <button onClick={() => setPendingMessage("No pending appointments.")}>📅</button>

          {historyMessage && <div className="message-container">{historyMessage}</div>}
          {pendingMessage && <div className="message-container">{pendingMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
