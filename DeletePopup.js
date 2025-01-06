// Show the deletion confirmation popup
function showDeletePopup() {
    const deletePopup = document.getElementById("deletePopup");
    deletePopup.style.display = "block";
}

// Close the deletion confirmation popup
function closeDeletePopup() {
    const deletePopup = document.getElementById("deletePopup");
    deletePopup.style.display = "none";
}

// Confirm account deletion
document.getElementById("confirmDelete").addEventListener("click", () => {
    alert("Your account will be deleted!"); // Placeholder action
    closeDeletePopup();
    // Add API call here to delete the account from the server
});

// Cancel account deletion
document.getElementById("cancelDelete").addEventListener("click", closeDeletePopup);


fetch('/delete-account', {
    method: 'POST', // Use the appropriate method for your API
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        userId: "12345", // Replace with the user's ID
    }),
})
    .then(response => {
        if (response.ok) {
            alert("Account deleted successfully!");
            // Redirect the user or perform further actions
        } else {
            alert("Failed to delete account. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error deleting account:", error);
        alert("An error occurred. Please try again.");
    });
