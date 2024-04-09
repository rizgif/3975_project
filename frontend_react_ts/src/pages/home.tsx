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
  image: string;
  is_approved: boolean;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [userName, setUserName] = useState<string>('');

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
        console.error('No token found');
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
      }
    };
  
    fetchEvents();
    fetchUserName(); // This line calls the fetchUserName function within useEffect
  }, []);
  

  const filteredEvents = useMemo(() => events.filter(event => {
    const eventYear = new Date(event.date).getFullYear();
    return (!filterYear || eventYear === parseInt(filterYear)) &&
           (!filterLocation || event.location.toLowerCase().includes(filterLocation.toLowerCase()));
  }), [events, filterYear, filterLocation]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
 
      <div className="filter-container d-flex justify-content-center mb-4">
        <input
          type="text"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          placeholder="Filter by Year"
          className="mx-2" // Add horizontal margin
        />
        <input
          type="text"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Filter by Location"
          className="mx-2" // Add horizontal margin
        />
        <button
          className="btn btn-danger btn-sm mx-2" // Add horizontal margin to the button
          onClick={() => { setFilterYear(''); setFilterLocation(''); }}
        >
          Clear Filters
        </button>
      </div>
      <div className="row">
        {filteredEvents.map(event => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={event.id}>
            <div className="card h-100 text-center">
              <img src={event.image} className="card-img-top" alt={event.title} />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Date: {event.date}</li>
                <li className="list-group-item">Location: {event.location}</li>
              </ul>
              <div className="card-body">
                <Link to={`/events/${event.id}`} className="btn btn-success">
                  Get Event Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
