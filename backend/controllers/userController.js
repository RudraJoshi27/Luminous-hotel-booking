const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
    try {
        const { password, ...others } = req.body;
        
        // Build update object
        const updateData = { ...others };
        
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            updateData.password = bcrypt.hashSync(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
  try {
    console.log("BACKEND DEBUG: Deleting user with ID:", req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    console.error("BACKEND DEBUG: Delete failed:", err);
    next(err);
  }
};

module.exports = { getUsers, deleteUser, updateUser };
