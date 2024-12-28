import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast styling
import GlobalStyles from '../GlobalStyles.css'; // Assuming you are using CSS-in-JS or a global CSS file

const WelcomePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation (useNavigate instead of useHistory)

  // Fetch random message and show toast
  const fetchRandomMessage = async () => {
    try {
      // Fetch random message from Node.js server
      const randomMessageResponse = await axios.get('http://192.168.0.178:5001/random-message');
      const randomMessage = randomMessageResponse.data.message;

      // Show toast message with the random content from the Node.js server
      toast.success(`Welcome! ${randomMessage}`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Error fetching random message:', error);
      toast.error('Error fetching random message', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchRandomMessage();  // Fetch message when page loads
  }, []);  // Empty dependency array means it will only run once when the page loads

  return (
    <div style={GlobalStyles.container}>
      <h1 style={GlobalStyles.title}>Welcome!</h1>
      <p style={GlobalStyles.message}>
        You have successfully registered. Start exploring the app now.
      </p>

      {/* Go to Home or Login */}
      <button
        style={GlobalStyles.loginButton}
        onClick={() => navigate('/login')} // Use navigate instead of history.push
      >
        Go to Login
      </button>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default WelcomePage;
