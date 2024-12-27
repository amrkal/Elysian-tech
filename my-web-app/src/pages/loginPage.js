import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from 'react-icons/md'; // Use react-icons for icons
import { ToastContainer, toast } from 'react-toastify'; // For toasts
import 'react-toastify/dist/ReactToastify.css'; // For toast styling
import GlobalStyles from '../GlobalStyles'; // Assuming you are using CSS-in-JS or a global CSS file


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError('');  // Clear any previous error
    const userData = { email, password };

    try {
      const response = await axios.post('/users/login', userData); // Assuming you have a login route
      if (response.status === 200) {
        navigate.push('/welcome'); // Navigate to the WelcomePage on successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Login failed'); // Show error toast
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('/auth/login/google');
      console.log('Google Login successful:', response.data);
      navigate.push('/welcome');
    } catch (error) {
      console.error('Google Login failed:', error);
      toast.error('Google Login failed');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await axios.get('/auth/login/facebook');
      console.log('Facebook Login successful:', response.data);
      navigate.push('/welcome');
    } catch (error) {
      console.error('Facebook Login failed:', error);
      toast.error('Facebook Login failed');
    }
  };

  return (
    <div style={GlobalStyles.container}>
      <div style={GlobalStyles.logoContainer}>
        <img src="/path-to-your-logo.png" alt="Logo" style={GlobalStyles.logo} />
      </div>

      <h1 style={GlobalStyles.title}>Log in</h1>

      {/* Email Input */}
      <div style={GlobalStyles.inputContainer}>
        <Icon name="email" size={20} style={GlobalStyles.icon} />
        <input
          type="email"
          style={GlobalStyles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password Input */}
      <div style={GlobalStyles.inputContainer}>
        <Icon name="lock" size={20} style={GlobalStyles.icon} />
        <input
          type={passwordVisible ? 'text' : 'password'}
          style={GlobalStyles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => setPasswordVisible(!passwordVisible)}
          style={GlobalStyles.icon}>
          <Icon name={passwordVisible ? 'visibility-off' : 'visibility'} size={20} />
        </button>
      </div>

      {/* Forgot Password */}
      <button onClick={() => navigate.push('/forgot-password')} style={GlobalStyles.forgotPassword}>
        Forgot password?
      </button>

      {/* Login Button */}
      <button style={GlobalStyles.loginButton} onClick={handleLogin}>
        Log in
      </button>

      {/* Or Divider */}
      <div style={GlobalStyles.dividerContainer}>
        <div style={GlobalStyles.divider}></div>
        <p style={GlobalStyles.orText}>Or</p>
        <div style={GlobalStyles.divider}></div>
      </div>

      {/* Social Buttons */}
      <div style={GlobalStyles.socialContainer}>
        <button style={GlobalStyles.socialButton} onClick={handleGoogleLogin}>
          <img src="/google-icon.png" alt="Google" style={GlobalStyles.socialIcon} />
          Google
        </button>

        <button style={GlobalStyles.socialButton} onClick={handleFacebookLogin}>
          <img src="/facebook-icon.png" alt="Facebook" style={GlobalStyles.socialIcon} />
          Facebook
        </button>
      </div>

      {/* Register */}
      <p style={GlobalStyles.registerText}>Have no account yet?</p>
      <div style={GlobalStyles.registerContainer}>
        <button style={GlobalStyles.loginButton} onClick={() => navigate.push('/register')}>
          Register
        </button>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
