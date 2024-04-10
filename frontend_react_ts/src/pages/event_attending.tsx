import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const EventsAttending: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user ID function
    const fetchUserID = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`http://localhost:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.id); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserID(); 
  }, [userId]); 


  useEffect(() => {
    if (userId !== null) {
      axios.get(`http://localhost:8000/api/users/${userId}/events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
    }
  }
  , [userId]); // Depend on userId to re-fetch when userId changes

  return (
    <div>
      <h1>Attending Events</h1>
      {events.length > 0 ? (
        events.map(event => (
          <div key={event.id} className="event-card">
            <h2>{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <img src={event.image} alt={event.title} />
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
  
  
};

export default EventsAttending;
