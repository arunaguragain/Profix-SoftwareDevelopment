import React, { useState } from 'react';
import '../style/SearchAndDiscovery.css';

const SearchAndDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log('Search:', { searchQuery, location });
  };

  return (
    <section className="search-discovery bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Trusted Service Providers Near You
        </h1>
        <p className="text-xl mb-8">
          Get help from experienced professionals in your area
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <div className="input-group">
              <input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="location-input"
              />
            </div>
            <button type="submit" className="search-button">
              Find Services
            </button>
          </div>
        </form>

        <div className="popular-searches mt-8">
          <p className="text-sm mb-2">Popular searches:</p>
          <div className="popular-tags">
            <button onClick={() => setSearchQuery('Plumber')}>Plumber</button>
            <button onClick={() => setSearchQuery('Electrician')}>Electrician</button>
            <button onClick={() => setSearchQuery('Carpenter')}>Carpenter</button>
            <button onClick={() => setSearchQuery('Painter')}>Painter</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndDiscovery;