const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Register a Customer
// @route   POST /api/v1/auth/customer/register
// @access  Public
exports.registerCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, email, password } = req.body;

        const userExists = await User.findOne({ phoneNumber });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists with this mobile number' });
        }

        const user = await User.create({
            name,
            phoneNumber,
            email,
            password
        });

        const token = user.getSignedJwtToken();

        // Remove password from output
        user.password = undefined;

        res.status(201).json({ success: true, token, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Customer Login
// @route   POST /api/v1/auth/customer/login
// @access  Public
exports.loginCustomer = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ success: false, message: 'Please provide a mobile number and password' });
        }

        const user = await User.findOne({ phoneNumber, isDeleted: false }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = user.getSignedJwtToken();
        user.password = undefined;

        res.status(200).json({ success: true, token, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get Current Customer Profile
// @route   GET /api/v1/auth/customer/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin Login
// @route   POST /api/v1/auth/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const admin = await Admin.findOne({ email, isDeleted: false }).select('+password');
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = admin.getSignedJwtToken();
        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
