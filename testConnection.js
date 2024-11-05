// testConnection.js
const mongoose = require('./server/config/connection');
const Category = require('./server/models/Category');

(async () => {
  try {
    await mongoose; // Ensures the connection is established

    console.log('Connected to MongoDB successfully.');

    // Create a sample category
    const sampleCategory = await Category.create({ name: 'Sample Category' });
    console.log('Sample category created:', sampleCategory);

    // Retrieve all categories
    const categories = await Category.find();
    console.log('Retrieved categories:', categories);

    process.exit(0); // Exit the script
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
    process.exit(1); // Exit with failure code
  }
})();
