const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, businessName, gstNumber, password } = req.body;
        
        const user = await User.findById(req.user._id).select('+password');
        
        if (name) user.name = name;
        if (email) user.email = email;
        if (businessName) user.businessName = businessName;
        if (gstNumber) user.gstNumber = gstNumber;
        
        // Update password if provided
        if (password) {
            user.password = password; // Will be hashed by pre-save hook
        }
        
        await user.save();
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json({ success: true, data: userResponse });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Add new address
// @route   POST /api/v1/users/addresses
// @access  Private
exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // If this is the first address or marked as default, unset other defaults
        if (req.body.isDefault || user.addresses.length === 0) {
            req.body.isDefault = true;
            user.addresses.forEach(addr => addr.isDefault = false);
        }
        
        user.addresses.push(req.body);
        await user.save();
        
        res.status(201).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update address
// @route   PUT /api/v1/users/addresses/:id
// @access  Private
exports.updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const address = user.addresses.id(req.params.id);
        
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        
        // If marking as default, unset others
        if (req.body.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }
        
        Object.assign(address, req.body);
        await user.save();
        
        res.status(200).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/v1/users/addresses/:id
// @access  Private
exports.deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.id);
        
        // If we deleted the default address and there are others left, make the first one default
        if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
            user.addresses[0].isDefault = true;
        }
        
        await user.save();
        
        res.status(200).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Toggle item in wishlist
// @route   POST /api/v1/users/wishlist
// @access  Private
exports.toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);
        
        const index = user.wishlist.indexOf(productId);
        if (index === -1) {
            user.wishlist.push(productId);
        } else {
            user.wishlist.splice(index, 1);
        }
        
        await user.save();
        
        // Populate wishlist before sending
        await user.populate('wishlist');
        
        res.status(200).json({ success: true, data: user.wishlist });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/v1/users/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({ success: true, data: user.wishlist });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
