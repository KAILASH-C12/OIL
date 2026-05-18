const express = require('express');
const { getAnalytics, createManualOrder, loginAdmin, registerAdmin, getMe, getAllCustomers } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Should ideally be protected in production

// Protected routes
router.use(adminProtect);
router.get('/me', getMe);
router.get('/customers', getAllCustomers);
router.route('/analytics').get(getAnalytics);
router.route('/orders').post(createManualOrder);

module.exports = router;
