import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Import Routes and Route components
import './App.css';
import LoginPage from './pages/loginPage';  // Assuming your LoginPage component is in the same directory
import WelcomePage from './pages/welcomePage';  // Assuming you have a WelcomePage
import ForgotPasswordPage from './pages/forgotPasswordPage';  // Ensure correct casing
import RegistrationPage from './pages/registerPage';  // Ensure correct casing

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/register" element={<RegistrationPage />} /> 
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
        </Routes>
      </header>
    </div>
  );
}

export default App;
