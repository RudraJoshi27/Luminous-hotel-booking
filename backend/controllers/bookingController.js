const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

const createBooking = async (req, res, next) => {
  try {
    const { hotelId, roomNumber, checkIn, checkOut, totalPrice } = req.body;
    
    // Simple availability check could be added here
    
    const newBooking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      roomNumber,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      totalPrice,
      status: 'confirmed'
    });

    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hotel')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.status(200).json({ message: 'Booking cancelled successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking };
