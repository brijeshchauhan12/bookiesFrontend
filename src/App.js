import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import Signup from './Signup.js';
import AuthChoiceComponent from './LandingPage.js';
import NewBookAddForm from './NewBookAddForm.js';
import SingleBookByUserDetails from './SingleBookByUserDetails.js';
import EmailLinkPage from './SendEmail.js';
import BookDetail from './Model/BookDetail.js';

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  const [token, setToken]=useState('');
  const [data,setData]=useState(null);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthChoiceComponent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage/>} />
        <Route path="/details" element={<DetailPage data={data}/>} />
        <Route path="/addbook" element={<NewBookAddForm />} />
        <Route path="/Singlebookbyuser" element={<SingleBookByUserDetails />} />
        <Route path="/email" element={<EmailLinkPage />} />
        <Route path="/bookdetail" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;