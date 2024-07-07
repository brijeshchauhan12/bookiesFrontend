import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/DetailPage.css'; // Import the CSS file here



const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userid, fullName, email, token } = location.state;

  const [books, setBooks] = useState([]);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleBooks = async (e) => {
   e.preventDefault();
   setLoading(true); // Start loading
   setTimeout(async () => { // Add a delay before fetching data
     try {
       const response = await axios.get('http://localhost:7777/api/books', {
         headers: {
           'Content-Type': 'text/plain',
           'Authorization': 'Bearer ' + token,
         }
       });
       if (response.data) {
         setBooks(response.data);
         setBookLoaded(true);
       } else {
         alert('Invalid credentials');
       }
     } catch (error) {
       console.error('Error fetching books', error);
       alert('Error fetching books');
     } finally {
       setLoading(false); // Stop loading regardless of the outcome
     }
   }, 200); // Delay in milliseconds
 };

 const handleBooksById = async (e, bookId) => {
   e.preventDefault();
   setLoading(true); // Start loading
   setTimeout(async () => { // Add a delay before fetching data
     try {
       const response = await axios.get(`http://localhost:7777/api/books/${bookId}`, {
         headers: {
           'Content-Type': 'text/plain',
           'Authorization': 'Bearer ' + token,
         }
       });
       if (response.data) {
         console.log(response.data);
         const data={
            title: response.data.title,  
            author: response.data.author,
            grade: response.data.grade,
            bookId:bookId,
            token:token,
            userid:userid,
            fullName:fullName,
            email:email
         }
        navigate('/Singlebookbyuser', 
              { state: data}
              )
       } else {
         alert('Invalid credentials');
       }
     } catch (error) {
       console.error('Error fetching books', error);
       alert('Error fetching books');
     } finally {
       setLoading(false); // Stop loading regardless of the outcome
     }
   }, 200); // Delay in milliseconds
 };

  return (
    <>
      <div className="user-info">
        <h6>{fullName}</h6>
        <h6>{email}</h6>
      </div>
      <button onClick={() => navigate('/addBook',
         {state:
            {token:token,
            userid:userid,
            fullName:fullName,
            email:email
            }})}
         >
         Add New Book</button>
      <button className="fetch-books-btn" onClick={handleBooks}>Fetch the books</button>
      {loading ? (
        <div className="spinner"></div> // Display spinner when loading
      ) : bookLoaded && (
        <div className="books-list">
          <h1>Books</h1>
          <ul>
            {books.map((book) => (
             
              <div key={book.id} className="book-item" onClick={(e)=>handleBooksById(e,book.id)}>
                <li>{book.title}</li>
                <li>{book.author}</li>
                <li>{book.grade}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DetailPage;