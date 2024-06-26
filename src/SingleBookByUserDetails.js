import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const SingleBookByUserDetails = () => {
    
  const [books, setBooks] = useState([]);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const location = useLocation();
  const navigate = useNavigate();
  const { title,author,grade } = location.state;




  return (
    <div>
      <h1>Book Details</h1>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <h3>{grade}</h3>
    </div>
  );
}

export default SingleBookByUserDetails;
