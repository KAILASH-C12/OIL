const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const imageMap = {
    'Premium Kachi Ghani Mustard Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87d5?w=600&q=80',
    'Refined Sunflower Oil': 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80',
    'Refined Soybean Oil': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
    'Pure Groundnut Oil': 'https://images.unsplash.com/photo-1534483509719-2c348a57bc1e?w=600&q=80',
    'Physically Refined Rice Bran Oil': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&q=80',
    'Virgin Coconut Oil': 'https://images.unsplash.com/photo-1526946663404-16a98c070a00?w=600&q=80',
    'Cold Pressed Sesame Oil': 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&q=80',
    'Blended Cooking Oil': 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=600&q=80',
    'Organic Cold Pressed Mustard Oil': 'https://images.unsplash.com/photo-1583922606661-0822ed0bd916?w=600&q=80',
    'Industrial Palm Oil': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80',
};

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        for (const [name, imageUrl] of Object.entries(imageMap)) {
            const result = await Product.updateOne(
                { name, image: 'no-photo.jpg' },
                { $set: { image: imageUrl } }
            );
            if (result.modifiedCount > 0) {
                console.log(`✅ Updated image for: ${name}`);
            } else {
                console.log(`⏭️  Skipped (already has image or not found): ${name}`);
            }
        }

        console.log('\n🎉 Image update complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
};

updateImages();
