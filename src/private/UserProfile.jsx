import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    email: "",
    contact: "",
    photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch user profile on component mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5001/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Ensure profile.photo has the correct full URL
        const updatedProfile = {
          ...res.data,
          photo: res.data.photo
            ? `http://localhost:5001/uploads/${res.data.photo}`
            : "",
        };
        setProfile(updatedProfile);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [token, navigate]);

  // Handle Profile Picture Upload
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file); // Ensure this matches backend field name

    try {
      const res = await axios.put("http://localhost:5001/users/profile/picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Success:", res.data);

      // Ensure the backend response includes the correct full image URL
      setProfile((prevProfile) => ({
        ...prevProfile,
        photo: `http://localhost:5001/uploads/${res.data.profilePictureUrl}`,
      }));
    } catch (err) {
      console.error("Error uploading photo:", err.response ? err.response.data : err.message);
    }
  };

  // Enable Edit Mode
  const handleEdit = () => setIsEditing(true);

  // Cancel Edit Mode
  const handleCancelEdit = () => setIsEditing(false);

  // Save Profile Changes
  const handleSaveProfile = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        fullName: event.target.fullName.value,
        address: event.target.address.value,
        email: event.target.email.value,
        contact: event.target.contact.value,
      };

      await axios.put("http://localhost:5001/users/profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile((prevProfile) => ({ ...prevProfile, ...updatedData }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="main">
      <nav className="navbar">
        <div className="logo"></div>
      </nav>
      <div className="main-layout">
        <div className="content-section">
          <div className="photo-box">
            <input
              type="file"
              id="photo-upload"
              className="photo-upload-input"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile Preview"
                className="photo-preview"
                onError={(e) => (e.target.style.display = "none")} // Hide if image fails to load
              />
            ) : (
              <p></p>
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
                <button type="button" className="btnedit" onClick={handleCancelEdit}>Cancel</button>
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
        <div className="side-buttons">
          <button className="history-btn">⏳</button>
          <button className="appointments-btn">📅</button>
          <button className="favourite-btn" onClick={() => navigate("/favorites")}>⭐</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
