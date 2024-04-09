import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <img src="about.jpg" alt="Event Banner" style={{ width: '100%', height: '750px', display: 'block' }} />


      <div style={{ textAlign: 'center' }}>
  <p>
    Welcome to EventureMap, the ultimate solution for discovering and signing up for events near you! Our platform is dedicated to connecting people with events that match their interests, whether you're looking for local workshops, networking events, concerts, or anything in between. With EventureMap, you can easily browse through a wide variety of events with just a few clicks. Our intuitive platform allows you to filter events by location and date, making it easier than ever to find exactly what you're looking for. Whether you're planning your weekend in advance or looking for something to do today, we've got you covered. Our mission is to make event discovery as easy and accessible as possible. We understand the importance of connecting with others and experiencing new things, which is why we strive to provide a comprehensive and user-friendly platform for event seekers and organizers alike. From small community gatherings to large-scale festivals, EventureMap is your go-to source for events. Join us in exploring the endless possibilities that await. Sign up today to start discovering events, save your favorites, and share them with friends. Let's make unforgettable memories together with EventureMap!
  </p>
</div>

    </div>
  );
};

export default About;
