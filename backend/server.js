const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

// Import models to ensure they are loaded
require('./models/User');
require('./models/Hotel');
require('./models/Room');
require('./models/Booking');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve hotel_images from the root directory
app.use('/hotel_images', express.static(path.join(__dirname, '../hotel_images')));

// Database connection
const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

// Routes
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const listingsRoute = require('./routes/listings');
const bookingRoute = require('./routes/booking');
const usersRoute = require('./routes/users');

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/listings', listingsRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
