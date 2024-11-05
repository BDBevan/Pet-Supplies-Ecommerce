const db = require("../config/connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    // Clean existing data
    await cleanDB("User", "users");
    await cleanDB("Product", "products");
    await cleanDB("Category", "categories");

    // Create categories
    const categories = await Category.insertMany([
      { name: "Dog Food", petType: "dog" },
      { name: "Dog Toys", petType: "dog" },
      { name: "Dog Accessories", petType: "dog" },
      { name: "Cat Food", petType: "cat" },
      { name: "Cat Toys", petType: "cat" },
      { name: "Cat Accessories", petType: "cat" },
    ]);

    console.log("Categories seeded");

    // Create sample products
    const products = await Product.insertMany([
      {
        name: "Premium Dog Food",
        description: "High-quality dog food for all breeds",
        price: 29.99,
        quantity: 50,
        category: categories[0]._id,
        image: "dog-food.jpg",
        petType: "dog",
      },
      {
        name: "Interactive Cat Toy",
        description: "Engaging toy for cats",
        price: 12.99,
        quantity: 30,
        category: categories[4]._id,
        image: "cat-toy.jpg",
        petType: "cat",
      },
      // Add more products as needed
    ]);

    console.log("Products seeded");

    // Create users
    const users = await User.insertMany([
      {
        username: "testuser1",
        email: "test1@test.com",
        password: "password12345",
        orders: [],
      },
      {
        username: "testuser2",
        email: "test2@test.com",
        password: "password12345",
        orders: [],
      },
    ]);

    console.log("Users seeded");

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
