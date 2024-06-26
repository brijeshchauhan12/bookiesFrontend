import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const NewBookAddForm = () => {
  // Step 1: Set up state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [grade,setGrade]=useState('');

    const location = useLocation();
   
    const navigate = useNavigate();
    const { token, userid, fullName, email } = location.state;

  // Step 4: Submit form
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Here you would typically send the book data to a backend server

    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:7777/api/books', 
            { title, author, grade, userid }, // This is the request body
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
            {state:
                {token:token,
                userid:userid,
                fullName:fullName,
                email:email
                }}
        );
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up', error);
     
    }
  };

  // Step 2: Form structure
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
      
         onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default NewBookAddForm;   