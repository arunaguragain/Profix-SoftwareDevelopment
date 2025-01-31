import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/Review.css'; // Assuming your CSS file is named review.css

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle star rating click
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, service, comment } = formData;

    if (selectedRating === 0) {
      alert('Please select a star rating!');
      return;
    }

    const newReview = {
      name,
      service,
      rating: selectedRating,
      comment,
    };

    // Add the new review to the list of reviews
    setReviews((prevReviews) => [newReview, ...prevReviews]);

    // Reset the form and close modal
    setFormData({
      name: '',
      email: '',
      service: '',
      comment: '',
    });
    setSelectedRating(0);
    setIsModalOpen(false);
  };

  // Navigate functions for routing
  const goToHome = () => navigate('/');
  const goToContact = () => navigate('/contact');
  const goToAbout = () => navigate('/about');

  return (
    <div className="main">
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={goToHome} className="bt nav-link" type="button">
            Home
          </button>
          <button onClick={goToContact} className="bt nav-link" type="button">
            Contact
          </button>
          <button onClick={goToAbout} className="bt nav-link" type="button">
            About
          </button>
        </div>
      </div>
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
        <button onClick={() => setIsModalOpen(true)} className="bt" type="button">
          Leave a Review
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-bg" onClick={() => setIsModalOpen(false)}>
          <div className="review-form" onClick={(e) => e.stopPropagation()}>
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
              <div className="ratings">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`star ${rating <= selectedRating ? 'selected' : ''}`}
                    data-value={rating}
                    onClick={() => handleStarClick(rating)}
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
