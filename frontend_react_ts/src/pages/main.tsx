
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api'; // Adjust this path as needed

const Main: React.FC = () => {
    const [userName, setUserName] = useState<string>(''); // State variable to store user name
    

    useEffect(() => {
        
    
        const fetchUserName = async () => {
          const token = localStorage.getItem('token');
        
          if (!token) {
            // Handle case where token is missing
            return;
          }
        
          try {
            const response = await api.get('/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserName(response.data.name);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle authentication errors here
          }
        };
        
    
     
        fetchUserName(); // Call the function to fetch user name
      }, []);

    

  return (
    <div>
    <img src="main.jpg" alt="Event Banner" style={{ width: '100%', height: '750px', display: 'block' }} />



        {/* Add a section for the features */}
        <section style={{ padding: '10px 0', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div className="row">
            {/* Feature cards */}
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-header bg-primary" style={{ fontSize: '2.0em' , color: 'white'}}><FontAwesomeIcon icon={faSearch} /> Browse for Events</div>
                <div className="card-body">
                  <p className="card-text">Explore a wide range of events happening near you or in your favorite locations.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-header bg-primary" style={{ fontSize: '2.0em', color: 'white' }}><FontAwesomeIcon icon={faUserPlus} /> Sign Up for Events</div>
                <div className="card-body">
                  <p className="card-text">Reserve your spot and never miss out on the fun. Register for events with just a few clicks.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light mb-3">
                <div className="card-header bg-primary" style={{ fontSize: '2.0em', color: 'white' }}><FontAwesomeIcon icon={faFilter} /> Filter Events</div>
                <div className="card-body">
                  <p className="card-text">Narrow down your search by year or location to find the perfect event for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add a call-to-action button */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Link to="/" className="btn btn-success btn-lg">Start Exploring Now!</Link>
      </div>
    </div>
  );
};

export default Main;

