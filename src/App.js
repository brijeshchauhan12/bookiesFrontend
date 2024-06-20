import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import Signup from './Signup.js';
import AuthChoiceComponent from './LandingPage.js';
import ProtectedRoute from './ProtectedRoute.js';
import DashboardComponent from './Dashboard.js';
function App() {
  const [isAuthenticated, setAuth] = useState(false);
  const [token, setToken]=useState('');
  const [data,setData]=useState(null);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthChoiceComponent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth} setToken={setToken}/>} />
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardComponent token={token} setData={setData}/>
          </ProtectedRoute>
        }
      />
        <Route path="/home" element={isAuthenticated ? <HomePage setAuth={setAuth} token={token} setData={setData}/> : <Navigate to="/" />} />
        <Route path="/details" element={<DetailPage data={data}/>} />
      </Routes>
    </Router>
  );
}

export default App;
