import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faFilter } from '@fortawesome/free-solid-svg-icons';

const Main: React.FC = () => {
  return (
    <div>
    <img src="main.jpg" alt="Event Banner" style={{ width: '100%', height: '700px', display: 'block' }} />

    <div style={{ textAlign: 'center' }}>
  <h1 style={{ fontSize: '100px', fontFamily: 'Pacifico', textDecoration: 'none'}}>Welcome!</h1>
  <p>
    This app allows you to discover exciting events, sign up for your favorites, and easily filter through them to find exactly what you're looking for.
  </p>
</div>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header"><FontAwesomeIcon icon={faSearch} /> Look for Events</div>
            <div className="card-body">
              <p className="card-text">Explore a wide range of events happening near you or in your favorite locations.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header"><FontAwesomeIcon icon={faUserPlus} /> Sign Up for Events</div>
            <div className="card-body">
              <p className="card-text">Reserve your spot and never miss out on the fun. Register for events with just a few clicks.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header"><FontAwesomeIcon icon={faFilter} /> Filter Events</div>
            <div className="card-body">
              <p className="card-text">Narrow down your search by year or location to find the perfect event for you.</p>
            </div>
          </div>
        </div>
      </div>
      <p>
        Ready to dive in? <Link to="/" className="btn btn-success">Start exploring now!</Link>

      </p>
    </div>
  );
};

export default Main;

