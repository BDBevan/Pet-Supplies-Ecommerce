// config/connection.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bradleybevan:happy@booksaver.l4euo.mongodb.net/?retryWrites=true&w=majority&appName=BookSaver"
);

module.exports = mongoose.connection;
