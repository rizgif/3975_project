import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import GuestHeader from './guestheader';
import api from '../../services/api'; // Adjust this path as needed


const Header: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>(''); // State variable to store user name

  useEffect(() => {
        
    
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
    
      if (!token) {
        // Handle case where token is missing
        return;
      }
    
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle authentication errors here
      }
    };
    

 
    fetchUserName(); // Call the function to fetch user name
  }, []);

  
   // Check if the current location is '/login'
   if (location.pathname === '/login' || location.pathname === '/register') {
    // Render the GuestHeader component for the login page
    return <GuestHeader />;
  }

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        // Handle non-JSON response (e.g., display an error message)
        console.error('Response is not JSON:', await response.text());
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };


  


  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="container-fluid">
        <Link to="/main" style={{ fontSize: '40px', fontFamily: 'Pacifico', textDecoration: 'none', color: 'white' }}> EventureMap 🔍</Link>
       
   {/* Spacer to push the middle and right content to their positions */}
   <div style={{ flex: 1 }}></div> 
    
    {/* Centered Welcome message */}
    <h1 style={{ flex: 0, fontSize: '40px', color: 'black', textAlign: 'center', margin: '0 auto' }}>
      Welcome {userName ? `${userName} 👋` : '👋'}
    </h1>
    
    {/* Another spacer to ensure the Welcome message stays centered */}
    <div style={{ flex: 1 }}></div> 


        {/* Align the collapsible content to the right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarColor01">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/main">Home <span className="visually-hidden">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/users/events`}>Your Events</Link>
            </li>
            {/*<li className="nav-item">
              <Link className="nav-link" to={`/users/hosting`}>Hosting</Link>
            </li>*/}
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   
  );
};

export default Header;