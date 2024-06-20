import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import DetailPage from './DetailPage';

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  const [token, setToken]=useState('');
  const [data,setData]=useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setAuth={setAuth} setToken={setToken}/>} />
        <Route path="/home" element={isAuthenticated ? <HomePage setAuth={setAuth} token={token} setData={setData}/> : <Navigate to="/" />} />
        <Route path="/details" element={<DetailPage data={data}/>} />
      </Routes>
    </Router>
  );
}

export default App;
