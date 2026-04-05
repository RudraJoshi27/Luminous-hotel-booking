const express = require('express');
const { getUsers, deleteUser, updateUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');

const router = express.Router();

// GET all users (Admin only)
router.get('/', verifyToken, verifyAdmin, getUsers);

// UPDATE user
router.put('/:id', verifyToken, updateUser);

// DELETE user (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
