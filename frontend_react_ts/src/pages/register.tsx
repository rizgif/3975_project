import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Add this line
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8000/api/register';
      const response = await axios.post(url, { 
        name, 
        email, 
        password,
        password_confirmation: passwordConfirmation, // Include this in your POST data
      });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      navigate('/'); // Redirect to the home page upon successful registration
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Registration failed: ${error.response.data.message}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div> {/* Add this block */}
            <label>Password Confirmation:</label>
            <input 
              type="password" 
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
            />
          </div>
          <button className="button" type="submit">Register</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
      </div>
    </div>
  );
};

export default Register;
