const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        const count = await Category.countDocuments();
        if (count === 0) {
            await Category.insertMany([
                { name: 'Mustard Oil', description: 'Pure cold pressed mustard oil', isActive: true },
                { name: 'Refined Soybean Oil', description: 'Light refined oil', isActive: true },
                { name: 'Sunflower Oil', description: 'Healthy sunflower oil', isActive: true },
                { name: 'Olive Oil', description: 'Premium olive oil', isActive: true }
            ]);
            console.log('Categories seeded successfully!');
        } else {
            console.log('Categories already exist.');
        }
    } catch (err) {
        console.error(err);
    }
    process.exit();
});
