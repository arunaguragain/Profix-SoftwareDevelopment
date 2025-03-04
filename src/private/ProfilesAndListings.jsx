import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ProfilesAndListings.css';
import logo from '../pictures/logo.png';

const ProfilesAndListings = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "John's Plumbing",
      category: "plumbing",
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      verified: true
    },
    {
      id: 2,
      name: "ElectricPro Services",
      category: "electrical",
      rating: 4.8,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      verified: true
    },
    {
      id: 3,
      name: "WoodCraft Carpentry",
      category: "carpentry",
      rating: 4.7,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      verified: true
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'carpentry', name: 'Carpentry' }
  ];

  const filteredProviders = providers
    .filter(provider => 
      selectedCategory === 'all' || provider.category === selectedCategory)
    .filter(provider =>
      searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            {/* <div className="popular-searches">
              <p className="text-sm mb-2">Popular searches:</p>
              <div className="popular-tags">
                <button onClick={() => setSearchQuery('Plumber')}>Plumber</button>
                <button onClick={() => setSearchQuery('Electrician')}>Electrician</button>
                <button onClick={() => setSearchQuery('Carpenter')}>Carpenter</button>
                <button onClick={() => setSearchQuery('Painter')}>Painter</button>
              </div>
            </div> */}
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
            {filteredProviders.map(provider => (
              <div key={provider.id} className="provider-card">
                <div className="provider-image">
                  <img src={provider.image} alt={provider.name} />
                  {provider.verified && (
                    <span className="verified-badge">✓ Verified</span>
                  )}
                </div>
                <div className="provider-info">
                  <h3>{provider.name}</h3>
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(provider.rating))}</span>
                    <span className="rating-number">{provider.rating}</span>
                    <span className="reviews-count">({provider.reviews} reviews)</span>
                  </div>
                  <button className="contact-btn">Book Appointment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilesAndListings;