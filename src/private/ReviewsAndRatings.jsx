import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ReviewsAndRatings.css';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: '',
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle star click for rating selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (selectedRating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const { name, service, comment } = formData;
    const newReview = { name, service, rating: selectedRating, comment };

    setReviews((prev) => [newReview, ...prev]);
    
    // Reset form after submission
    setFormData({ name: '', email: '', service: '', comment: '' });
    setSelectedRating(0);
    setIsModalOpen(false);
  };

  return (
    <div className="main">
      {/* Navbar */}
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={() => navigate('/')} className="bt nav-link">Home</button>
          <button onClick={() => navigate('/contact')} className="bt nav-link">Contact</button>
          <button onClick={() => navigate('/about')} className="bt nav-link">About</button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="contents">
        <h2 className="customer-reviews-header">Customers Review</h2>
        <div className="customer-reviews" id="reviewsContainer">
          {reviews.length === 0 ? (
            <p id="noReviewsText">No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <h4>{review.name} ({review.service})</h4>
                <p>Rating: {'★'.repeat(review.rating)} ({review.rating} stars)</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bt">Leave a Review</button>
      </div>

      {/* Modal for Review Form */}
      {isModalOpen && (
        <div className="modal-bg" onClick={() => setIsModalOpen(false)}>
          <div className="review-form" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setIsModalOpen(false)}>✖</span>
            <h2>Leave a Review</h2>
            <form id="reviewForm" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="service">Type of Service:</label>
                <input
                  type="text"
                  id="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="Enter type of service"
                  required
                />
              </div>

              {/* Star Rating Section */}
              <div className="ratings">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`star ${rating <= (hoverRating || selectedRating) ? 'selected' : ''}`}
                    onClick={() => handleStarClick(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div>
                <textarea
                  id="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Write your comment here"
                  rows="4"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
