import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    axios.get(`/api/users/${userId}/events/attending`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, [userId]);

  return (
    <div>
      <h1>Events Attending</h1>
      {events.length > 0 ? (
        events.map(event => (
          // Event card component or JSX
          <div key={event.id} className="event-card">
            {/* Content of the event card */}
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsAttending;
