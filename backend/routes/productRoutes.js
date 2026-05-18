const express = require('express');
const { getProducts, getProduct, updateVariantPrice, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(adminProtect, createProduct);

router.route('/:id')
    .get(getProduct)
    .put(adminProtect, updateProduct)
    .delete(adminProtect, deleteProduct);

router.route('/:id/variants/:variantId/price').put(adminProtect, updateVariantPrice);

module.exports = router;
