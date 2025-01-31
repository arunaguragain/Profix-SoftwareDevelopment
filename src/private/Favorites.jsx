import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import '../style/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); 

  // Simulate loading favorites from local storage or an API
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  // Navigation functions
  const goToHome = () => navigate('/MainPage');
  const goToContact = () => navigate('/contact');
  const goToAboutUs = () => navigate('/aboutUs');

  return (
    <div className="main">
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={goToHome} className="bt nav-link">Home</button>
          <button onClick={goToContact} className="bt nav-link">Contact</button>
          <button onClick={goToAboutUs} className="bt nav-link">About Us</button>
        </div>
      </div>
      <div className="contents">
        <h1>Your Favorites</h1>
        <div id="favorites-list">
          {/* Display the list of favorites */}
          {favorites.length > 0 ? (
            <div>
              {favorites.map((provider, index) => (
                <div key={index} className="favorite-card">
                  <img src={provider.image} alt={provider.name} />
                  <div className="content">
                    <h3>{provider.name}</h3>
                    <p>Contact: {provider.contact}</p>
                    <p>Email: <a href={`mailto:${provider.email}`}>{provider.email}</a></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
        <button onClick={clearFavorites} className="clear-btn">Clear Favorites</button>
      </div>
    </div>
  );
};

export default Favorites;
