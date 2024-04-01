// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import '../../App.css'; // Adjust the import path

const Header: React.FC = () => {
  const handleSettingsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    // Implement logic to handle the selected option
    console.log('Selected option:', selectedOption);
  };

  return (
    <header>
      <h1>Hiroo 🔎</h1>
      {/* Navigation links */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Settings dropdown */}
      <div className="settings-dropdown">
        <select onChange={handleSettingsChange}>
          <option value="">Settings</option>
          <option value="profile">Profile</option>
          <option value="account">Account</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </header>
  );
};

export default Header;
