import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the API module
import axios from 'axios'; // Import Axios
import '../App.css'; // Ensure the stylesheet is correctly imported
import { Link } from 'react-router-dom';

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    host_id: 0, // Initialize host_id to 0
    is_approved: true
  });

  // Fetch user ID function
  const fetchUserID = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(prevState => ({
        ...prevState,
        host_id: response.data.id, // Set host_id from the response
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Call fetchUserID function when component mounts
  useEffect(() => {
    fetchUserID();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const submissionData = {
      ...formData,
      date: `${formData.date}:00`,
    }

    try {
      console.log(formData)
      await api.post('/events', submissionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to the events page after successful event creation
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
