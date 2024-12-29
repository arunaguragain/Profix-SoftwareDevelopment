document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("btnedit");
    const cancelEditButton = document.getElementById("cancelEdit");
    const profileView = document.getElementById("profile-view");
    const profileEdit = document.getElementById("profile-edit");
    const editForm = document.getElementById("editForm");

    const fullNameSpan = document.getElementById("fullName");
    const addressSpan = document.getElementById("address");
    const emailSpan = document.getElementById("email");
    const contactSpan = document.getElementById("contact");

    const editFullName = document.getElementById("editFullName");
    const editAddress = document.getElementById("editAddress");
    const editEmail = document.getElementById("editEmail");
    const editContact = document.getElementById("editContact");

    const photoUploadInput = document.getElementById("photo-upload");
    const photoPreview = document.getElementById("photo-preview");
    const noPhotoMessage = document.getElementById("no-photo-message");

    // Populate the form with existing values
    const populateForm = () => {
        editFullName.value = fullNameSpan.textContent;
        editAddress.value = addressSpan.textContent;
        editEmail.value = emailSpan.textContent;
        editContact.value = contactSpan.textContent;
    };

    // Show edit form
    editButton.addEventListener("click", () => {
        populateForm();
        profileView.style.display = "none";
        profileEdit.style.display = "block";
    });

    // Cancel editing
    cancelEditButton.addEventListener("click", () => {
        profileEdit.style.display = "none";
        profileView.style.display = "block";
    });

    // Save changes
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!editFullName.value || !editAddress.value || !editEmail.value || !editContact.value) {
            alert("Please fill in all fields.");
            return;
        }

        fullNameSpan.textContent = editFullName.value;
        addressSpan.textContent = editAddress.value;
        emailSpan.textContent = editEmail.value;
        contactSpan.textContent = editContact.value;

        profileEdit.style.display = "none";
        profileView.style.display = "block";
    });

    // Handle photo upload
    photoUploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = "block";
                noPhotoMessage.style.display = "none";  // Hide no-photo message
            };
            reader.readAsDataURL(file);
        } else {
            photoPreview.style.display = "none";
            noPhotoMessage.style.display = "block";  // Show no-photo message
        }
    });

    // Initial check if no photo is uploaded
    if (!photoPreview.src) {
        noPhotoMessage.style.display = "block";
    }
});
