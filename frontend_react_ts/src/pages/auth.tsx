import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Adjust the import path

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8000/api/login';
      const response = await axios.post(url, { 
        email, 
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/main'); // Redirect to the home page upon successful login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary mb-3">
            <div className="card-header">Login</div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit">Login</button>
              </form>
              <p className="mt-3">
                Don't have an account? <Link to="/register">Register here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
