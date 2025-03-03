const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { fullName, address, email, contact, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userRole = role || 'user';

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            fullName,
            address,
            email,
            contact,
            password: hashedPassword,
            role: userRole
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.userId, email: user.email, role: user.role },
            'your_jwt_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, userId: user.userId, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        
        const user = await User.findOne({ where: { userId: decoded.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ fullName: user.fullName, email: user.email, address: user.address, contact: user.contact, profilePicture: user.profilePicture });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving profile', error: err.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { fullName, address, email, contact } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        
        const user = await User.findOne({ where: { userId: decoded.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullName = fullName || user.fullName;
        user.address = address || user.address;
        user.email = email || user.email;
        user.contact = contact || user.contact;

        if (req.file) {
            user.profilePicture = req.file.path;
        }
        
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
};

// Update profile picture
// const updateProfilePicture = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, 'your_jwt_secret_key');

//         const user = await User.findOne({ where: { userId: decoded.userId } });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         user.profilePicture = req.file.path;
//         await user.save();

//         res.status(200).json({ message: 'Profile picture updated successfully', profilePictureUrl: user.profilePicture });
//     } catch (err) {
//         res.status(500).json({ message: 'Error updating profile picture', error: err.message });
//     }
// };

const updateProfilePicture = async (req, res) => {
    try {
        // Get the token from Authorization header
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret_key'); 

        // Find user in the database using the decoded userId
        const user = await User.findOne({ where: { userId: decoded.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Assuming the image is uploaded via multer
        const profilePictureUrl = req.file.path; // File path saved by multer

        // Update user's profile picture URL in the database
        user.profilePicture = profilePictureUrl;
        await user.save();

        // Return the updated profile picture URL
        res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePictureUrl,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating profile picture',
            error: err.message,
        });
    }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile, updateProfilePicture };