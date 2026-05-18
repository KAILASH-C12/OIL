const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private (Admin)
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete category (Soft Delete)
// @route   DELETE /api/v1/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
