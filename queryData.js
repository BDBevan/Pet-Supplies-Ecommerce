// queryData.js
const mongoose = require('./server/config/connection');
const Category = require('./server/models/Category');
const Product = require('./server/models/Product');

const queryData = async () => {
  try {
    await mongoose;

    const categories = await Category.find();
    console.log('Categories:', categories);

    const products = await Product.find().populate('category'); // Populate category field for product
    console.log('Products:', products);

    process.exit(0);
  } catch (error) {
    console.error('Error querying database:', error);
    process.exit(1);
  }
};

queryData();
