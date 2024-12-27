import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';  // React Router for navigation
import axios from 'axios';
import { FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa'; // React Icons
import GlobalStyles from '../GlobalStyles';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styling


const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const history = useHistory(); // React Router's useHistory for navigation

  // Fetch random message and show toast
  const fetchRandomMessage = async () => {
    try {
      const randomMessageResponse = await axios.get('http://192.168.0.178:5001/random-message');
      const randomMessage = randomMessageResponse.data.message;

      // Show toast message with the random content from the Node.js server
      toast.success(`Welcome! ${randomMessage}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Error fetching random message:', error);
    }
  };

  useEffect(() => {
    fetchRandomMessage();  // Fetch message when page loads
  }, []);

  const handleRegister = async () => {
    // Input validation
    if (!name || !surname || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setError('');  // Clear previous error

    const userData = {
      name,
      surname,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post('/users/create', userData);
      if (response.status === 201) {
        history.push('/welcome'); // Navigate to WelcomePage on success
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong');
      } else {
        setError('No response from server');
      }
      console.error('Error occurred:', error);
    }
  };

  return (
    <div style={GlobalStyles.container}>
      {/* Logo */}
      <div style={GlobalStyles.logoContainer}>
        <img src="/path-to-your-logo.png" alt="Logo" style={GlobalStyles.logo} />
      </div>
      <h2 style={GlobalStyles.title}>Register</h2>

      {/* Error Message */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Name and Surname in Same Row */}
      <div style={GlobalStyles.rowContainer}>
        <div style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
          <FaUser style={GlobalStyles.icon} />
          <input
            type="text"
            style={GlobalStyles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
          />
        </div>
        <div style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
          <FaUser style={GlobalStyles.icon} />
          <input
            type="text"
            style={GlobalStyles.input}
            placeholder="Surname"
            value={surname}
            onChange={(e) => { setSurname(e.target.value); setError(''); }}
          />
        </div>
      </div>

      {/* Phone Number Input */}
      <div style={GlobalStyles.inputContainer}>
        <FaPhone style={GlobalStyles.icon} />
        <input
          type="tel"
          style={GlobalStyles.input}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setError(''); }}
        />
      </div>

      {/* Email Input */}
      <div style={GlobalStyles.inputContainer}>
        <FaEnvelope style={GlobalStyles.icon} />
        <input
          type="email"
          style={GlobalStyles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
        />
      </div>

      {/* Password Input */}
      <div style={GlobalStyles.inputContainer}>
        <FaLock style={GlobalStyles.icon} />
        <input
          type="password"
          style={GlobalStyles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
        />
      </div>

      {/* Confirm Password Input */}
      <div style={GlobalStyles.inputContainer}>
        <FaLock style={GlobalStyles.icon} />
        <input
          type="password"
          style={GlobalStyles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
        />
      </div>

      {/* Register Button */}
      <button style={GlobalStyles.loginButton} onClick={handleRegister}>
        Register
      </button>

      {/* Go Back to Login */}
      <div style={GlobalStyles.registerContainer}>
        <p style={GlobalStyles.registerText}>Already have an account?</p>
        <button onClick={() => history.push('/login')} style={GlobalStyles.registerLink}>
          Log in
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

const styles = {
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
};

export default RegistrationPage;
