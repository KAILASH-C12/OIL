const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        },
        variantId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        name: String,
        size: String,
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        addressLine1: String,
        city: String,
        state: String,
        pincode: String,
        type: {
            type: String,
            enum: ['Shop', 'Warehouse', 'Home']
        }
    },
    status: {
        type: String,
        enum: ['Placed', 'OTP Verified', 'Admin Approved', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled', 'Rejected', 'Returned'],
        default: 'Placed',
        index: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD'],
        default: 'COD'
    },
    estimatedDeliveryDate: {
        type: Date
    },
    customerNotes: {
        type: String
    },
    adminNotes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
