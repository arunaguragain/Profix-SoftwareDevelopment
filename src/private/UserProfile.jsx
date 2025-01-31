import React, { useState } from "react";
import '../style/UserProfile.css'

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    address: "123 Main Street",
    email: "john.doe@example.com",
    contact: "123-456-7890",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSecurityBoxOpen, setIsSecurityBoxOpen] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [photo, setPhoto] = useState(null);

  // Handle file upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle profile editing
  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setProfile({
      fullName: event.target.fullName.value,
      address: event.target.address.value,
      email: event.target.email.value,
      contact: event.target.contact.value,
    });
    setIsEditing(false);
  };

  // Handle security questions
  const handleSaveSecurityQuestion = (event) => {
    event.preventDefault();
    if (securityQuestion && securityAnswer) {
      alert("Security question saved!");
      setIsSecurityBoxOpen(false);
    } else {
      alert("Please select a question and provide an answer.");
    }
  };

  return (
    <div className="main">
      <nav className="navbar">
        <div className="logo"></div>
        <h1>Your Profile</h1>
        <div className="nav-buttons">
          <button className="notification-btn">🔔</button>
          <div className="notification-dropdown">
            <p>No new notifications</p>
          </div>
        </div>
      </nav>

      <div className="main-layout">
        <div className="content-section">
          <div className="photo-box">
            <label htmlFor="photo-upload" className="photo-upload-label"></label>
            <input
              type="file"
              id="photo-upload"
              className="photo-upload-input"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {photo ? (
              <img src={photo} alt="Preview" className="photo-preview" />
            ) : (
              <span className="no-photo-message">No photo uploaded</span>
            )}
          </div>

          {isEditing ? (
            <div id="profile-edit">
              <form onSubmit={handleSaveProfile}>
                <label>Full Name:</label>
                <input type="text" name="fullName" defaultValue={profile.fullName} required />

                <label>Address:</label>
                <input type="text" name="address" defaultValue={profile.address} required />

                <label>Email:</label>
                <input type="email" name="email" defaultValue={profile.email} required />

                <label>Contact:</label>
                <input type="text" name="contact" defaultValue={profile.contact} required />

                <button type="submit" className="btnedit">Save</button>
                <button type="button" className="btnedit" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div id="profile-view">
              <div className="info">
                <p><strong>Full Name:</strong> {profile.fullName}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Contact:</strong> {profile.contact}</p>
                <button className="btnedit" onClick={handleEdit}>Edit Profile</button>
              </div>
            </div>
          )}
        </div>

        {isSecurityBoxOpen && (
          <div id="security-questions-box">
            <h3>Set Up Security Questions</h3>
            <form onSubmit={handleSaveSecurityQuestion}>
              <label>Choose a question:</label>
              <select value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required>
                <option value="">Select a question</option>
                <option value="pet_name">What is your pet's name?</option>
                <option value="mother_maiden_name">What is your mother's maiden name?</option>
                <option value="birth_city">In which city were you born?</option>
                <option value="favorite_book">What was the name of your favorite book as a child?</option>
                <option value="hospital_name">What is the name of the hospital where you were born?</option>
                <option value="childhood_teacher">What is the name of your childhood teacher?</option>
                <option value="first_school">What is the name of the first school you attended?</option>
                <option value="childhood_friend">What is the name of your childhood friend?</option>
              </select>

              <label>Answer:</label>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter your answer"
                required
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsSecurityBoxOpen(false)}>Cancel</button>
            </form>
          </div>
        )}

        <div className="side-buttons">
          <button className="history-btn">⏳</button>
          <button className="appointments-btn">📅</button>
          <button className="favourite-btn" onClick={() => window.location.href = "fav.html"}>⭐</button>
          <button className="security-questions-btn" onClick={() => setIsSecurityBoxOpen(true)}>❓</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
