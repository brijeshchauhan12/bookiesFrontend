import React from 'react';
import { useNavigate } from 'react-router-dom';


import './css/LandingPage.css'
const AuthChoiceComponent = () => {
  const navigate = useNavigate();

  return (
<div className="auth-choice-container">
  <h2>Welcome</h2>
  <button 
    className="auth-button" 
    onClick={() => navigate('/login')}
    style={{ fontSize: '14px', padding: '8px 16px' }} /* Inline styles for further adjustments */
  >
    Login
  </button>
  <button 
    className="auth-button" 
    onClick={() => navigate('/signup')}
    style={{ fontSize: '14px', padding: '8px 16px' }} /* Inline styles for further adjustments */
  >
    Sign Up
  </button>
</div>
  );
};

export default AuthChoiceComponent;