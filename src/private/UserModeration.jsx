import React, { useState } from "react";
import '../style/UserModeration.css'

const ProFixAdminDashboard = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "John Doe", text: "The plumber was on time and did a fantastic job!" },
    { id: 2, name: "Jane Smith", text: "The service was delayed, but the electrician was very professional." },
  ]);

  const activityLogs = [
    { id: 1, user: "John Doe", activity: "Submitted a review for plumbing services" },
    { id: 2, user: "Jane Smith", activity: "Updated her profile details" },
    { id: 3, user: "Alex Brown", activity: "Sent an inquiry about electrician services" },
  ];

  // Approve review function
  const approveReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
    alert("Review approved!");
  };

  // Delete review function
  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
    alert("Review deleted!");
  };

  return (
    <div className="main">
      <div className="header">
        <div className="logo"></div>
        <h1>ProFix Admin Dashboard</h1>
        <button className="adminLogout">Logout</button>
      </div>

      <div className="container">
        {/* Moderate Reviews Section */}
        <div className="section">
          <h2>Moderate Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="card">
                <h3>Review by {review.name}</h3>
                <p>"{review.text}"</p>
                <div className="actions">
                  <button className="btn" onClick={() => approveReview(review.id)}>Approve</button>
                  <button className="btn" onClick={() => deleteReview(review.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">No more reviews to moderate!</p>
          )}
        </div>

        {/* Monitor Activity Section */}
        <div className="section">
          <h2>Monitor Activity</h2>
          {activityLogs.map((log) => (
            <div key={log.id} className="card">
              <h3>User: {log.user}</h3>
              <p>Last Activity: {log.activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProFixAdminDashboard;

