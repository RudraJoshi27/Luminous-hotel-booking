const express = require('express');
const { createHotel, getMyHotels, verifyToken } = require('../controllers/listingController');
const router = express.Router();

router.post('/', verifyToken, createHotel);
router.get('/my-hotels', verifyToken, getMyHotels);

module.exports = router;
