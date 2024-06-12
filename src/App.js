import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/home" element={isAuthenticated ? <HomePage setAuth={setAuth} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
