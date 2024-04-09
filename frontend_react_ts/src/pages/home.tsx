import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api'; // Adjust this path as needed
import '../App.css'; // Ensure the stylesheet is correctly imported
import { Link } from 'react-router-dom';

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
  const [filterLocation, setFilterLocation] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [userName, setUserName] = useState<string>(''); // State variable to store user name

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

    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
    
      if (!token) {
        // Handle case where token is missing
        return;
      }
    
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle authentication errors here
      }
    };
    

    fetchEvents();
    fetchUserName(); // Call the function to fetch user name
  }, []);

  // Filter the events based on the filter criteria
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventYear = new Date(event.date).getFullYear(); // Extract the year from the event date
      return (filterYear ? eventYear === parseInt(filterYear) : true) && // Compare years if filterYear is present
             (filterLocation ? event.location.toLowerCase().includes(filterLocation.toLowerCase()) : true);
    });
  }, [events, filterYear, filterLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome {userName ? `${userName} 👋` : '👋'}</h1>
      <div className="filter-container">
        <input
          type="text"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          placeholder="Filter by Year"
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Filter by Location"
          style={{ marginRight: '10px' }}
        />
        <button className="btn btn-danger btn-sm" onClick={() => { setFilterYear(''); setFilterLocation(''); }}>Clear Filters</button>
      </div>

      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => (
          <div key={event.id} className="card mb-3">
            <h3 className="card-header">{event.title}</h3>
            <img src={event.image} className="card-img-top" alt={event.title} style={{ maxWidth: "50%", height: "auto" }} />
            <div className="card-body">
              <p className="card-text">{event.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Date: {event.date}</li>
              <li className="list-group-item">Location: {event.location}</li>
            </ul>
            <div className="card-body">
              <Link to={`/events/${event.id}`} className="btn btn-primary">
                Get Event Details
              </Link>
            </div>  
            <div className="card-footer text-muted">
              2 days ago
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
