import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EmergencyContact.css';

const EmergencyServices = () => {
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const navigate = useNavigate();  

  const serviceCards = [
    {
      name: "John's Plumbing Services",
      availability: '24/7',
      location: 'Kathmandu',
      contact: '9876543210',
    },
    {
      name: 'Electrician Experts',
      availability: 'holiday',
      location: 'Lalitpur',
      contact: '9801234567',
    },
  ];

  const handleAvailabilityChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);  // ✅ Use navigate function
  };

  const filteredServices = serviceCards.filter((service) => {
    if (availabilityFilter === 'all') {
      return true;
    }
    return service.availability.toLowerCase().includes(availabilityFilter.toLowerCase());
  });

  return (
    <div className="main">
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button className="bt" onClick={() => handleNavigate('/')}>Home</button>
          <button className="bt" onClick={() => handleNavigate('/contact')}>Contact</button>
          <button className="bt" onClick={() => handleNavigate('/about')}>About</button>
        </div>
      </div>
      <div className="contents">
        <h2 className="services-header">Emergency Services</h2>
        <div className="filter-section">
          <label htmlFor="availability">Availability:</label>
          <select
            id="availability"
            value={availabilityFilter}
            onChange={handleAvailabilityChange}
          >
            <option value="all">All</option>
            <option value="24/7">24/7</option>
            <option value="daytime">Daytime Only</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>
        <div className="service-cards">
          {filteredServices.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.name}</h3>
              <p>Available: {service.availability}</p>
              <p>Location: {service.location}</p>
              <div className="contact">
                <span>Contact: {service.contact}</span>
                <a href={`tel:${service.contact}`}>Call Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
