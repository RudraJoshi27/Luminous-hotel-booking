const express = require('express');
const { getUsers, deleteUser, updateUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin, verifyUser } = require('../middleware/verifyToken');

const router = express.Router();

// GET all users (Admin only)
router.get('/', verifyToken, verifyAdmin, getUsers);

// UPDATE user (User can only update themselves or admin)
router.put('/:id', verifyUser, updateUser);

// DELETE user (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
