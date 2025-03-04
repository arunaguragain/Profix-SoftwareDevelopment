import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Fetch user profile including profile picture
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
        setProfile({
          ...res.data,
          photo: res.data.profilePicture
            ? `http://localhost:5001/${res.data.profilePicture.replace(/\\/g, "/")}`
            : "",
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [token, navigate]);

 
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await axios.put(
        "http://localhost:5001/users/profile/Picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update profile with new image URL
      setProfile((prevProfile) => ({
        ...prevProfile,
        photo: `http://localhost:5001/${response.data.profilePictureUrl.replace(/\\/g, "/")}`,
      }));
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  // ✅ Save profile changes (name, email, etc.)
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/userLogin");
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:5001/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/userRegistration");
       window.location.reload();
    } catch (err) {
      console.error("Error deleting account:", err);
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
                alt="Profile"
                className="photo-preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <p>No Profile Picture</p>
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
          <button className="appointments-btn"onClick={() => { navigate("/Myappointment");
          setTimeout(() => {
          window.location.reload();
          }, 100); // Delay to allow navigation to take effect
          }}>📅</button>
          <button className="favourite-btn" onClick={() => navigate("/favorites") }>⭐</button>
          <button className="logout-btn btn btn-light" onClick={() => setShowLogoutModal(true)}>
            <i className="bi bi-box-arrow-right"></i>
          </button>
          <button className="delete-btn btn btn-light" onClick={() => setShowDeleteModal(true)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

     {/* Logout Confirmation Modal */}
<div className={`modal fade ${showLogoutModal ? "show d-block" : ""}`} tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content custom-modal">
      <div className="modal-header">
        <h5 className="modal-title">Confirm Logout</h5>
        <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to log out?</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </div>
</div>

{/* Delete Account Confirmation Modal */}
<div className={`modal fade ${showDeleteModal ? "show d-block" : ""}`} tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content custom-modal">
      <div className="modal-header">
        <h5 className="modal-title">Confirm Deletion</h5>
        <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default UserProfile;
