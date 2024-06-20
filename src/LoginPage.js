import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css'

const LoginPage = ({ setAuth ,setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAxios = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7777/auth/login', {
        email,
        password,
      });
      console.log(response);
      if (response.data) {
        setAuth(true);
        
    
        setToken(response.data.token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };



  return (
    <div  className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleAxios}>
        <div>
          <label>Email: </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
