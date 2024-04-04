import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api'; // Adjust this path as needed
import '../App.css'; // Ensure the stylesheet is correctly imported

interface Event {
  id: number;
  title: string;
  host_id: number;
  date: string;
  location: string;
  description: string;
  image: string; // Make sure this path works correctly for your image URLs
  is_approved: boolean;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

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

  // Filter the events based on the filter criteria
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      return (filterDate ? event.date === filterDate : true) &&
             (filterLocation ? event.location.toLowerCase().includes(filterLocation.toLowerCase()) : true);
    });
  }, [events, filterDate, filterLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome 👋</h1>
      <div className="filter-container">
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          placeholder="Filter by Date"
        />
        <input
          type="text"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Filter by Location"
        />
        <button onClick={() => { setFilterDate(''); setFilterLocation(''); }}>Clear Filters</button>
      </div>
      
      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              <img src={event.image} alt={event.title} className="event-image" />
            </div>
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              {/* Render any buttons or additional details here */}
            </div>
          </div>
        ))
      ) : (
        <p>No events found matching the criteria.</p>
      )}
    </div>
  );
};

export default Home;
