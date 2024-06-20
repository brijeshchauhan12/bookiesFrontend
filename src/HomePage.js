import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ setAuth ,token,setData}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
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

         console.log(response.data);
         console.log(response.data.id);
         console.log(response.data.fullName)
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
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProfileDetails}>See your profile details</button>
    </div>
  );
};

export default HomePage
