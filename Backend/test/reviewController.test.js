const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const reviewController = require('../controller/reviewController');
const Review = require('../model/Review');

// Create an Express app for testing
const app = express();
app.use(express.json());

// Mock routes
app.post('/reviews', reviewController.createReview);
app.get('/reviews', reviewController.getReviews);
app.get('/reviews/:id', reviewController.getReview);
app.put('/reviews/:id', reviewController.updateReview);
app.delete('/reviews/:id', reviewController.deleteReview);

// Mock the Review model
const dbMock = new SequelizeMock();
const ReviewMock = dbMock.define('Review', {
    reviewID: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    service: 'Plumbing',
    rating: 5,
    comment: 'Excellent service!',
});

// Mock Review model methods
Review.findAll = jest.fn().mockResolvedValue([
    { reviewID: 1, name: 'John Doe', email: 'johndoe@example.com', service: 'Plumbing', rating: 5, comment: 'Excellent service!' }
]);

Review.findByPk = jest.fn((id) => {
    if (id === "1") {
        return Promise.resolve({
            reviewID: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            service: 'Plumbing',
            rating: 5,
            comment: 'Excellent service!',
            save: jest.fn().mockResolvedValue(true),
            destroy: jest.fn().mockResolvedValue(true)
        });
    }
    return Promise.resolve(null);
});

Review.create = jest.fn().mockImplementation((reviewData) => {
    return Promise.resolve({ ...reviewData, reviewID: 2 });
});

describe('Review Controller Unit Tests', () => {

    test('Should create a review successfully', async () => {
        const response = await request(app)
            .post('/reviews')
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                service: 'Electrical Repair',
                rating: 4,
                comment: 'Great service, but room for improvement.',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Review created successfully');
        expect(response.body.review.name).toBe('Jane Doe');
    });

    test('Should fetch all reviews', async () => {
        const response = await request(app).get('/reviews');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should fetch a specific review by ID', async () => {
        const response = await request(app).get('/reviews/1');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John Doe');
    });

    test('Should return 404 when fetching a non-existent review', async () => {
        const response = await request(app).get('/reviews/99');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Review not found');
    });

    test('Should update a review successfully', async () => {
        const response = await request(app)
            .put('/reviews/1')
            .send({ rating: 3, comment: 'Updated review' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Review updated successfully');
    });

    test('Should return 404 when updating a non-existent review', async () => {
        const response = await request(app)
            .put('/reviews/99')
            .send({ rating: 3, comment: 'Updated review' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Review not found');
    });

    test('Should delete a review successfully', async () => {
        const response = await request(app).delete('/reviews/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Review deleted successfully');
    });

    test('Should return 404 when deleting a non-existent review', async () => {
        const response = await request(app).delete('/reviews/99');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Review not found');
    });

});
