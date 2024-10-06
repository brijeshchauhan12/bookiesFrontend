import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AdminPage.css';
import NavigationBar from './Model/NavigationBar';

const AllBooks = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const userBooksData = location.state?.userBooksData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-based.
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
   
  class Book {
    constructor() {
      this.BookID = "";
      this.Author = "";
      this.Created_At = "";
      this.Grade = "";
      this.Title = "";
      this.Updated_At = "";
      this.UserID = "";
      this.Listed = "";
      this.Board = "";
      this.Country = "";
      this.Description = "";
      this.Edition = "";
      this.Genre = "";
      this.Isbn = "";
      this.Language = "";
      this.Pages = "";
      this.Price = "";
      this.Publisher = "";
      this.Quantity = "";
      this.Year = "";
    }
  }
const bookArrays=[];
  for (let i = 0; i < userBooksData.length; i++) {
    const userObj = new Book();
    userObj.BookID = userBooksData[i][0];
    userObj.Author = userBooksData[i][1];
    userObj.Created_At = userBooksData[i][2];
    userObj.Grade = userBooksData[i][3];
    userObj.Title = userBooksData[i][4];
    userObj.Updated_At = userBooksData[i][5];
    userObj.UserID = userBooksData[i][6];
    userObj.Listed = userBooksData[i][7];
    userObj.Board = userBooksData[i][8];
    userObj.Country = userBooksData[i][9];
    userObj.Description = userBooksData[i][10];
    userObj.Edition = userBooksData[i][11];
    userObj.Genre = userBooksData[i][12];
    userObj.Isbn = userBooksData[i][13];
    userObj.Language = userBooksData[i][14];
    userObj.Pages = userBooksData[i][15];
    userObj.Price = userBooksData[i][16];
    userObj.Publisher = userBooksData[i][17];
    userObj.Quantity = userBooksData[i][18];
    userObj.Year = userBooksData[i][19];
    bookArrays.push(userObj);
  }

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    BookID: '',
    Author: '',
    Created_At: '',
    Grade: '',
    Title: '',
    Updated_At: '',
    UserID: '',
    Listed: '',
    Board: '',
    Country: '',
    Description: '',
    Edition: '',
    Genre: '',
    Isbn: '',
    Language: '',
    Pages: '',
    Price: '',
    Publisher: '',
    Quantity: '',
    Year: '',
  });

  useEffect(() => {
    setBooks(bookArrays) // Fetch books on component mount
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredBooks = books.filter(book =>
    Object.entries(filters).every(([key, value]) =>
      !value || book[key].toString().toLowerCase().includes(value.toLowerCase())
    )
  );
  return (
    <div class="table-container">
      <NavigationBar showBookSearch={false} />
      <h2>Book Details</h2>

      <table>
        <thead className="sticky-header">
        <tr>
            {Object.keys(filters).map((key) => (
              <th key={key}>
                {key}
                <input
                  type="text"
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  placeholder={`Filter by ${key}`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {filteredBooks.map((book, index) => (
            <tr key={index}>
              {Object.values(book).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
         
        </tbody>
      </table>

    </div>
  );
};

export default AllBooks;