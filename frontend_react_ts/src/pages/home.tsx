// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  host_id: number;
  date: string;
  location: string;
  description: string;
  image: string;
  is_approved:boolean;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events from backend when component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events'); // Assuming the endpoint is '/events'
        setEvents(response.data); // Assuming the response data is an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Welcome to Event Manager</h2>
      <p>Manage your events with ease.</p>
      <h3>Upcoming Events</h3>
      <div>
        {events.map(event => (
          <div key={event.id}>
            <h4>{event.title}</h4>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <img src={event.image} alt={event.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
