// Approve Review Mock Function
function approveReview(button) {
  const card = button.closest('.card');
  card.remove();
  checkNoReviews();
  alert('Review approved!');
}

// Delete Review Mock Function
function deleteReview(button) {
  const card = button.closest('.card');
  card.remove();
  checkNoReviews();
  alert('Review deleted!');
}

// Check if there are no reviews left
function checkNoReviews() {
  const reviewCards = document.querySelectorAll('.section:nth-child(1) .card');
  const noReviewsMessage = document.getElementById('no-reviews');
  if (reviewCards.length === 0) {
    noReviewsMessage.style.display = 'block';
  }
}