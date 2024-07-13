
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const userToken = location.state?.userToken; // Accessing the userToken passed from LoginPage
  // const Token = location.state?.token;
  if(userToken == undefined){
    console.log("userToken is undefined");

  }
  // console.log(userToken+"userToken" +Token +"Token");
  const handleLogout = () => {

    navigate('/');
  };

  const handleProfileDetails=async  (e)=>{


    e.preventDefault();
    
 
    try {
      const response = await axios.get('http://localhost:7777/users/me',
      {
        headers:{
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+userToken,
      
        }
      });
      console.log(response+"response");
      if (response.data) {

         console.log(response.data);
         console.log(response.data.id);
         console.log(response.data.fullName)
 

         const userData={
          userid: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          token: userToken
         }
         navigate('/details', {state:userData});
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  }
  

  const handleListedBooks = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const response = await axios.get('http://localhost:7777/api/pub/book', {
          headers: {
            'Content-Type': 'text/plain'

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

  const handleBooksByIdUser = async (e, bookId) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const response = await axios.get(`http://127.0.0.1:7777/api/pub/user/${bookId}`, {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + userToken,
          }
        });
        if (response.data) {
          console.log(response.data);
          const data={
             title: response.data.title,  
             author: response.data.author,
             grade: response.data.grade,
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
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProfileDetails}>See your profile details</button>
      <button className="fetch-books-btn" onClick={handleListedBooks}>Fetch all the listed books</button>
      {loading ? (
        <div className="spinner"></div> // Display spinner when loading
      ) : bookLoaded && (
        <div className="books-list">
          <h1>Books</h1>
          <ul>
            {books.map((book) => (
             
              <div key={book.id} className="book-item" onClick={(e)=>handleBooksByIdUser(e,book.id)}>
                <li>{book.title}</li>
                <li>{book.author}</li>
                <li>{book.grade}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage