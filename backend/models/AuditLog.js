const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin',
        required: true
    },
    action: {
        type: String, // e.g., 'UPDATE_PRICE', 'APPROVE_ORDER', 'DELETE_PRODUCT'
        required: true
    },
    details: {
        type: String,
        required: true
    },
    targetId: {
        type: mongoose.Schema.ObjectId, // ID of the product/order affected
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
