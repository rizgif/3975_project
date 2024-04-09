import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="container-fluid">
        

        <Link to="/" className="btn btn-primary" style={{ fontSize: '30px'  }}>EventureMap 🔍</Link>
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
              <Link className="nav-link active" to="/">Home <span className="visually-hidden">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events_list">Your Events</Link>
            </li>
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
