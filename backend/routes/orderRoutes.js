const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus, getMyOrders } = require('../controllers/orderController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/')
    .post(protect, createOrder)
    .get(adminProtect, getAllOrders);

router.route('/:id/status')
    .put(adminProtect, updateOrderStatus);

module.exports = router;
