import React, { useState } from 'react';
import '../style/PasswordRecovery.css'


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Simulated backend data for validation
  const mockSecurityAnswer = "fluffy"; // Example expected answer
  const mockOtp = "123456"; // Example OTP

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Email is mandatory
    if (!email.trim()) {
      setMessage('Email is required.');
      return;
    }

    // If the security question is answered, validate it
    if (securityQuestion && securityAnswer.trim()) {
      if (securityAnswer.trim().toLowerCase() !== mockSecurityAnswer) {
        setMessage('The security question answer is incorrect.');
        return;
      }
    }

    // If validation passes, show OTP modal
    setMessage('');
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    if (otp.trim() !== mockOtp) {
      alert('Invalid OTP. Please try again.');
      return;
    }

    // If OTP is correct, show Password Reset modal
    setShowOtpModal(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
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
    setShowPasswordModal(false);
  };

  return (
    <div className="container">
      <div className="picture"></div>
      <h2>Forgot Your Password?</h2>
      <p>Enter your registered email address to reset your password. Answering the security question is optional.</p>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input className='pr'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="securityQuestion">Security Question (Optional):</label>
          <select
            id="securityQuestion"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
          >
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
        </div>
        <div className="form-group">
          <label htmlFor="securityAnswer">Answer (Optional):</label>
          <input className='pr'
            type="text"
            id="securityAnswer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
      {message && <div id="message" style={{ color: 'red' }}>{message}</div>}

      {/* OTP Modal */}
      {showOtpModal && (
        <div id="otpModal" className="modal">
          <h2>Enter OTP</h2>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <br />
          <button onClick={handleOtpSubmit} className="btn">Submit OTP</button>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div id="passwordModal" className="modal">
          <h2>Reset Password</h2>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <br />
          <button onClick={handlePasswordSubmit} className="btn">Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
