import React, { useEffect } from 'react';
import './BookDetail.css'; // Import the CSS file here
import { useNavigate, useLocation } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import NavigationBar from './NavigationBar';
const BookDetail = () => {
  const location = useLocation();
  const { title, author, genre, country, edition, description, isbn, language, year, pages, publisher, publicationDate, quantity, price, bookId, owner, board, grade, token, userid } = location.state;
  // const token=JSON.parse(localStorage.getItem('userToken'));
  // Initialize state for each book attribute
  const [Title, setTitle] = useState(title);
  const [Genre, setGenre] = useState(genre);
  const [Country, setCountry] = useState(country);
  const [Edition, setEdition] = useState(edition);
  const [Description, setDescription] = useState(description);
  const [Isbn, setIsbn] = useState(isbn);
  const [Language, setLanguage] = useState(language);
  const [Year, setYear] = useState(year);
  const [Pages, setPages] = useState(pages);
  const [Publisher, setPublisher] = useState(publisher);
  const [PublicationDate, setPublicationDate] = useState(publicationDate);
  const [Quantity, setQuantity] = useState(quantity);
  const [Price, setPrice] = useState(price);
  const [Author, setAuthor] = useState(author);
  const [Board, setBoard] = useState(board);
  const [Grade, setGrade] = useState(grade);
  const [userDetailGo,setUserDetailGo]=useState(false);



  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleBooksByIdUser = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const response = await axios.get(`http://127.0.0.1:7777/api/pub/user/${bookId}`, {
          headers: {
            'Content-Type': 'text/plain',
            // 'Authorization': 'Bearer ' + userToken,
          }
        });
        if (response.data) {
          console.log(response.data);
          // const arr = response.data.split("*")
          const data = response.data;
          const datas = data.split("*");
          console.log(datas[0] + "data")
          const DatasObj = { email: datas[0], fullName: datas[1],userId:datas[2] }
          navigate('/email',
            { state: DatasObj }
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




  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = Title;
    const genre = Genre;
    const country = Country;
    const edition = Edition;
    const description = Description;
    const isbn = Isbn;
    const language = Language;
    const year = Year;
    const pages = Pages;
    const publisher = Publisher;
    const publicationDate = PublicationDate;
    const quantity = Quantity;
    const price = Price;
    const author = Author;
    const board = Board;
    const grade = Grade;
    console.log(`Title: ${title}, Author: ${author} , Genre: ${genre}, Country: ${country}, Edition: ${edition}, Description: ${description}, ISBN: ${isbn}, Language: ${language}, Year: ${year}, Pages: ${pages}, Publisher: ${publisher}, Publication Date: ${publicationDate}, Quantity: ${quantity}, Price: ${price}`);


    setLoading(true); // Start loading
    setTimeout(async () => { // Add a delay before fetching data
      try {
        const response = await axios.put(`http://localhost:7777/api/books/updatebookdetails/${bookId}`,
          {
            // // Book data to be updated
            // title: "New Title",
            // author: "New Author",
            // grade: "A",
            // userId: 1 // Example userId, ensure this is correct
            title, author, genre, country, edition, description, isbn, language,
            year, pages, publisher, publicationDate, quantity, price, board, grade,userid
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          });
        console.log(response);
        if (response) {
          console.log(response);

          alert("Book Updated SuccessFully")
          setUserDetailGo(true)
 

        } else {
          alert('Invalid credentials');
        }
      } catch (error) {

      console.log('Error adding book', error.response.status);
      // console.error("Error updating book:", error.response ? error.response.data : error.message);
      alert("Failed to update book: " + (error.response.status ? error.response.data : error.message));

      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    }, 200); // Delay in milliseconds
  };

  const handleProfileDetails = async () => {




    try {
      const response = await axios.get('http://localhost:7777/users/me',
        {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + token,

          }
        });
      console.log(response + "response");
      if (response.data) {


        const userData = {
          userid: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          token: token
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

  useEffect(() => {
    if (userDetailGo === true) {
      handleProfileDetails();
    }
  }, [userDetailGo]);

  return (
    <div className="bookDetailContainer">
      <NavigationBar />
      <h2 className="bookDetailTitle">{title}</h2>
      {!owner ?

        <div>
          <div className="bookDetailSection">
            <p><strong>Author:</strong> {author ? author : 'N/A'}</p>
            <p><strong>Genre:</strong> {genre ? genre : 'N/A'}</p>
            <p><strong>Country:</strong> {country ? country : 'N/A'}</p>
            <p><strong>Edition:</strong> {edition ? edition : 'N/A'}</p>

            <p><strong>Grade:</strong> {grade ? grade : 'N/A'}</p>

          </div>
          <div className="bookDetailSection">
            <p><strong>Description:</strong> {description ? description : 'N/A'}</p>
            <p><strong>ISBN:</strong> {isbn ? isbn : 'N/A'}</p>
            <p><strong>Board:</strong> {board ? board : 'N/A'}</p>
            <p><strong>Language:</strong> {language ? language : 'N/A'}</p>
            <p><strong>Year:</strong> {year ? year : 'N/A'}</p>

          </div>
          <div className="bookDetailSection">
            <p><strong>Pages:</strong> {pages ? pages : 'N/A'}</p>
            <p><strong>Publisher:</strong> {publisher ? publisher : 'N/A'}</p>
            <p><strong>Publication Date:</strong> {publicationDate ? publicationDate : 'N/A'}</p>
            <p><strong>Quantity:</strong> {quantity ? quantity : 'N/A'}</p>
            <p><strong className="price">Price:</strong>₹ {price ? price : 'N/A'}</p>
          </div>
        </div>
        :
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={Title} onChange={(e) => setTitle(e.target.value)} placeholder="*Title" />

          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={Author} onChange={(e) => setAuthor(e.target.value)} placeholder="*Author" />

          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" value={Genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />

          <label htmlFor="board">Board:</label>
          <input type="text" id="board" value={Board} onChange={(e) => setBoard(e.target.value)} placeholder="Board" />

          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" value={Grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />

          <label htmlFor="country">Country:</label>
          <input type="text" id="country" value={Country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />

          <label htmlFor="edition">Edition:</label>
          <input type="text" id="edition" value={Edition} onChange={(e) => setEdition(e.target.value)} placeholder="Edition" />
          <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description"  className="large-textarea" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>

          </div>
          
          <label htmlFor="isbn">ISBN:</label>
          <input type="text" id="isbn" value={Isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN" />

          <label htmlFor="language">Language:</label>
          <input type="text" id="language" value={Language} onChange={(e) => setLanguage(e.target.value)} placeholder="*Language" />

          <label htmlFor="year">Year:</label>
          <input type="number" id="year" value={Year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />

          <label htmlFor="pages">Pages:</label>
          <input type="number" id="pages" value={Pages} onChange={(e) => setPages(e.target.value)} placeholder="Pages" />

          <label htmlFor="publisher">Publisher:</label>
          <input type="text" id="publisher" value={Publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" />

          <label htmlFor="publicationDate">Publication Date:</label>
          <input type="date" id="publicationDate" value={PublicationDate} onChange={(e) => setPublicationDate(e.target.value)} placeholder="Publication Date" />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={Quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />

          <label htmlFor="price">Price:</label>
          <input type="text" id="price" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <button type="submit">Update Book</button>
        </form>}

      <div>
        {
          owner ?
            null
            :
           loading?<button>Loading</button>: <button onClick={(e, bookId) => { handleBooksByIdUser(e, bookId) }}>Contact to Book Owner</button>
        }
      </div>
    </div>
  );
};

export default BookDetail;
