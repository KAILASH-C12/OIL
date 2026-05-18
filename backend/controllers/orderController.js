const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private (Customer)
exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, customerNotes } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No order items' });
        }
        
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress,
            customerNotes,
            paymentMethod: 'COD',
            status: 'Placed'
        });
        
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/v1/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name phoneNumber email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private (Customer)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.product', 'name image');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Inventory deduction logic
        if (status === 'Approved' && order.status === 'Placed') {
            for (const item of order.items) {
                await Product.findOneAndUpdate(
                    { _id: item.product, 'variants._id': item.variantId },
                    { $inc: { 'variants.$.stockQuantity': -item.quantity } }
                );
            }
        }

        // Inventory restoration logic if cancelled
        if (status === 'Cancelled' && (order.status === 'Approved' || order.status === 'Packed')) {
             for (const item of order.items) {
                await Product.findOneAndUpdate(
                    { _id: item.product, 'variants._id': item.variantId },
                    { $inc: { 'variants.$.stockQuantity': item.quantity } }
                );
            }
        }

        order.status = status;
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
