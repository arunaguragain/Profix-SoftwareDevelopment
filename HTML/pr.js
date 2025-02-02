// Get references to elements
const forgetPasswordForm = document.getElementById('forgetPasswordForm');
const otpModal = document.getElementById('otpModal');
const passwordModal = document.getElementById('passwordModal');
const messageDiv = document.getElementById('message');

// Simulated backend data for validation
const mockSecurityAnswer = "fluffy"; // Example expected answer
const mockOtp = "123456"; // Example OTP

// Handle form submission
forgetPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve form inputs
    const emailInput = document.getElementById('email').value.trim();
    const securityQuestion = document.getElementById('securityQuestion').value;
    const securityAnswer = document.getElementById('securityAnswer').value.trim();

    // Basic validation: Email is mandatory
    if (!emailInput) {
        messageDiv.textContent = 'Email is required.';
        messageDiv.classList.remove('hidden');
        messageDiv.style.color = 'red';
        return;
    }

    // If the security question is answered, validate it
    if (securityQuestion && securityAnswer) {
        if (securityAnswer.toLowerCase() !== mockSecurityAnswer) {
            messageDiv.textContent = 'The security question answer is incorrect.';
            messageDiv.classList.remove('hidden');
            messageDiv.style.color = 'red';
            return;
        }
    }

    // If validation passes, show OTP modal
    messageDiv.classList.add('hidden');
    otpModal.classList.remove('hidden');
    console.log("OTP Modal displayed");
});

// Handle OTP submission
document.getElementById('otpSubmit').addEventListener('click', function () {
    const enteredOtp = document.getElementById('otp').value.trim();

    // OTP validation
    if (enteredOtp !== mockOtp) {
        alert('Invalid OTP. Please try again.');
        return;
    }

    // If OTP is correct, show Password Reset modal
    otpModal.classList.add('hidden');
    passwordModal.classList.remove('hidden');
    console.log("Password Modal displayed");
});

// Handle password reset submission
document.getElementById('passwordSubmit').addEventListener('click', function () {
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Password validation
    if (!newPassword || !confirmPassword) {
        alert('Both password fields are required.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Success message
    alert('Password has been successfully reset.');
    passwordModal.classList.add('hidden');
});
