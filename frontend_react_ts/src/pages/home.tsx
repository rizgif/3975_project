// Import the api instance
import api from '../services/api';

// Example usage in a React component
import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  // Define other event properties here
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get<Event[]>('/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
          // Render other event properties as needed
        ))}
      </ul>
    </div>
  );
};

export default Home;
