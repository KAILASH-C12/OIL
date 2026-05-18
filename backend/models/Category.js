const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        default: ''
    },
    description: {
        type: String
    },
    icon: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Auto-generate slug from name if not provided
CategorySchema.pre('save', function(next) {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Category', CategorySchema);
