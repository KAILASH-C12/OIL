require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function test() {
    try {
        // Connect to the Atlas database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected');
        
        // Mock a category ID
        const categoryId = new mongoose.Types.ObjectId();
        
        const product = await Product.create({
            name: 'Test Product',
            description: 'Test Desc',
            brand: 'Test Brand',
            category: categoryId,
            variants: [{
                size: '1L',
                price: 100,
                wholesalePrice: 90,
                sku: 'TEST-SKU-1'
            }]
        });
        
        console.log('Success:', product.slug);
    } catch (err) {
        console.error('Error:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        await mongoose.disconnect();
    }
}

test();
