const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Load env from the root .env file
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/luminous-hotel";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for Admin Seeding.");

    const adminExists = await User.findOne({ username: "admin" });
    if (adminExists) {
      console.log("Admin user 'admin' already exists.");
      process.exit(0);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("admin12345", salt);

    const admin = new User({
      username: "admin",
      email: "admin@luminous.com",
      password: hash,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user 'admin' created successfully with password 'admin12345'.");
    process.exit(0);
  } catch (error) {
    console.error("SEEDING ERROR:", error);
    process.exit(1);
  }
};

seedAdmin();
