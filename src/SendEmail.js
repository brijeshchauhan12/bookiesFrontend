import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/EmailLinkPage.css';
import ChatModel from './Model/ChatModel';
const EmailLinkPage = () => {
    const location = useLocation();
    const { email, fullName , userId } = location.state;

    return (
     
      <div className="email-link-container">
        <h2>Hi, I am {fullName}</h2>
        <p>Please send me an email. I will be happy to help you.</p>
        <a href={`mailto:${email}`} className="email-button">Send Email to {email}</a>
        <ChatModel/>
      </div>

    );
};

export default EmailLinkPage;