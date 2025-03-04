import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ProfilesAndListings.css';
import logo from '../pictures/logo.png';

const ProfilesAndListings = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState([]); // Start with an empty array

  // Fetch service providers from the backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('http://localhost:5001/serviceproviders');
        if (!response.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'carpentry', name: 'Carpentry' }
  ];

  // Filter providers by category and search query
  const filteredProviders = providers
    .filter(provider => 
      selectedCategory === 'all' || provider.category === selectedCategory)
    .filter(provider =>
      searchQuery === '' || 
      provider.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="main-container">
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="Profix Logo" className="logo-img" />
        </div>
        <div className="navbtn">
          <button onClick={() => navigate('/dashboard')} className="bt nav-link">Home</button>
          <button onClick={() => navigate('/contact')} className="bt nav-link">Contact</button>
          <button onClick={() => navigate('/aboutus')} className="bt nav-link">About us</button>
        </div>
      </div>

      <section className="profiles-listings py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Service Providers</h2>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="categories-container">
            <div className="categories-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="providers-grid">
            {filteredProviders.length > 0 ? (
              filteredProviders.map(provider => (
                <div key={provider.id} className="provider-card">
                  <div className="provider-image">
                    <img src={provider.profilePicture || "https://via.placeholder.com/150"} alt={provider.fullName} />
                    {provider.verified && (
                      <span className="verified-badge">✓ Verified</span>
                    )}
                  </div>
                  <div className="provider-info">
                    <h3>{provider.fullName}</h3>
                    <p>{provider.category}</p>
                    <div className="rating">
                      <span className="stars">{'★'.repeat(4)}</span> {/* Placeholder rating */}
                      <span className="reviews-count">(No reviews yet)</span>
                    </div>
                    <button className="contact-btn" onClick={() => navigate('/appointment')}>Book Appointment</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No service providers found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilesAndListings;
