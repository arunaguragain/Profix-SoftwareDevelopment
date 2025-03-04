const Inquiry = require('../model/inquiry');

// Create new inquiry
const createInquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const inquiry = await Inquiry.create({
            name,
            email,
            subject,
            message
        });
        res.status(201).json({
            success: true,
            message: "Inquiry created successfully",
            data: inquiry
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create inquiry",
            error: error.message
        });
    }
};

// Get all inquiries
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll();
        res.status(200).json({
            success: true,
            data: inquiries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries",
            error: error.message
        });
    }
};

// Get single inquiry by ID
const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }
        res.status(200).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch inquiry",
            error: error.message
        });
    }
};

// Update inquiry
const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        const updatedInquiry = await inquiry.update(req.body);
        res.status(200).json({
            success: true,
            message: "Inquiry updated successfully",
            data: updatedInquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update inquiry",
            error: error.message
        });
    }
};

// Delete inquiry
const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        await inquiry.destroy();
        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete inquiry",
            error: error.message
        });
    }
};

module.exports = {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry
};