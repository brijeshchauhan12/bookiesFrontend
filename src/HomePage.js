import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookModel from './Model/BookModel';
import './css/HomePage.css';
import BookSearch from './Model/BookSearch';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const userToken = location.state?.userToken; // Accessing the userToken passed from LoginPage
  // const Token = location.state?.token;
  const [filterByAuthor, setFilterByAuthor] = useState('');
  const [filterByTitle, setFilterByTitle] = useState('');

  const filteredBooks = books.filter(book =>
    book.author.toLowerCase().includes(filterByAuthor.toLowerCase()) &&
    book.title.toLowerCase().includes(filterByTitle.toLowerCase())
  );
  
  if (userToken == undefined) {
    console.log("userToken is undefined");

  }
  // console.log(userToken+"userToken" +Token +"Token");

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Adjust the number of items per page as needed


  // Calculate the indices of the first and last book on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // Slice the books array to only include the books for the current page
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleLogout = () => {

    navigate('/');
  };

  const handleProfileDetails = async (e) => {


    e.preventDefault();


    try {
      const response = await axios.get('http://localhost:7777/users/me',
        {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + userToken,

          }
        });
      console.log(response + "response");
      if (response.data) {

        console.log(response.data);
        console.log(response.data.id);
        console.log(response.data.fullName)


        const userData = {
          userid: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          token: userToken
        }
        navigate('/details', { state: userData });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  }


  const handleListedBooks = async (e, page) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const page = 0; // Example page number
        const size = 10; // Example size
        const response = await axios.get(`http://localhost:7777/api/pub/book?page=${page}&size=${size}`, {
          headers: {
            'Content-Type': 'text/plain'

          }
        });
        console.log(response.data.content);
        if (response.data.content) {
          setBooks(response.data.content);
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
  useEffect(() => {
    handleListedBooks();
  }, []); // The empty array [] means this effect runs only once after the initial render
  useEffect(() => {

    const fetchBooks = async () => {
      const response = await axios.get(`http://localhost:7777/api/pub/book?page=${page}&size=${size}`);
      console.log(page + "page" + size + "size");
      setBooks(response.data.content);
      // Assuming the response directly contains an array of books
    };
    fetchBooks();
  }, [page, size]); // The empty array [] means this effect runs only once after the initial render

  return (
    
    <div>
      
      <nav style={{ marginBottom: '20px' }} >
        <div>
          <h2>Home </h2>
          <p>A reader lives a thousand lives before he dies . . .</p>
        </div>
        
        <div className="nav-buttons">
          <BookSearch userToken={userToken} />
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleProfileDetails}>Your Profile</button>
        </div>
      </nav>
      

  <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead >
      <tr>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Title</th>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Author</th>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Language</th>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Grade</th>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Genre</th>
        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Book Detail</th>
      </tr>
    </thead>
    <tbody>
      {filteredBooks.map((book) => (
        <tr key={book.id}  style={{ '&:nth-child(even)': { backgroundColor: '#f2f2f2' } }}>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.title}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.author}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.language?book.language:'N/A'}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.grade?book.grade:'N/A'}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.genre?book.genre:'N/A'}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}><a className="customLink" onClick={(e) => handleBooksByIdUser(e, book.id)} >book details</a></td>
        </tr>
      ))}
    </tbody>
  </table>
  <div style={{ marginTop: '20px', textAlign: 'center' }}>
    <button onClick={() => setPage(page - 1)} disabled={page === 0} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}>Previous</button>
    <button onClick={() => setPage(page + 1)} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}>Next</button>
  </div>
</div>
    </div>
  );
};

export default HomePage
