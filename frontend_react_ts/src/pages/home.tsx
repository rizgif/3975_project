//src/pages/home.tsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Event {
    id: number;
    title: string;
    host_id: number;
    date: string;
    location: string;
    description: string;
    image: string;
    is_approved: boolean;
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

  const handleCreateEvent = async () => {
    try {
      const newEvent = {
        title: 'New Event',
        host_id: 1, // Example host ID, replace with actual host ID
        date: '2024-04-01', // Example date, replace with actual date
        location: 'Example Location',
        description: 'Example Description',
        image: 'example.jpg',
        is_approved: false // Example value for is_approved, replace with actual value
      };
  
      const response = await api.post('/events', newEvent);
      setEvents(prevEvents => [...prevEvents, response.data]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  

  const handleUpdateEvent = async (eventId: number, updatedEvent: Partial<Event>) => {
    try {
      await api.put(`/events/${eventId}`, updatedEvent);
      setEvents(prevEvents =>
        prevEvents.map(event => (event.id === eventId ? { ...event, ...updatedEvent } : event))
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Events</h2>
      <button onClick={handleCreateEvent}>Create Event</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <span>{event.title}</span>
            <button onClick={() => handleUpdateEvent(event.id, { title: 'Updated Event' })}>Update</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
