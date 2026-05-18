const express = require('express');
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(createInquiry) // Public route for website form
    .get(adminProtect, getInquiries); // Admin route to view them

router.route('/:id/status')
    .put(adminProtect, updateInquiryStatus);

module.exports = router;
