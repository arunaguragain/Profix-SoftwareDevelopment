const Review = require('../model/Review.js');

// Create a review
const createReview = async (req, res) => {
    try {
        const { name, email, service, rating, comment } = req.body;

        // Create a new review
        const review = await Review.create({ name, email, service, rating, comment });

        res.status(201).json({ message: 'Review created successfully', review });
    } catch (err) {
        res.status(500).json({ message: 'Error creating review', error: err.message });
    }
};

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
};

// Get a specific review
const getReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching review', error: err.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findByPk(req.params.id);
        if (review) {
            review.rating = rating;
            review.comment = comment;
            await review.save();
            res.status(200).json({ message: 'Review updated successfully', review });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating review', error: err.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            await review.destroy();
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
};

module.exports = { createReview, getReviews, getReview, updateReview, deleteReview };
