import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Mock user ID for demonstration purposes
  // In a real application, you would retrieve this from your authentication context or state
  const userId = '123'; // Example user ID

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/event_search?query=${encodeURIComponent(searchQuery)}`);
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
            <Link to={`/users/${userId}/events/attending`}>Attending Events</Link>
            <Link to={`/users/${userId}/events/hosting`}>Hosting Events</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/Logout">Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
