import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './css/signup.css'

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [error, setError] = useState('');
  const [repassword, setRePassword] = useState(''); // Add a new state for re-entering password
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Add a new state for password error
  const [loading, setLoading] = useState(false); // New state for loading




  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();
    setLoading(true); // Start loading

    // Check if passwords match
    if (password !== repassword) {
      setError('Passwords do not match');
      return; // Stop the function if passwords don't match
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (passwordError.length > 0) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be longer than 5 characters.');
      return;
    }
    try {
      setTimeout(async () => {
        const response = await axios.post('http://localhost:7777/auth/signup', {
          fullName,
          password,
          email,
          phoneNumber,
          address,
          city,
          country,
          postalCode,
          sex,
          dateOfBirth
  
        });
        console.log(response);
        if (response.data.id) {
          // Navigate to login page
          navigate('/login');
        } else {
          setError('Signup failed');
        }

      }, 3000); // Delay in milliseconds
      
    } catch (error) {
      console.error('Error signing up', error);
      setError('Error signing up');
    }finally{
            // Hide spinner after a delay
            setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        {error && <div className="error">{error}</div>}
        <div>
          <label>User Full Name :</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          {emailError && <div className="error">{emailError}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const emailInput = e.target.value;
              setEmail(emailInput);
              if (!validateEmail(emailInput)) {
                setEmailError('Invalid email format');
              } else {
                setEmailError('');
              }
            }}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label>Postal Code:</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div>
          <label>Sex:</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <DatePicker selected={dateOfBirth}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select" // or "scroll"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setDateOfBirth(date)}
          />
        </div>
        <div>
          <label>Password:</label>
          {passwordError && <div className="error">{passwordError}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const newPassword = e.target.value;
              console.log(newPassword + 'newPassword');
              const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
              if (passwordPattern.test(newPassword)) {
                setPassword(newPassword);
                setPasswordError('');
              } else {
                setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be longer than 5 characters.');
              }
            }}
          />
        </div>
        <div>
          <label>ReType Password:</label>
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        {loading?<button>Signing up ...</button>:  <button type="submit">Signup</button>}
        
      </form>
    </div>
  );
};

export default Signup;
