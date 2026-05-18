const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, 'Please add a business name']
    },
    contactPerson: {
        type: String,
        required: [true, 'Please add a contact person name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    gstNumber: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    estimatedOrderQuantity: {
        type: String,
        required: [true, 'Please specify estimated volume (e.g., 500L/month)']
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
