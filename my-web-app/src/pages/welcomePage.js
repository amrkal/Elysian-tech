import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance2 } from '../services/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './welcomePage.css';

const WelcomePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRandomMessage = async () => {
    try {
      const response = await axiosInstance2.get('/random-message');
      const randomMessage = response.data.message || 'Hello from the server!';
      toast.success(randomMessage, {
        position: 'bottom-center',
        autoClose: 3000,
        toastClassName: 'custom-toast', // Custom class for styling
        bodyClassName: 'custom-toast-body', // Custom class for body
        hideProgressBar: true,
        closeOnClick: true,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error('Error fetching random message', {
        position: 'bottom-center',
        autoClose: 3000,
        toastClassName: 'error-toast', // Custom class for error toast
      });
    }
  };

  useEffect(() => {
    fetchRandomMessage();
  }, []);

  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      <p>You have successfully registered. Start exploring the app now.</p>

      <button className="btn primary-btn" onClick={() => navigate('/')}>
        Go to Login
      </button>

      {error && <p className="error-text">{error}</p>}

      <ToastContainer />
    </div>
  );
};

export default WelcomePage;
