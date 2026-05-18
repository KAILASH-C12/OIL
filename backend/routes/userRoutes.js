const express = require('express');
const {
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    toggleWishlist,
    getWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require user auth
router.use(protect);

router.route('/profile')
    .put(updateProfile);

router.route('/addresses')
    .post(addAddress);

router.route('/addresses/:id')
    .put(updateAddress)
    .delete(deleteAddress);

router.route('/wishlist')
    .get(getWishlist)
    .post(toggleWishlist);

module.exports = router;
