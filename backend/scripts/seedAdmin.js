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

    const adminExists = await User.findOne({ username: "superadmin" });
    if (adminExists) {
      console.log("Admin user 'superadmin' already exists.");
      process.exit(0);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("admin123", salt);

    const admin = new User({
      username: "superadmin",
      email: "admin@luminous.com",
      password: hash,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user 'superadmin' created successfully with password 'admin123'.");
    process.exit(0);
  } catch (error) {
    console.error("SEEDING ERROR:", error);
    process.exit(1);
  }
};

seedAdmin();
