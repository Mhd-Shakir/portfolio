require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
// const bcrypt = require('bcryptjs'); // Keep this line if other files use it

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (adminExists) {
      console.log('⚠️  Admin already exists');
      // If the admin exists but the password is bad, we must delete it and recreate.
      // We will perform deletion in the next step.
      process.exit();
    }

    // ❌ REMOVED: Manual Hashing is now removed, relies on Admin.js model hook.
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    // Create Admin - Pass the clear-text password. The pre('save') hook handles the rest.
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // <-- PASS CLEAR TEXT
      role: 'admin' 
    });

    console.log('👑 Admin User Created Successfully!');
    console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();