const express = require('express');
const { getHotels, getHotel, countByCity } = require('../controllers/hotelController');

const router = express.Router();

router.get('/', getHotels);
router.get('/find/:id', getHotel);
router.get('/countByCity', countByCity);

module.exports = router;
