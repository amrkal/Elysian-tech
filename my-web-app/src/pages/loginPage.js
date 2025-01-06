import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../services/axiosInstance'; // Adjust path as needed

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for displaying error messages

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission reloading the page

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    
    const userData = { email, password };

    try {
      const response = await axiosInstance.post('/users/login', userData);
      console.log('Login successful:', response.data);

      if (response.status === 200) {
        navigate('/welcome'); // Navigate to the Welcome page
      }
    } catch (error) {
      // Capture and display backend error messages
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axiosInstance.get('/auth/login/google');
      console.log('Google Login successful:', response.data);
      navigate('/welcome');
    } catch (error) {
      console.error('Google Login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await axiosInstance.get('/auth/login/facebook');
      console.log('Facebook Login successful:', response.data);
      navigate('/welcome');
    } catch (error) {
      console.error('Facebook Login failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo">
          <img src="/Logo.png" alt="Logo" />
        </div>
        <div className="illustration">
          <img src="/15.png" alt="Illustration" />
        </div>
        <div className="main-text">
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>

      <div className="right-section">
        <form className="form-container" onSubmit={handleLogin}>
          <h2>Log in</h2>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          <div className="input-field">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <div className="input-icon">
              <img src="/icon-email.png" alt="Email icon" />
            </div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password" className="visually-hidden">Password</label>
            <div className="input-icon">
              <img src="/icon-lock.png" alt="Lock icon" />
            </div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => {
                const passField = document.getElementById('password');
                passField.type = passField.type === 'password' ? 'text' : 'password';
              }}
            >
              <img src="/icon-eye.png" alt="Show/Hide Password" />
            </button>
          </div>

          <div className="forgot-password">
            <a href="#!" onClick={() => navigate('/forgot-password')}>Forgot password?</a>
          </div>

          <button type="submit" className="btn primary-btn">
            Log in
          </button>

          <div className="separator">
            <div className="line"></div>
            <span>Or</span>
            <div className="line"></div>
          </div>

          <div className="social-buttons">
            <button
              type="button"
              className="btn google-btn"
              onClick={handleGoogleLogin}
            >
              <img src="/Google.png" alt="Google icon" />
              Google
            </button>
            <button
              type="button"
              className="btn facebook-btn"
              onClick={handleFacebookLogin}
            >
              <img src="/Facebook.png" alt="Facebook icon" />
              Facebook
            </button>
          </div>

          <div className="register">
            <span>Have no account yet?</span>
            <button
              type="button"
              className="btn register-btn"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
