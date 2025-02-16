// Elements
const reviewForm = document.querySelector('.review-form');
const reviewsContainer = document.getElementById('reviewsContainer');
const noReviewsText = document.getElementById('noReviewsText');
const modalBg = document.querySelector('.modal-bg');
const stars = document.querySelectorAll('.star');

// Variables
let selectedRating = 0;

// Show the modal
document.getElementById('leaveReviewBtn').addEventListener('click', () => {
  reviewForm.style.display = 'block';
  modalBg.style.display = 'block';
});

// Close modal when clicking outside the form
modalBg.addEventListener('click', () => {
  reviewForm.style.display = 'none';
  modalBg.style.display = 'none';
});

// Add star rating functionality
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value); // Save the selected rating
    stars.forEach(s => s.classList.remove('selected')); // Clear previous selection
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add('selected'); // Highlight stars up to the selected one
    }
  });
});

// Submit form and add review
document.getElementById('reviewForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const service = document.getElementById('service').value;
  const comment = document.getElementById('comment').value;

  if (selectedRating === 0) {
    alert('Please select a star rating!');
    return;
  }

  // Create a review element
  const review = document.createElement('div');
  review.classList.add('review');
  review.innerHTML = `
    <h4>${name} (${service})</h4>
    <p>Rating: ${'★'.repeat(selectedRating)} (${selectedRating} stars)</p>
    <p>${comment}</p>
  `;

  // Add the review and hide "No reviews yet" text
  if (noReviewsText) {
    noReviewsText.style.display = 'none';
  }
  reviewsContainer.appendChild(review);

  // Reset the form and hide modal
  reviewForm.style.display = 'none';
  modalBg.style.display = 'none';
  document.getElementById('reviewForm').reset();
  stars.forEach(star => star.classList.remove('selected')); // Reset stars
  selectedRating = 0; // Reset the rating
});
