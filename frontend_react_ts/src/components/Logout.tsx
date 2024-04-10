import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false); // State for success notification

  useEffect(() => {
    const logout = async () => {
      // Here, we simulate clearing the session or token storage
      localStorage.removeItem('token');

      // Optionally, you can set a success notification
      setSuccess(true);

      // Redirect the user to the login page or home page after logout
      setTimeout(() => {
        navigate('/login'); // Adjust the path as needed for your application
      }, 3000); // Adjust the delay for the notification as needed
    };

    logout();

    // The empty dependency array ensures this effect runs once on component mount
  }, [navigate]);

  // Optionally, display a message or loader while logging out
  return (
    <div>
      {success && <p style={{ color: 'red' }}>Logout successful!</p>} {/* Success notification with red color */}
      Logging out...
    </div>
  );
};

export default Logout;
