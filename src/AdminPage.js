import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AdminPage.css';
import NavigationBar from './Model/NavigationBar';

const AdminPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData;
    const userToken = location.state?.userToken;
    const [loading , setLoading] = useState(false);
    class User {
        constructor() {
            this.UserID = '';
            this.Email = '';
            this.FullName = '';
            this.Address = '';
            this.City = '';
            this.Country = '';
            this.PhoneNumber = '';
            this.PostalCode = '';
            this.Sex = '';
            this.DateOfBirth = '';
            this.Role = '';
        }
    }
    const userArray=[];
    for(let i=0; i<userData.length; i++){
        const userObj=new User();
        userObj.UserID=userData[i][0];
        userObj.Email=userData[i][1];
        userObj.FullName=userData[i][2];
        userObj.Address=userData[i][3];
        userObj.City=userData[i][4];
        userObj.Country=userData[i][5];
        userObj.PhoneNumber=userData[i][6];
        userObj.PostalCode=userData[i][7];
        userObj.Sex=userData[i][8];
        userObj.DateOfBirth=userData[i][9];
        userObj.Role=userData[i][10];
        userArray.push(userObj);
    
    }
    const [filterCriteria, setFilterCriteria] = useState({
        UserID: '',
        Email: '',
        FullName: '',
        Address: '',
        City: '',
        Country: '',
        PhoneNumber: '',
        PostalCode: '',
        Sex: '',
        DateOfBirth: '',
        Role: '',
      });
    
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const filteredUserArray = userArray.filter(user => 
        Object.entries(filterCriteria).every(([key, value]) => 
          !value || user[key].toString().toLowerCase().includes(value.toLowerCase())
        )
      );
   
    const AllBooksByUsers = async (e) => {
        if (e) {
          e.preventDefault();
        }
        setLoading(true); // Start loading
        console.log('userToken', userToken);
        console.log('userData', userData);
        setTimeout(async () => { // Add a delay before fetching data
          try {
          
            const response = await axios.get(`http://localhost:7777/admin/allBooks`, {
              headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + userToken,
              }
            });
            console.log(response);
            if (response) {
                console.log(response.data);
                const userBooksData = {userBooksData: response.data};
                 navigate('/allBooks', { state: userBooksData });
            } else {
              alert('Invalid credentials');
            }
          } catch (error) {
            console.error('Error fetching All the books', error);
            alert('Error fetching All the books');
          } finally {
            setLoading(false); // Stop loading regardless of the outcome
          }
        }, 200); // Delay in milliseconds
      };  

    return (
        <div class="table-container">
          <NavigationBar showBookSearch={false}/>
            <h2>User Details</h2>
           {loading?<button>loading...</button> :<button onClick={AllBooksByUsers}>See all the books</button>}
            <table>
                <thead className="sticky-header">
                    <tr>
                        <th>UserID <input name="UserID" onChange={handleFilterChange} /></th>
                        <th>Email <input name="Email" onChange={handleFilterChange} /></th>
                        <th>Full Name <input name="FullName" onChange={handleFilterChange} /></th>
                        <th>Address <input name="Address" onChange={handleFilterChange} /></th>
                        <th>City <input name="City" onChange={handleFilterChange} /></th>
                        <th>Country <input name="Country" onChange={handleFilterChange} /></th>
                        <th>Phone Number <input name="PhoneNumber" onChange={handleFilterChange} /></th>
                        <th>Postal Code <input name="PostalCode" onChange={handleFilterChange} /></th>
                        <th>Sex <input name="Sex" onChange={handleFilterChange} /></th>
                        <th>Date Of Birth <input name="DateOfBirth" onChange={handleFilterChange} /></th>
                        <th>Role <input name="Role" onChange={handleFilterChange} /></th>
                    </tr>
                </thead>
                <tbody>

                    {filteredUserArray.map((user) => (
                        <tr key={user.UserID}>
                            <td>{user.UserID}</td>
                            <td>{user.Email}</td>
                            <td>{user.FullName ? user.FullName : 'N/A'}</td>
                            <td>{user.Address ? user.Address : 'N/A'}</td>
                            <td>{user.City ? user.City : 'N/A'}</td>
                            <td>{user.Country ? user.Country : 'N/A'}</td>
                            <td>{user.PhoneNumber ? user.PhoneNumber : 'N/A'}</td>
                            <td>{user.PostalCode ? user.PostalCode : 'N/A'}</td>
                            <td>{user.Sex ? user.Sex: 'N/A'}</td>
                            <td>{user.DateOfBirth ? new Date(user.DateOfBirth).toLocaleDateString('en-GB') : 'N/A'}</td>
                            <td>{user.Role ? user.Role : 'N/A'}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AdminPage;