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
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}/>
            <Route path="/events/:eventId" element={isLoggedIn ? <EventDetails /> : <Navigate to="/login" />} /> {/* Route for the EventDetails page */}
            <Route path="/create_event" element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />} /> {/* Route for the EventDetails page */}
            <Route path="/users/events" element={isLoggedIn ? <EventsAttending /> : <Navigate to="/login" />} />
            <Route path="/users/hosting" element={isLoggedIn ? <EventsHosting /> : <Navigate to="/login" />} />
            <Route path="/search" element={isLoggedIn ? <EventSearch /> : <Navigate to="/login" />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/about' element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
            <Route path='/main' element={isLoggedIn ? <Main /> : <Navigate to="/login" />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
