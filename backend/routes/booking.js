const express = require('express');
const { createBooking, getUserBookings, cancelBooking } = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/user', verifyToken, getUserBookings);
router.patch('/cancel/:id', verifyToken, cancelBooking);

module.exports = router;
