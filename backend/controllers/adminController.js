const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Admin = require('../models/Admin');

// @desc    Get all registered customers
// @route   GET /api/v1/admin/customers
// @access  Private (Admin)
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({ isDeleted: false }).select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Register Admin (Bootstrap only)
// @route   POST /api/v1/admin/register
// @access  Public
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        const adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ success: false, message: 'Admin already exists' });
        
        const admin = await Admin.create({ name, email, password, role });
        const token = admin.getSignedJwtToken();
        res.status(201).json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Login Admin
// @route   POST /api/v1/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = admin.getSignedJwtToken();
        res.status(200).json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get current logged in admin
// @route   GET /api/v1/admin/me
// @access  Private (Admin)
exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
        res.status(200).json({ success: true, data: admin });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get Dashboard Analytics
// @route   GET /api/v1/admin/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalCustomers = await User.countDocuments({ isDeleted: false });
        const totalProducts = await Product.countDocuments({ isDeleted: false });

        // Calculate Revenue (Only Delivered/Paid orders normally, but using all for now)
        const orders = await Order.find({ status: { $ne: 'Cancelled' } });
        const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Best selling product sizes (aggregate from orders)
        // Simple aggregate for MVP
        const topProducts = await Order.aggregate([
            { $unwind: '$items' },
            { $group: { _id: '$items.name', totalQuantity: { $sum: '$items.quantity' }, revenue: { $sum: '$items.price' } } },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalOrders,
                totalCustomers,
                totalProducts,
                revenue,
                topProducts
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Manual Order Entry
// @route   POST /api/v1/admin/orders
// @access  Private (Admin)
exports.createManualOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress, adminNotes } = req.body;
        
        let user = null;
        if (userId) {
            user = await User.findById(userId);
        }
        
        if (!user) {
            // If no user exists, create a guest user or handle accordingly
            // For MVP, just return error
            return res.status(400).json({ success: false, message: 'Please provide a valid user ID for manual order' });
        }

        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: 'COD',
            status: 'Admin Approved', // Pre-approved since admin is entering it
            adminNotes
        });

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
