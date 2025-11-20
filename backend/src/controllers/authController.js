const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// ✅ Fixed: Now accepts 'role' and puts it in the token
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }
    
    const admin = await Admin.findOne({ email });
    
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // ✅ Fixed: Pass the role (default to 'admin') to the token
    const token = signToken(admin._id, admin.role || 'admin');
    
    res.json({ 
      success: true, 
      token,
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role || 'admin'
      }
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const existingAdmin = await Admin.findOne({ 
      email: process.env.ADMIN_EMAIL 
    });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists' 
      });
    }
    
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Admin',
      role: 'admin' // ✅ Fixed: Explicitly set role to admin
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Admin created successfully',
      data: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  createAdmin
};