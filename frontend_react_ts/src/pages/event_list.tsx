import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Import the API module


const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await api.get('/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
    } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login or show a specific message
            setError('You are not authorized to view this content. Please log in.');
        } else if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('Failed to fetch events. Please try again.');
        }
    }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {events.length > 0 ? (
        <ul className="list-group">
          {events.map(event => (
            <li key={event.id} className="list-group-item">
              <Link to={`/events/${event.id}`}>
                {event.title} - {new Date(event.date).toLocaleDateString()}
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
