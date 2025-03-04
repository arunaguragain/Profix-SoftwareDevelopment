const express = require('express');
const router = express.Router();
const {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry
} = require('../controller/inquiryController');

// Create new inquiry
router.post('/create', createInquiry);

// Get all inquiries
router.get('/all', getAllInquiries);

// Get single inquiry by ID
router.get('/:id', getInquiryById);

// Update inquiry
router.put('/:id', updateInquiry);

// Delete inquiry
router.delete('/:id', deleteInquiry);

module.exports = router;