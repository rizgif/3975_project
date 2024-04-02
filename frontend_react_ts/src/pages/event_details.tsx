import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api'; // Import the API module

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

  return (
    <div className="event-details-container">
      <div className="card">
        <h2>Event Details</h2>
        {error && <p>{error}</p>}
        {event && (
          <div>
            <p>Title: {event.title}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            {/* Add more event details as needed */}
          </div>
        )}
        <Link to="/">Back</Link> {/* Link back to the home page */}
      </div>
    </div>
  );
};

export default EventDetails;
