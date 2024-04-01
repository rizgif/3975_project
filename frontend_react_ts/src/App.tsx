import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Profile from './pages/profile';
import AuthPage from './pages/auth';
import Register from './pages/register';


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
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} /> {/* Add the conditional rendering */}
           
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
