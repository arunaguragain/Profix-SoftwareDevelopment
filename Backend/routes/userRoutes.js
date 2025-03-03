const express = require('express');
const router = express.Router();
const upload = require('../middleware/imageUpload.js');
const authMiddleware = require('../middleware/authorization.js');
const { 
    registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    updateProfilePicture 
} = require('../controller/userController.js');

router.post('/register', registerUser);  

router.post('/login', loginUser);  


router.get('/profile', authMiddleware(), getProfile);

router.put('/profile', authMiddleware(), upload.single('profilePic'), updateProfile);

router.put('/profile/picture', authMiddleware(), upload.single('profilePic'), updateProfilePicture);

module.exports = router;
