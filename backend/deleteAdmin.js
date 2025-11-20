require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    const result = await Admin.deleteOne({ email: process.env.ADMIN_EMAIL });
    
    if (result.deletedCount > 0) {
      console.log(`🗑️ Successfully deleted Admin: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log('⚠️ Admin not found, proceeding...');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

deleteAdmin();