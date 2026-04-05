const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const updateAdmin = async () => {
  // Update these variables as needed
  const NEW_USERNAME = "admin";
  const NEW_EMAIL = "admin@luminous.com";
  const NEW_PASSWORD = "admin12345";

  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/luminous-hotel";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for updating Admin account.");

    // Look for previous admin usernames to update them to the new one
    // This allows updating from 'superadmin' to 'admin'
    let admin = await User.findOne({ username: { $in: ["superadmin", "admin"] }, role: "admin" });

    if (!admin) {
        console.log("No existing admin found. You might need to run seedAdmin.js first.");
        process.exit(0);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(NEW_PASSWORD, salt);

    admin.username = NEW_USERNAME;
    admin.email = NEW_EMAIL;
    admin.password = hash;

    await admin.save();
    console.log(`Success! Admin account updated:`);
    console.log(`- Username: ${admin.username}`);
    console.log(`- Email: ${admin.email}`);
    console.log(`- Password: [UPDATED TO: ${NEW_PASSWORD}]`);
    
    process.exit(0);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    process.exit(1);
  }
};

updateAdmin();
