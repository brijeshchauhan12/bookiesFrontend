import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookModel from './Model/BookModel';
import './css/HomePage.css';
import BookSearch from './Model/BookSearch';
// import { set } from 'react-datepicker/dist/date_utils';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const userToken = location.state?.userToken; // Accessing the userToken passed from LoginPage
  const roles = location.state?.roles; // Accessing the roles passed from LoginPage
  const [filterByAuthor, setFilterByAuthor] = useState('');
  const [filterByTitle, setFilterByTitle] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    language: '',
    grade: '',
    genre: '',
  });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleChangeHome = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };


  useEffect(() => {
    const fetchBooksInHomePage = async () => {
      if (!query) return setResults([]); // Clear results if query is empty
      setLoading(true); // Start loading
      setTimeout(async () => { // Add setTimeout to simulate network delay
        try {
          const response = await axios.get(`http://localhost:7777/api/pub/book/search?searchText=${query}`);
          console.log(response.data);
          setBooks(response.data); // Assuming the API returns an object with a books array
          // setIsModalOpen(true); // Show modal with results
        } catch (error) {
          console.error('Failed to fetch books', error);
          // setIsModalOpen(false);
        } finally {
          setLoading(false); // Stop loading regardless of the outcome
        }
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    };

    const delayDebounce = setTimeout(() => {
      fetchBooksInHomePage();
    }, 500); // Delay the search to prevent too many requests
   
    return () => clearTimeout(delayDebounce); // Cleanup the timeout on component unmount
  }, [query]); // This effect depends on `query`

  console.log(roles + "roles");

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(50); // Adjust the number of items per page as needed


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


  const AdminPage = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {

        const response = await axios.get(`http://localhost:7777/admin/allUsers`, {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + userToken,
          }
        });
        console.log(response);
        if (response) {
          console.log(response.data);
          const userData = {
            userData: response.data,
            userToken: userToken
          };
          navigate('/admin', { state: userData });
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error fetching UserDetails', error);
        alert('Error fetching UserDetails or going to admin page');
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    }, 200); // Delay in milliseconds
  };

  const handleProfileDetails = async (e) => {


    e.preventDefault();

    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
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
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    }, 200); // Delay in milliseconds
  }


  const handleListedBooks = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        // const page = 0; // Example page number
        // const size = 50; // Example size
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
          const data = response.data;
          data.bookId = bookId;

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterBooks = () => {
      const filtered = books.filter(book =>
        (filters.title ? book.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true) &&
        (filters.language ? book.language.toLowerCase().includes(filters.language.toLowerCase()) : true) &&
        (filters.grade ? book.grade === filters.grade : true) &&
        (filters.genre ? book.genre.toLowerCase().includes(filters.genre.toLowerCase()) : true)
      );
      setFilteredBooks(filtered);

    };
    // console.log(filters)
    filterBooks();
  }, [filters, books]);

  useEffect(() => {
    handleListedBooks();
    setFilteredBooks(books)

  }, []); // The empty array [] means this effect runs only once after the initial render


  useEffect(() => {

    const fetchBooks = async () => {
      const response = await axios.get(`http://localhost:7777/api/pub/book?page=${page}&size=${size}`);
      console.log(page + "page" + size + "size");
      setBooks(response.data.content);
      setFilteredBooks(books);
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
          <p>{roles === '*ROLE_ADMIN' && <button onClick={AdminPage}>Admin Page</button>}</p>
        </div>

        <div className="nav-buttons">
          {/* <BookSearch userToken={userToken} /> */}
          <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleChangeHome}
      />
          <button onClick={handleLogout}>Logout</button>
          {loading ? <button>Loading...</button> : <button onClick={handleProfileDetails}>Your Profile</button>}
        </div>

      </nav>


      <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>

        <div style={{ display: 'flex', width: '100%', marginBottom: '8px' }}>
          <div style={{ flex: '1', padding: '8px', border: '1px solid #ddd' }}>
            <input style={{ width: '100%', boxSizing: 'border-box' }} name="title" placeholder="Filter by Title" 
            onChange={handleFilterChange} />
          </div>
          <div style={{ flex: '1', padding: '8px', border: '1px solid #ddd' }}>
            <input style={{ width: '100%', boxSizing: 'border-box' }} name="author" placeholder="Filter by Author" onChange={handleFilterChange} />
          </div>
          <div style={{ flex: '1', padding: '8px', border: '1px solid #ddd' }}>
            <input style={{ width: '100%', boxSizing: 'border-box' }} name="language" placeholder="Filter by Language" onChange={handleFilterChange} />
          </div>
          <div style={{ flex: '1', padding: '8px', border: '1px solid #ddd' }}>
            <input style={{ width: '100%', boxSizing: 'border-box' }} name="grade" placeholder="Filter by Grade" onChange={handleFilterChange} />
          </div>
          <div style={{ flex: '1', padding: '8px', border: '1px solid #ddd' }}>
            <input style={{ width: '100%', boxSizing: 'border-box' }} name="genre" placeholder="Filter by Genre" onChange={handleFilterChange} />
          </div>
        </div>
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
            {loading?<div className="loader"></div>:filteredBooks.map((book) => (
              <tr key={book.id} style={{ '&:nth-child(even)': { backgroundColor: '#f2f2f2' } }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.author}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.language ? book.language : 'N/A'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.grade ? book.grade : 'N/A'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}> {book.genre ? book.genre : 'N/A'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{loading ? <p>Loading</p> : <a className="customLink" onClick={(e) => handleBooksByIdUser(e, book.id)} >book details</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 0} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: page===0?'white':'green', border: '1px solid #ddd', borderRadius: '5px' }}>Previous</button>
          <button onClick={() => setPage(page + 1)} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'green ', border: '1px solid #ddd', borderRadius: '5px' }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage
