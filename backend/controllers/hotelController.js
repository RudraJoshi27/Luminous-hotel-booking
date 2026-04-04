const Hotel = require('../models/Hotel');

const getHotels = async (req, res, next) => {
  const { min, max, limit, city, rating, stars, sort } = req.query;
  
  // Start with a clean query — NEVER spread unknown query params into MongoDB query
  let query = {};

  // City partial match
  if (city) {
    query.city = { $regex: new RegExp(city, 'i') };
  }
  
  // Price logic
  if (min || max) {
    query.cheapestPrice = {};
    if (min) query.cheapestPrice.$gte = Number(min);
    if (max) query.cheapestPrice.$lte = Number(max);
  }

  // User Rating Logic (e.g., rating=3.5 meaning 3.5+)
  if (rating) {
    query.rating = { $gte: Number(rating) };
  }
  
  // Star Rating Logic: stars=3,4,5
  if (stars) {
     const starArray = stars.split(',').map(Number);
     query.starRating = { $in: starArray };
  }

  // Type Logic: e.g., type=Hotel,Resort
  if (req.query.type) {
    const typeArray = req.query.type.split(',');
    query.type = { $in: typeArray };
  }

  // Amenities Logic: amenities=Free WiFi,Gym
  if (req.query.amenities) {
    const amenitiesArray = req.query.amenities.split(',');
    query.amenities = { $all: amenitiesArray };
  }

  // Sorting
  let sortOption = {};
  if (sort === 'price_asc') sortOption = { cheapestPrice: 1 };
  else if (sort === 'price_desc') sortOption = { cheapestPrice: -1 };
  else if (sort === 'popular') sortOption = { rating: -1 };

  try {
    const hotels = await Hotel.find(query).sort(sortOption).limit(Number(limit) || 150);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: { $regex: new RegExp(city, 'i') } });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = { getHotels, getHotel, countByCity };
