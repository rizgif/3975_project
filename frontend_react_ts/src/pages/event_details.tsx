import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api'; // Import the API module
import axios from 'axios';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any>(null); // State variable to store event details
  const [error, setError] = useState<string>(''); // State variable to store error message
  const { eventId } = useParams(); // Get the event ID from URL parameters

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data); // Set the event details in state
      } catch (error) {
        setError('Failed to fetch event details. Please try again.');
      }
    };

    fetchEventDetails(); // Call the fetchEventDetails function when the component mounts
  }, [eventId]); // Run the effect whenever the eventId changes

  const handleSignUp = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to sign up for an event.');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:8000/events/${eventId}/attendees`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Assuming the backend sends back a success message or the updated event details
      console.log('Sign up successful', response.data);
      // You might want to update the event details in the state or show a success message
    } catch (error) {
      setError('Failed to sign up for the event. Please try again.');
      console.error('Sign up error:', error);
    }
  };
  
  


  return (
    <div className="event-details-container">
      <div className="card">
        <h2>Event Details</h2>
        {error && <p>{error}</p>}
        {event && (
          <div>
            <p>Title: {event.title}</p>
            <p>Host ID: {event.host_id}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <p>Image:</p>
            <img src={event.image} alt="Event Image" />
            <p>Created at: {new Date(event.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(event.updated_at).toLocaleString()}</p>
            {/* Add more event details as needed */}
          </div>
        )}
        <div className="card-body">
        <button onClick={handleSignUp} className="btn btn-success" style={{ marginRight: '10px' }}>
          Sign Up
        </button>

          <Link to="/" className="btn btn-primary" style={{ marginRight: '10px' }}>Back</Link>
        </div> 
      </div>
    </div>
  );
};

export default EventDetails;
