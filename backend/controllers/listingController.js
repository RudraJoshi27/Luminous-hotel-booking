const Hotel = require('../models/Hotel');
const { verifyToken } = require('../middleware/verifyToken');

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel({ ...req.body, ownerId: req.user.id });
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const getMyHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.user.id });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

module.exports = { createHotel, getMyHotels, verifyToken };
