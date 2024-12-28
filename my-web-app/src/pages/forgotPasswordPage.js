import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated to useNavigate
import axios from 'axios';
import GlobalStyles from '../GlobalStyles.css';  // Assuming you're using CSS-in-JS or a global CSS file
import './forgotPasswordPage.css';  // Ensure the file is correctly named and located

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Updated to useNavigate

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle sending the reset email to the backend
  const handleSendEmail = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');  // Clear previous error
    setLoading(true);

    try {
      // Make the API call to the backend for password reset
      const response = await axios.post('/users/forgot-password', { email });

      setLoading(false);
      alert(`A password reset link has been sent to ${email}.`);
      navigate('/login');  // Navigate back to the LoginPage after successful reset request
    } catch (error) {
      setLoading(false);
      console.error('Error occurred:', error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="forgot-password-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/path/to/logo.png" alt="Logo" className="logo" />
      </div>
      <h2>Forgot Password</h2>

      {/* Email Input */}
      <div className="input-container">
        <input
          type="email"
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');  // Clear error when user types
          }}
        />
      </div>

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Send Email Button */}
      <button
        className="submit-button"
        onClick={handleSendEmail}
        disabled={loading}
      >
        {loading ? <span>Loading...</span> : 'Send Reset Link'}
      </button>

      {/* Go Back to Login */}
      <div className="register-container">
        <p>Remembered your password?</p>
        <button onClick={() => navigate('/login')} className="link-button">
          Log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
