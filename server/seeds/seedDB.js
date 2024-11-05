// seeders/seed.js
const mongoose = require('../config/connection');
const Category = require('../models/Category');
const Product = require('../models/Product'); // Assuming you have a Product model

const seedDatabase = async () => {
  try {
    await mongoose;

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create sample categories
    const categories = await Category.insertMany([
      { name: 'Dog Supplies' },
      { name: 'Cat Supplies' },
      { name: 'Bird Supplies' },
    ]);
    console.log('Categories seeded:', categories);

    // Create sample products (assuming you have a Product model)
    const products = await Product.insertMany([
      { name: 'Dog Food', price: 25.99, category: categories[0]._id },
      { name: 'Cat Litter', price: 15.99, category: categories[1]._id },
      { name: 'Bird Seed', price: 10.99, category: categories[2]._id },
    ]);
    console.log('Products seeded:', products);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
