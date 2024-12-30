document.addEventListener('DOMContentLoaded', function () {
    const photoUploadInput = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const noPhotoMessage = document.getElementById('no-photo-message');
    const btnEdit = document.getElementById('btnedit');
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    const cancelEdit = document.getElementById('cancelEdit');
    const editForm = document.getElementById('editForm');
    const securityQuestionsBox = document.getElementById('security-questions-box');
    const securityQuestionsBtn = document.getElementById('security-questions-btn');
    const cancelSecurityQuestion = document.getElementById('cancel-security-question');
    const saveSecurityQuestion = document.getElementById('save-security-question');

    // Handle photo upload preview
    photoUploadInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                noPhotoMessage.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Toggle profile edit form
    btnEdit.addEventListener('click', function () {
        profileView.style.display = 'none';
        profileEdit.style.display = 'block';

        // Populate form fields with current profile data
        document.getElementById('editFullName').value = document.getElementById('fullName').textContent;
        document.getElementById('editAddress').value = document.getElementById('address').textContent;
        document.getElementById('editEmail').value = document.getElementById('email').textContent;
        document.getElementById('editContact').value = document.getElementById('contact').textContent;
    });

    // Handle saving edited profile
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Update profile information
        document.getElementById('fullName').textContent = document.getElementById('editFullName').value;
        document.getElementById('address').textContent = document.getElementById('editAddress').value;
        document.getElementById('email').textContent = document.getElementById('editEmail').value;
        document.getElementById('contact').textContent = document.getElementById('editContact').value;

        // Hide edit form and show profile view
        profileEdit.style.display = 'none';
        profileView.style.display = 'block';
    });

    // Cancel edit profile
    cancelEdit.addEventListener('click', function () {
        profileEdit.style.display = 'none';
        profileView.style.display = 'block';
    });

    // Show security questions form
    securityQuestionsBtn.addEventListener('click', function () {
        securityQuestionsBox.style.display = 'block';
    });

    // Cancel security question setup
    cancelSecurityQuestion.addEventListener('click', function () {
        securityQuestionsBox.style.display = 'none';
    });

    // Save security question
    saveSecurityQuestion.addEventListener('click', function (event) {
        event.preventDefault();

        const question = document.getElementById('security-question').value;
        const answer = document.getElementById('security-answer').value;

        if (question && answer) {
            alert('Security question saved!');
            securityQuestionsBox.style.display = 'none';
        } else {
            alert('Please select a question and provide an answer.');
        }
    });
});
