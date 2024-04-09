import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Adjust the import path if necessary

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
        password_confirmation: passwordConfirmation,
      });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      navigate('/main'); // Adjust the redirect route as necessary
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary mb-3">
            <div className="card-header">Register</div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
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
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirmation" className="form-label">Password Confirmation:</label>
                  <input type="password" className="form-control" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit">Register</button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
