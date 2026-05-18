const express = require('express');
const { registerCustomer, loginCustomer, getMe, adminLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/customer/register', registerCustomer);
router.post('/customer/login', loginCustomer);
router.get('/customer/me', protect, getMe);
router.post('/admin/login', adminLogin);

module.exports = router;
