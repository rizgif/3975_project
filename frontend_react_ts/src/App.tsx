import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Profile from './pages/profile';
import AuthPage from './pages/auth';
import Register from './pages/register';
import EventDetails from './pages/event_details'; // Import the EventDetails component
import Logout from './components/Logout';
import About from './pages/about';
import CreateEvent from './pages/create_event'; // Import the CreateEvent component
import Main from './pages/main';
import EventsAttending from './pages/event_attending'; // Import the EventsAttending component
import EventsHosting from './pages/event_hosting'; // Import the EventsHosting component
import EventSearch from './pages/events_search';

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/events/:eventId" element={<EventDetails />} /> {/* Route for the EventDetails page */}
            <Route path="/create_event" element={<CreateEvent />} /> {/* Route for the EventDetails page */}
            <Route path="/users/events" element={<EventsAttending />} />
            <Route path="/users/hosting" element={<EventsHosting />} />
            <Route path="/search" element={<EventSearch />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/about' element={<About />} />
            <Route path='/main' element={<Main />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
