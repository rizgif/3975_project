// src/components/Logout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here, we simulate clearing the session or token storage
    localStorage.removeItem('token');

    // Redirect the user to the login page or home page after logout
    navigate('/login'); // Adjust the path as needed for your application

    // The empty dependency array ensures this effect runs once on component mount
  }, [navigate]);

  // Optionally, display a message or loader while logging out
  return <div>Logging out...</div>;
};

export default Logout;
