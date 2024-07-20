import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from './OverLayModel'

const BookSearch = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return setResults([]); // Clear results if query is empty
      try {
        const response = await axios.get(`http://localhost:7777/api/pub/book/search?searchText=${query}`);
        console.log(response.data);
        setResults(response.data); // Assuming the API returns an object with a books array
        setIsModalOpen(true); // Show modal with results
      } catch (error) {
        console.error('Failed to fetch books', error);
        setIsModalOpen(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchBooks();
    }, 500); // Delay the search to prevent too many requests

    return () => clearTimeout(delayDebounce); // Cleanup the timeout on component unmount
  }, [query]); // This effect depends on `query`

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(query);
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleChange}
      />
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {results.length > 0 ? (
          <ul>
            {results.map((book) => (
             
              <button onClick={(e) => handleBooksByIdUser(e, book.id)}> 
                <li key={book.id}>{book.title} by {book.author} and grade is  {book.grade} </li>
              </button>
             
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </Modal>
    </div>
  );
};

export default BookSearch;
