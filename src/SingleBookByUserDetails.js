import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const SingleBookByUserDetails = () => {
    
  const [books, setBooks] = useState([]);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const location = useLocation();
  const navigate = useNavigate();
  const { title,author,grade ,token, bookId} = location.state;


  const DeleteBookHandler= async(e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const response = await axios.delete(`http://localhost:7777/api/books/${bookId}`, {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + token,
          }
        });
        console.log(response)
        if (response) {
          console.log(response);
     
          alert("Book Deleted Successfully")
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error while deleting the book', error);
        alert('Error fetching books');
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    }, 200); // Delay in milliseconds
  };

  return (
    <div>
      <h1>Book Details</h1>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <h3>{grade}</h3>
      <button onClick={DeleteBookHandler}>Delete this book from the list</button>
    </div>
  );
}

export default SingleBookByUserDetails;
