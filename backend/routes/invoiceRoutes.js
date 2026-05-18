const express = require('express');
const { generateInvoice } = require('../controllers/invoiceController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:orderId').get(adminProtect, generateInvoice);

module.exports = router;
