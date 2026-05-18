const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // We might need to differentiate between Admin and User based on role in decoded token,
        // but for now, we assume this is customer protect for ordering.
        if (decoded.role === 'Customer') {
            req.user = await User.findById(decoded.id);
        } else {
             return res.status(401).json({ success: false, message: 'Not authorized as customer' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

const Admin = require('../models/Admin');

exports.adminProtect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (['Super Admin', 'Manager', 'Order Staff', 'Inventory Staff'].includes(decoded.role)) {
            req.admin = await Admin.findById(decoded.id);
            next();
        } else {
             return res.status(401).json({ success: false, message: 'Not authorized as admin' });
        }
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};
