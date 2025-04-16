const mongoose = require('mongoose');
const { MONGO_URI } = process.env; // Load MongoDB URI from .env

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose; // Export mongoose instance for use in other parts of the app
