const Order = require('../models/Order');
const PDFDocument = require('pdfkit');

// @desc    Generate Invoice PDF
// @route   GET /api/v1/invoices/:orderId
// @access  Private (Admin)
exports.generateInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'name phoneNumber gstNumber businessName');
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const doc = new PDFDocument({ margin: 50 });
        
        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`);
        
        doc.pipe(res);
        
        // Add Company Details
        doc.fontSize(20).text('Premium Oils Distribution', { align: 'center' });
        doc.fontSize(10).text('123 Industrial Area, Phase 1, New Delhi, India 110020', { align: 'center' });
        doc.moveDown();
        
        // Add Invoice Header
        doc.fontSize(16).text('TAX INVOICE', { align: 'center', underline: true });
        doc.moveDown();
        
        // Customer Details
        doc.fontSize(12).text(`Order ID: ${order._id}`);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
        doc.text(`Payment: ${order.paymentMethod}`);
        doc.moveDown();
        
        if (order.user) {
            doc.text(`Customer Name: ${order.user.businessName || order.user.name || 'Guest'}`);
            doc.text(`Phone: ${order.user.phoneNumber}`);
            if (order.user.gstNumber) doc.text(`GST No: ${order.user.gstNumber}`);
        }
        doc.moveDown();
        
        // Items Table Header
        doc.fontSize(12).text('Item Description', 50, doc.y, { width: 250, continued: true });
        doc.text('Qty', 300, doc.y, { width: 50, continued: true });
        doc.text('Price', 350, doc.y, { width: 100, continued: true });
        doc.text('Total', 450, doc.y);
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);
        
        // Items
        order.items.forEach(item => {
            const itemTotal = item.quantity * item.price;
            doc.fontSize(10).text(`${item.name} (${item.size})`, 50, doc.y, { width: 250, continued: true });
            doc.text(item.quantity.toString(), 300, doc.y, { width: 50, continued: true });
            doc.text(`Rs ${item.price}`, 350, doc.y, { width: 100, continued: true });
            doc.text(`Rs ${itemTotal}`, 450, doc.y);
            doc.moveDown(0.5);
        });
        
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();
        
        // Total
        doc.fontSize(14).text(`Total Amount: Rs ${order.totalAmount}`, { align: 'right' });
        
        doc.end();
        
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};
