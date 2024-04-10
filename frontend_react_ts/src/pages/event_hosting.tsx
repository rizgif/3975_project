import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const EventsHosting: React.FC = () => {
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
  , [userId]);

  return (
    <div className="row">
      <div className="text-center">
        <h1>Hosting Events</h1>
      </div>
     {events.length > 0 ? (
        events.map(event => (
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
      ))
     ) :(
      <div className="text-center">No events to display</div>
     )
  }
  </div>
  );
};

export default EventsHosting;
