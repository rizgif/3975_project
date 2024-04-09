import React from 'react';
import '../../App.css';

const GuestHeader: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <h1 style={{ fontSize: '40px', fontFamily: 'Pacifico', color: 'white', margin: 0 }}>EventureMap 🔍</h1>
    </nav>
  );
};

export default GuestHeader;
