const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  // ✅ CHANGED: Replaced subject with phone
  phone: { 
    type: String, 
    trim: true,
    required: true // Making it required since we are asking for it
  },
  message: { 
    type: String, 
    required: true 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  ipAddress: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);