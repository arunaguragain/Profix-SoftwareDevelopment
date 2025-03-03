import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ReviewsAndRatings.css';

const API_BASE_URL = "http://localhost:5001/reviews";  // Change for deployment

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null); // Store review ID for editing

  const navigate = useNavigate();

  // Fetch reviews from backend on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the auth token from localStorage

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token with the request
          },
        });

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle star click for rating selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handle form submit (for adding or updating reviews)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const { name, email, service, comment } = formData;
    const newReview = { name, email, service, rating: selectedRating, comment };
    const token = localStorage.getItem("token");  // Get the auth token

    if (!token) {
      alert("Please log in to leave a review.");
      return;
    }

    try {
      if (isEditMode) {
        // Update the review if we are in edit mode
        const response = await axios.put(`${API_BASE_URL}/${selectedReviewId}`, newReview, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Updated Review:", response.data); // Log the updated review response

        // Update reviews list with the updated review
        setReviews((prev) =>
          prev.map((review) =>
            review.reviewID === selectedReviewId ? { ...review, ...newReview } : review  // Use review.reviewID instead of review.id
          )
        );

        setIsEditMode(false);
        setSelectedReviewId(null);  // Reset selectedReviewId after editing
      } else {
        // Submit a new review if not in edit mode
        const response = await axios.post(`${API_BASE_URL}/create`, newReview, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("New Review Added:", response.data); // Log the new review response

        // Update UI after submission by adding the new review to the top
        setReviews((prev) => [newReview, ...prev]);
      }

      setFormData({ name: '', email: '', service: '', comment: '' });
      setSelectedRating(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to delete a review.");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted review from the UI
      setReviews((prev) => prev.filter(review => review.reviewID !== reviewId));  // Use review.reviewID instead of review.id
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Handle edit review
  const handleEditReview = (review) => {
    console.log("Editing review:", review);  // Make sure review object is logged correctly

    // Check if review.reviewID exists, log an error if not
    if (!review || !review.reviewID) {
      console.error("Review or review ID is missing:", review); // Log the whole review object for debugging
      return;
    }

    setFormData({
      name: review.name,
      email: review.email,
      service: review.service,
      comment: review.comment,
    });

    setSelectedRating(review.rating);
    setIsModalOpen(true);
    setIsEditMode(true);
    
    // Set the review ID for future use (i.e., when submitting the form to update the review)
    setSelectedReviewId(review.reviewID);  // Use review.reviewID instead of review.id
  };

  return (
    <div className="main">
      {/* Navbar */}
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={() => navigate('/')} className="bt nav-link">Home</button>
          <button onClick={() => navigate('/contact')} className="bt nav-link">Contact</button>
          <button onClick={() => navigate('/aboutus')} className="bt nav-link">About us</button>
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
                <div className="review-actions">
                  <button onClick={() => handleEditReview(review)} className="bt1">Edit</button>
                  <button onClick={() => handleDeleteReview(review.reviewID)} className="bt2">Delete</button>  {/* Use review.reviewID instead of review.id */}
                </div>
              </div>
            ))
          )}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bt3">Leave a Review</button>
      </div>

      {/* Modal for Review Form */}
      {isModalOpen && (
        <div className="modal-bg" onClick={() => setIsModalOpen(false)}>
          <div className="review-form" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setIsModalOpen(false)}>✖</span>
            <h2>{isEditMode ? 'Edit Review' : 'Leave a Review'}</h2>
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
              <button type="submit">{isEditMode ? 'Update' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
