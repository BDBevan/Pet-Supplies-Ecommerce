// config/connection.js
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/petstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
