const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authorization');
const { createReview, getReviews, getReview, updateReview, deleteReview } = require('../controller/reviewController.js');

// Create a review (requires authentication)
router.post('/create', authMiddleware(), async (req, res) => {
    await createReview(req, res);
});

// Get all reviews (requires authentication)
router.get('/', authMiddleware(), async (req, res) => {
    await getReviews(req, res);
});

// Get a single review by ID (requires authentication)
router.get('/:id', authMiddleware(), async (req, res) => {
    await getReview(req, res);
});

// Update a review by ID (requires authentication)
router.put('/:id', authMiddleware(), async (req, res) => {
    await updateReview(req, res);
});

// Delete a review by ID (requires authentication)
router.delete('/:id', authMiddleware(), async (req, res) => {
    await deleteReview(req, res);
});

module.exports = router;
