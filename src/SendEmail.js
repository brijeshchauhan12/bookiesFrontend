      
      import React from 'react';
      import { useLocation } from 'react-router-dom';
      const EmailLinkPage = () => {
          const location = useLocation();
        const emailAddress = 'email@example.com'; // Replace with the actual email address or use props/state
        const { email , fullName} = location.state;
        return (
          <div>
            <h2>Hi, I am {fullName}</h2>
            <p>Please send me the mail I will be happy to help you.</p>
            <p> <a href={`mailto:${email}`}>{email}</a></p>
          </div>
        );
      };
      
      export default EmailLinkPage;