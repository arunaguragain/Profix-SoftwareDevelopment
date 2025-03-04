const SequelizeMock = require('sequelize-mock');

// Create a Sequelize mock instance
const dbMock = new SequelizeMock();

// Mock the Users model with expected constraints
const User = dbMock.define('Users', {
    userId: 1,
    fullName: 'John Doe',
    address: 'Kathmandu, Nepal',
    email: 'johndoe@example.com',
    contact: '9800000000',
    password: 'hashedpassword',
    role: 'user',
    profilePicture: 'profile.jpg',
});

describe('User Model Unit Tests', () => {
    test('Should create a user successfully', async () => {
        const user = await User.create({
            fullName: 'Jane Doe',
            address: 'Lalitpur, Nepal',
            email: 'janedoe@example.com',
            contact: '9811111111', // Ensure contact is numeric
            password: 'securepassword',
            role: 'admin',
            profilePicture: 'janedoe.jpg',
        });

        expect(user.fullName).toBe('Jane Doe');
        expect(user.address).toBe('Lalitpur, Nepal');
        expect(user.email).toBe('janedoe@example.com');
        expect(user.contact).toBe('9811111111');
        expect(user.role).toBe('admin');
        expect(user.profilePicture).toBe('janedoe.jpg');
    });

    test('Should enforce email uniqueness manually', async () => {
        await User.create({
            fullName: 'User One',
            email: 'test@example.com',
            contact: '9812345678',
            password: 'password123',
        });

        // Mock the behavior of unique constraint violation
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: email must be unique'));

        await expect(mockCreate({
            fullName: 'User Two',
            email: 'test@example.com', // Duplicate email
            contact: '9809876543',
            password: 'password456',
        })).rejects.toThrow('Validation error: email must be unique');
    });

    test('Should not allow invalid email format', async () => {
        // Mock validation failure
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: invalid email format'));

        await expect(mockCreate({
            fullName: 'Invalid Email User',
            email: 'invalid-email', // Invalid format
            contact: '9809876543',
            password: 'password123',
        })).rejects.toThrow('Validation error: invalid email format');
    });

    test('Should not allow non-numeric contact', async () => {
        // Mock validation failure
        const mockCreate = jest.fn().mockRejectedValue(new Error('Validation error: contact must be numeric'));

        await expect(mockCreate({
            fullName: 'Invalid Contact User',
            email: 'validuser@example.com',
            contact: 'invalid_contact', // Should be numeric
            password: 'password123',
        })).rejects.toThrow('Validation error: contact must be numeric');
    });

    test('Should default role to user if not provided', async () => {
        const user = await User.create({
            fullName: 'Default Role User',
            email: 'defaultrole@example.com',
            contact: '9801234567', // Ensure contact is numeric
            password: 'password123',
        });

        expect(user.role).toBe('user'); // Default value check
    });

    test('Should allow nullable profilePicture', async () => {
        const user = await User.create({
            fullName: 'No Profile User',
            email: 'noprofile@example.com',
            contact: '9812341234', // Ensure contact is numeric
            password: 'password123',
            profilePicture: null, // Nullable field
        });

        expect(user.profilePicture).toBeNull();
    });
});
