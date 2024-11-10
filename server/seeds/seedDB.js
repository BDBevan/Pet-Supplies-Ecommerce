// seeders/seed.js

const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/petstore', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Category.deleteMany({});
    await Product.deleteMany({});

    const categories = await Category.insertMany([

      { name: 'Food' },
      { name: 'Toys' },
      { name: 'Accessories' },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Premium Dog Food',
        description: 'High-quality food for dogs.',
        price: 29.99,
        stock: 50,
        category: categories[0]._id,
      },
      {
        name: 'Cat Toy Mouse',
        description: 'Fun toy for cats to chase and play with.',
        price: 5.99,
        stock: 100,
        category: categories[1]._id,
      },
      {
        name: 'Dog Collar',
        description: 'Adjustable collar for dogs of all sizes.',
        price: 15.99,
        stock: 30,
        category: categories[2]._id,
      },
    ]);



    console.log('Database seeded!');
    process.exit(0);

  } catch (err) {
    console.error('Error seeding database:', err);

    process.exit(1);
  }
};

seedDatabase();
