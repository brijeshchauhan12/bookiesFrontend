import React from 'react';
import { useNavigate } from 'react-router-dom';

import './css/LandingPage.css'
const AuthChoiceComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-choice-container">
      <h2>Welcome</h2>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default AuthChoiceComponent;