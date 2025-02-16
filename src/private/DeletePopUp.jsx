import React, { useState } from 'react';
import './DeletePopUp.css';

function DeletePopup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showDeletePopup = () => {
    setIsPopupVisible(true);
  };

  const closeDeletePopup = () => {
    setIsPopupVisible(false);
  };

  const confirmDelete = () => {
    alert("Your account will be deleted!"); // Placeholder action
    closeDeletePopup();
    // Add API call here to delete the account from the server
    fetch('/delete-account', {
      method: 'POST', // Use the appropriate method for your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "12345", // Replace with the user's ID
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully!");
          // Redirect the user or perform further actions
        } else {
          alert("Failed to delete account. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <button onClick={showDeletePopup}>Delete Account</button>

      {isPopupVisible && (
        <div className="delete-popup" id="deletePopup">
          <p>Are you sure you want to delete your account?</p>
          <div className="buttons">
            <button id="confirmDelete" onClick={confirmDelete}>Yes, Delete</button>
            <button id="cancelDelete" onClick={closeDeletePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletePopup;
