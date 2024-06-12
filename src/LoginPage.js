import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAxios = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7777/loginUser', {
        username,
        password,
      });
      console.log(response);
      if (response.data) {
        setAuth(true);
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };
const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:7777/loginUser", {
        
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      console.log("Great worked");
      console.log(response);
      setAuth(true);
      navigate('/home');
    } else {
      setAuth(false);
        console.log("Greate not e worked");
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleAxios}>
        <div>
          <label>Username: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
