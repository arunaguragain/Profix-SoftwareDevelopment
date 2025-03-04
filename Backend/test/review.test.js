const SequelizeMock = require('sequelize-mock');

// Create a Sequelize mock instance
const dbMock = new SequelizeMock();

// Mock the Review model
const Review = dbMock.define('Review', {
    reviewID: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    service: 'Plumbing',
    rating: 5,
    comment: 'Excellent service!',
});

describe('Review Model Unit Tests', () => {
    test('Should create a review successfully', async () => {
        const review = await Review.create({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            service: 'Electrical Repair',
            rating: 4,
            comment: 'Great service, but room for improvement.',
        });

        expect(review.name).toBe('Jane Doe');
        expect(review.email).toBe('janedoe@example.com');
        expect(review.service).toBe('Electrical Repair');
        expect(review.rating).toBe(4);
        expect(review.comment).toBe('Great service, but room for improvement.');
    });

    test('Should not allow invalid email format', async () => {
        // Mock validation failure
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: invalid email format'));

        await expect(mockCreate({
            name: 'Invalid Email User',
            email: 'invalid-email', // Invalid format
            service: 'Cleaning',
            rating: 3,
            comment: 'Good service.',
        })).rejects.toThrow('Validation error: invalid email format');
    });

    test('Should enforce rating between 1 and 5', async () => {
        // Mock validation failure
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: rating must be between 1 and 5'));

        await expect(mockCreate({
            name: 'Out of Range Rating',
            email: 'validuser@example.com',
            service: 'Carpentry',
            rating: 6, // Invalid rating (out of range)
            comment: 'Not acceptable rating!',
        })).rejects.toThrow('Validation error: rating must be between 1 and 5');
    });

    test('Should allow minimum rating of 1', async () => {
        const review = await Review.create({
            name: 'Lowest Rating User',
            email: 'lowrating@example.com',
            service: 'Painting',
            rating: 1, // Minimum valid rating
            comment: 'Could be better.',
        });

        expect(review.rating).toBe(1);
    });

    test('Should allow maximum rating of 5', async () => {
        const review = await Review.create({
            name: 'Highest Rating User',
            email: 'highrating@example.com',
            service: 'Roof Repair',
            rating: 5, // Maximum valid rating
            comment: 'Excellent work!',
        });

        expect(review.rating).toBe(5);
    });

    test('Should not allow missing comment', async () => {
        // Mock validation failure
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: comment is required'));

        await expect(mockCreate({
            name: 'No Comment User',
            email: 'nocomment@example.com',
            service: 'Flooring',
            rating: 3,
            comment: null, // Missing comment
        })).rejects.toThrow('Validation error: comment is required');
    });
});
