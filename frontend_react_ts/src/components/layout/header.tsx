import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import GuestHeader from './guestheader';

const Header: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="container-fluid">
        <Link to="/main" style={{ fontSize: '40px', fontFamily: 'Pacifico', textDecoration: 'none', color: 'white' }}> EventureMap 🔍</Link>
        {/* Center the search bar */}
        <div style={{ flexGrow: 1, marginLeft: '20%', display: 'flex', justifyContent: 'center' }}>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input className="form-control me-2" type="search" value={searchQuery} onChange={handleSearchChange} placeholder="Search" style={{ fontSize: '20px', height: '40px' }} />
            <button className="btn btn-secondary" type="submit" style={{ fontSize: '16px' }}>Search</button>
          </form>
        </div>
  
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