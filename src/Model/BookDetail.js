  
  import React from 'react';
  import './BookDetail.css'; // Import the CSS file here
  import { useNavigate, useLocation } from 'react-router-dom';
  // import { useNavigate, useLocation } from 'react-router-dom';
  import { useState} from 'react';
  import axios from 'axios';
  const BookDetail = () => {
      const location = useLocation();
      const { title, genre, country, edition, description, isbn, language, year, pages, publisher, publicationDate, quantity, price,bookId } = location.state;
  
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
                const data =response.data;
                const datas=data.split("*");
                  console.log(datas[0]+"data")
                const DatasObj={email:datas[0],fullName:datas[1]}
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
      // console.log(book+"book");
      return (
          <div className="bookDetailContainer">
              <h2 className="bookDetailTitle">{title}</h2>
              <div>
                  <div className="bookDetailSection">
                      <p><strong>Genre:</strong> {genre?genre:'N/A'}</p>
                      <p><strong>Country:</strong> {country?country:'N/A'}</p>
                      <p><strong>Edition:</strong> {edition?edition:'N/A'}</p>
                  </div>
                  <div className="bookDetailSection">
                      <p><strong>Description:</strong> {description?description:'N/A'}</p>
                      <p><strong>ISBN:</strong> {isbn?isbn:'N/A'}</p>
                      <p><strong>Language:</strong> {language?language:'N/A'}</p>
                      <p><strong>Year:</strong> {year?year:'N/A'}</p>
                      <p><strong>Pages:</strong> {pages?pages:'N/A'}</p>
                  </div>
                  <div className="bookDetailSection">
  
                      <p><strong>Publisher:</strong> {publisher?publisher:'N/A'}</p>
                      <p><strong>Publication Date:</strong> {publicationDate?publicationDate:'N/A'}</p>
                      <p><strong>Quantity:</strong> {quantity?quantity:'N/A'}</p>
                      <p><strong className="price">Price:</strong>₹ {price?price:'N/A'}</p>
                  </div>
              </div>
              <div>
                  <button onClick={(e, bookId)=>{handleBooksByIdUser(e,bookId)}}>Contact to Book Owner</button>
              </div>
          </div>
      );
  };
  
  export default BookDetail;
  