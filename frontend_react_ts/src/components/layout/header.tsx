import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  

  const handleSettingsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    console.log('Selected option:', selectedOption);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility

  return (
    <header className="header">
      <h1>EventureMap 🔎</h1>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search events..."
        />
        <button type="submit">Search</button>
      </form>

        {/* Dropdown Menu */}
        <div className="dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>Menu</button>
        {isDropdownOpen && ( // Conditionally render dropdown content based on isDropdownOpen state
          <div className="dropdown-content">
            <Link to="/events">Your Events</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/Logout">Logout</Link>

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
