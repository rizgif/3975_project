import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the API module
import axios from 'axios';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null); // Store user ID
  const { eventId } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        setError('Failed to fetch event details. Please try again.');
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    // Fetch user ID function
    const fetchUserID = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.id); // Set user ID from the response
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserID();
  }, []);

  const handleSignUp = async () => {
    if (!userId) {
      setError('You must be logged in to sign up for an event.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication error. Please log in.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/events/${eventId}/attendees`,
        { user_id: userId }, // This line is changed to match the backend's expected field name

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Sign up successful', response.data);
      // Handle successful sign up (e.g., show a success message, refresh event details to show the user as an attendee)
      navigate('/users/events');
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
            <p>Submitted at: {new Date(event.created_at).toLocaleString()}</p>
            <p>Approved at: {new Date(event.updated_at).toLocaleString()}</p>
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
