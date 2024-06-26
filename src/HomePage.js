
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = location.state?.userToken; // Accessing the userToken passed from LoginPage

  console.log(userToken+"userToken");
  const handleLogout = () => {

    navigate('/');
  };

  const handleProfileDetails=async  (e)=>{


    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:7777/users/me',
      {
        headers:{
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+userToken,
      
        }
      });
      console.log(response+"response");
      if (response.data) {

         console.log(response.data);
         console.log(response.data.id);
         console.log(response.data.fullName)
 

         const userData={
          userid: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          token: userToken
         }
         navigate('/details', {state:userData});
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  }
  

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProfileDetails}>See your profile details</button>
    </div>
  );
};

export default HomePage