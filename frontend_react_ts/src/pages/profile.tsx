import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure the path to App.css is correct
import api from '../services/api'; // Adjust this path as needed

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserData = async () => {

      const token = localStorage.getItem('token');
  
      if (!token) {
        // Handle case where token is missing
        return;
      }
  
      


      try {
        // Assuming you need to include an Authorization header
  
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Display error message
        setError('Failed to fetch user data. Please check console for more details.');
      }
    };
    

    fetchUserData();
  }, []);



















  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/update', { // Update this endpoint as necessary
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      setSuccessMessage('Profile updated successfully');
      // Optional: redirect after success
      // navigate('/somewhere');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary mb-3">
            <div className="card-header">Profile</div>
            <div className="card-body">
              {error && <div className="text-danger">{error}</div>}
              {successMessage && <div className="text-success">{successMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirmation" className="form-label">Confirm Password:</label>
                  <input type="password" className="form-control" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
