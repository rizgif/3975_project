import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Import the API module

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // State variable to store event details
  const [error, setError] = useState<string>(''); // State variable to store error message

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data); // Set the events in state
      } catch (error) {
        setError('Failed to fetch events. Please try again.');
      }
    };

    fetchEvents(); // Call the fetchEvents function when the component mounts
  }, []); // Run the effect only once when the component mounts

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      {error && <p>{error}</p>}
      {events.length > 0 ? (
        <ul className="list-group">
          {events.map(event => (
            <li key={event.id} className="list-group-item">
              <Link to={`/events/${event.id}`}>
                {event.title} - {event.date}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
      <div>
        <Link to="/" className="btn btn-primary">Back</Link>
      </div>
    </div>
  );
};

export default EventList;
