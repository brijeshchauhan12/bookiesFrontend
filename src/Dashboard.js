import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/dashboard.css';

import axios from 'axios';

const DashboardComponent = ({token,setData}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage and navigate to the login page
//    localStorage.removeItem('accessToken');
    navigate('/');
  };



  const handleProfileDetails=async  (e)=>{


    e.preventDefault();
   

    try {
      const response = await axios.get('http://localhost:7777/users/me',
      {
        headers:{
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+token,
      
        }
      });
      console.log(response);
      if (response.data) {
         setData(response.data);
         navigate('/details');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  }
  

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard! You are successfully logged in.</p>
      <button onClick={handleProfileDetails}>See your profile details</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardComponent;
