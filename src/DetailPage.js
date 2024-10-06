
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/DetailPage.css'; // Import the CSS file here
import BookModel from './Model/BookModel';



const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userid, fullName, email, token } = location.state;

  const [books, setBooks] = useState([]);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleBooks = async (e) => {
    if (e) e.preventDefault();
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
          const data = {
            title: response.data.title,
            author: response.data.author,
            grade: response.data.grade,
            bookId: bookId,
            token: token,
            userid: userid,
            fullName: fullName,
            email: email
          }
          navigate('/Singlebookbyuser',
            { state: data }
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

  useEffect(() => {
    handleBooks(); // Fetch books when the component is mounted     
  }, []); // Empty array to run only once
const handleBooksByIdUser = async (e, bookId) => {
      e.preventDefault();
      setLoading(true); // Start loading
      setTimeout(async () => { // Add a delay before fetching data
        try {
          const response = await axios.get(`http://127.0.0.1:7777/api/pub/book/${bookId}`, {
            headers: {
              'Content-Type': 'text/plain',
              // 'Authorization': 'Bearer ' + userToken,
            }
          });
          if (response.data) {
            console.log(response.data);
            // const arr = response.data.split("*")
            const data =response.data;
            data.bookId=bookId;
            data.owner=true;
            data.token=token;
            data.userid=userid;
            console.log(data.title+"data")
            navigate('/bookdetail',
              { state: data }
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
      <nav className="fixed-nav">

        <div className="user-info">
          <h6>{fullName}</h6>
          <h6>{email}</h6>
        </div>
        <div className="nav-buttons">
          <button onClick={() =>  navigate('/home', { state: JSON.parse(localStorage.getItem('userToken')) })}>Home</button>

          <button onClick={() => navigate('/addBook',
            {
              state:
              {
                token: token,
                userid: userid,
                fullName: fullName,
                email: email
              }
            })}
          >
            Add New Book</button>

        </div>


      </nav>
      {/* <button className="fetch-books-btn" onClick={handleBooks}>Fetch the books</button> */}
      <h1 className="myBooksTitle">My Books</h1>
      {loading ? (
        <div className="spinner"></div> // Display spinner when loading
      ) : bookLoaded && (
        <div className="books-list">

          <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead >
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Title</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Author</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Language</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Grade</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Genre</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Book Detail(Edit)</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>List Book/Delete</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} style={{ '&:nth-child(even)': { backgroundColor: '#f2f2f2' } }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.title}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.author}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.language ? book.language : 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.grade ? book.grade : 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.genre ? book.genre : 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}><a className="customLink" onClick={(e) => handleBooksByIdUser(e, book.id)} >book details</a></td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}><a className="customLink" onClick={(e) => handleBooksById(e, book.id)} >List Book For Public/Delete</a></td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

      )}
    </>
  );
};

export default DetailPage;