import '../css/HomePage.css';
import BookSearch from '../Model/BookSearch';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const NavigationBar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const userToken = location.state?.userToken;

    const handleLogout = () => {

        navigate('/');
    };

    return (
        <nav style={{ marginBottom: '20px' }} >
            <div>
                <h2>Home </h2>
                <p>A reader lives a thousand lives before he dies . . .</p>
            </div>

            <div className="nav-buttons">
              { props.showBookSearch && <BookSearch userToken={props.userToken} />}
               <button onClick={() =>  navigate('/home', { state: JSON.parse(localStorage.getItem('userToken')) })}>Home</button>
                <button onClick={handleLogout}>Logout</button>

            </div>
        </nav>
    )
}

export default NavigationBar;