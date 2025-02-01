import React, { useState } from 'react';
import './MainPageS.css'; // Import the CSS file

function MainPage() {
    const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

    const showDeletePopup = () => {
        setDeletePopupVisible(true);
    };

    const hideDeletePopup = () => {
        setDeletePopupVisible(false);
    };

    return (
        <div className="main">
            <div className="content">
                <h1>Locals who nail it every time.</h1>
                <button className="btn1" id="button" onClick={showDeletePopup}>
                    Login
                </button>
            </div>
            <div className="bottom-right">
                <p>Don't have an account? </p>
                <button className="btn" id="button">
                    SignUp
                </button>
            </div>

            {isDeletePopupVisible && (
                <DeletePopup onCancel={hideDeletePopup} />
            )}
        </div>
    );
}

// DeletePopup Component
function DeletePopup({ onCancel }) {
    const handleConfirmDelete = () => {
        alert('Your account will be deleted!'); // Placeholder action
        onCancel();
    };

    return (
        <div className="delete-popup">
            <p>Are you sure you want to delete your account?</p>
            <div className="buttons">
                <button id="confirmDelete" onClick={handleConfirmDelete}>
                    Yes, Delete
                </button>
                <button id="cancelDelete" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default MainPage;
