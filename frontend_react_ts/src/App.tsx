import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Profile from './pages/profile';
import AuthPage from './pages/auth';
import Register from './pages/register';
import EventDetails from './pages/event_details'; // Import the EventDetails component



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
            <Route path="/profile" element={<Profile />}/>
            <Route path="/events/:eventId" element={<EventDetails />} /> {/* Route for the EventDetails page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
