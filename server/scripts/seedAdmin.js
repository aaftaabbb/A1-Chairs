const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin '${username}' already exists. Updating password...`);
      const salt = await bcrypt.genSalt(10);
      existing.password = await bcrypt.hash(password, salt);
      await existing.save();
      console.log(`Admin password updated for '${username}'`);
      await mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({ username, password: hashedPassword });
    console.log(`Default admin created: username='${username}', password='${password}'`);
    console.log('Please change the password after first login.');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();