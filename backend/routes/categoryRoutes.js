const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(adminProtect, createCategory);

router.route('/:id')
    .put(adminProtect, updateCategory)
    .delete(adminProtect, deleteCategory);

module.exports = router;
