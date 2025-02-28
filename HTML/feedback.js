const feedbackForm = document.querySelector('.feedback-form');
const feedbackContainer = document.getElementById('feedbackContainer');
const nofeedbackText = document.getElementById('nofeedbackText');
const modalBg = document.querySelector('.modal-bg');
const stars = document.querySelectorAll('.star');

// Variables
let selectedRating = 0;

// Show the modal
document.getElementById('writeFeedbackBtn').addEventListener('click', () => {
  feedbackForm.style.display = 'block';
  modalBg.style.display = 'block';
});

// Close modal when clicking outside the form
modalBg.addEventListener('click', () => {
  feedbackForm.style.display = 'none';
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

document.getElementById('feedbackForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  if (selectedRating === 0) {
    alert('Please select a star rating!');
    return;
  }

  const feedback = document.createElement('div');
  feedback.classList.add('review');
  feedback.innerHTML = `
    <h4>${name} (${email})</h4>
    <p>Rating: ${'★'.repeat(selectedRating)} (${selectedRating} stars)</p>
    <p>${comment}</p>
  `;

  if (nofeedbackText) {
    nofeedbackText.style.display = 'none';
  }
  feedbackContainer.appendChild(feedback);

  feedbackForm.style.display = 'none';
  modalBg.style.display = 'none';
  document.getElementById('feedbackForm').reset();
  stars.forEach(star => star.classList.remove('selected')); 
  selectedRating = 0; 
});
