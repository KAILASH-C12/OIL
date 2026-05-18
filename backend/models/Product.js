const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    gstPercentage: {
        type: Number,
        default: 5
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Hidden'],
        default: 'Draft'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    variants: [{
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        wholesalePrice: {
            type: Number,
            required: true
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            sparse: true
        },
        stockStatus: {
            type: String,
            enum: ['In Stock', 'Low Stock', 'Out of Stock'],
            default: 'In Stock'
        },
        stockQuantity: {
            type: Number,
            default: 0
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
