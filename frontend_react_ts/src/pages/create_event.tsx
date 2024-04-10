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
    is_approved: false
  });

  const [success, setSuccess] = useState(false); // State for success notification

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
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        setSuccess(false); // Reset success state after a delay
      }, 1000); // Adjust the delay as necessary
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error
    }
  };

  return (
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary mb-3">
            <div className="card-header">Create Event</div>
            <div className="card-body">
              {success && <p className="text-success">Event created successfully. It is pending approval by an admin.</p>} {/* Success notification */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date:</label>
                  <input type="datetime-local" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location:</label>
                  <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image:</label>
                  <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success" style={{ marginRight: '10px' }}>Create Event</button>
                <Link to="/" className="btn btn-primary" style={{ marginRight: '10px' }}>Back</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
