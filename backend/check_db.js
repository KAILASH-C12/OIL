const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const Category = require('./models/Category');

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        
        const catCount = await Category.countDocuments();
        console.log('Categories count:', catCount);
        
        const prodCount = await Product.countDocuments();
        console.log('Products count:', prodCount);
        
        if (prodCount > 0) {
            const products = await Product.find({}).limit(5);
            console.log('Sample products:');
            products.forEach(p => {
                console.log(`- ${p.name} (status: ${p.status}, isDeleted: ${p.isDeleted}, image: ${p.image})`);
            });
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

check();
