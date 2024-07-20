
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/NewBookAddForm.css';
const NewBookAddForm = () => {
  // Step 1: Set up state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [grade, setGrade] = useState('');
  const [board, setBoard] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setCountry] = useState('');
  const [edition, setEdition] = useState('');
  const [description, setDescription] = useState('');
  const [isbn, setIsbn] = useState('');
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const location = useLocation();

  const navigate = useNavigate();
  const { token, userid, fullName, email } = location.state;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    quantity:0,
    price:0,
    pages:0,
    language: ''
    // Add other fields as necessary
  });
  const [validationMessages, setValidationMessages] = useState({});

  const validateForm = () => {
    const messages = {};
    if (!formData.title) {
      console.log(formData)
      messages.title = 'Title is required';
    }
    if (!formData.author) {
      messages.author = 'Author is required';
    }
    // validation for quantity, price , pages and languages
    // Validation for quantity
    if (!formData.quantity || formData.quantity <= 0) {
      messages.quantity = 'Quantity must be a positive number';
    }
    // Validation for price
    if (!formData.price || formData.price <= 0) {
      messages.price = 'Price must be a positive number';
    }
    // Validation for pages
    if (!formData.pages || formData.pages <= 0) {
      messages.pages = 'Pages must be a positive number';
    }
    // Validation for languages
    if (!formData.language.trim()) {
      messages.language = 'Languages is required';
    }

    return messages;
  };

  // Step 4: Submit form
  const handleSubmit = async (e) => {


    // Here you would typically send the book data to a backend server

    e.preventDefault();
    const messages = validateForm();
    console.log(messages);
    if (Object.keys(messages).length > 0) {
      console.log("here")
      setValidationMessages(messages);
      return; // Prevent form submission if validation fails
    }
    try {
        setTitle(formData.title);
        setAuthor(formData.author);
        setQuantity(formData.quantity);
        setPrice(formData.price);
        setPages(formData.pages);
        setLanguage(formData.language);

      const response = await axios.post('http://localhost:7777/api/books',
        {
          title,
          author,
          grade,
          userid,
          board,
          genre,
          country,
          edition,
          description,
          isbn,
          language,
          year,
          pages,
          publisher,
          publicationDate,
          quantity,
          price
        }, // This is the request body
        {
          headers: {
            'Content-Type': 'application/json', // Typically, for a JSON body, you should use 'application/json'
            'Authorization': 'Bearer ' + token,
          }
        }
      );
      console.log(response);
      if (response.data.id) {
        // Navigate to login page
        console.log("data saved successfully");
        alert("data saved successfully");
        navigate('/details',
          {
            state:
            {
              token: token,
              userid: userid,
              fullName: fullName,
              email: email
            }
          }
        );
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up', error);

    }
    setValidationMessages({});
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Step 2: Form structure
  return (

    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add a New Book</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder='* Book Title'
          onChange={handleChange}
        
        />
        {validationMessages.title && <p>{validationMessages.title}</p>}
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          name="author"
          placeholder='* Author Name'
          
          value={formData.author}
          
          onChange={handleChange}
        />
          {validationMessages.author && <p>{validationMessages.author}</p>}
      </div>
      <div className="form-group">
        <label>Grade:</label>
        <input
          type="text"
          name="genre"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="board">Board</label>
        <input type="text" className="form-control" id="board" value={board} onChange={(e) => setBoard(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="edition">Edition</label>
        <input type="text" className="form-control" id="edition" value={edition} onChange={(e) => setEdition(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="10" // Increase the number of rows to expand the textarea vertically
          style={{ width: '100%' }} // Adjust width as necessary; 100% makes it fill the container
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input type="text" className="form-control" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="language">Language</label>
        <input
          type="text"
          id="language"
          name="language"
          placeholder='* Book language'
          className="form-control"
          value={formData.language}
          onChange={handleChange}
        />
        {validationMessages.language && <p>{validationMessages.language}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input type="number" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          id="pages"
          name="pages"
          className="form-control"
          placeholder='* Number of pages in the book'
          value={formData.pages}
          onChange={handleChange}
        />
        {validationMessages.pages && <p>{validationMessages.pages}</p>}
      </div>
    
      <div className="form-group">
        <label htmlFor="publisher">Publisher</label>
        <input type="text" className="form-control" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="publicationDate">Publication Date</label>
        <input type="date" className="form-control" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder='* Number of books available in stock'
          className="form-control"
          value={formData.quantity}
          onChange={handleChange}
        />
        {validationMessages.quantity && <p>{validationMessages.quantity}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          placeholder='* Price of the book in INR'
          value={formData.price}
          onChange={handleChange}
        />
        {validationMessages.price && <p>{validationMessages.price}</p>}
      </div>


      <button type="submit">Add Book</button>
    </form>

  );
};

export default NewBookAddForm;   