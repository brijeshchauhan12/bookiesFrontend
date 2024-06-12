import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate('/');
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
