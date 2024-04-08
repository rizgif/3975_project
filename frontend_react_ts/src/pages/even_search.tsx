import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EventSearch: React.FC = () => {
  // State to store search results
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSearchResults(data);
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  }, [location.search]);

  return (
    <div>
      {/* Render search results as event cards */}
      {searchResults.length > 0 ? (
        searchResults.map((event) => (
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
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventSearch;
