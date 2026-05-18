const Inquiry = require('../models/Inquiry');

// @desc    Submit new wholesale inquiry
// @route   POST /api/v1/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json({ success: true, data: inquiry });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all inquiries
// @route   GET /api/v1/inquiries
// @access  Private (Admin)
exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/v1/inquiries/:id/status
// @access  Private (Admin)
exports.updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true, runValidators: true }
        );

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        res.status(200).json({ success: true, data: inquiry });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
