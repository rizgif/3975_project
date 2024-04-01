// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Add more routes for other pages */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
