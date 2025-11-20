const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  shortDescription: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  technologies: [{ 
    type: String, 
    required: true 
  }],
  githubUrl: { 
    type: String 
  },
  liveUrl: { 
    type: String 
  },
  category: { 
    type: String, 
    enum: ['web', 'mobile', 'fullstack', 'other'], 
    default: 'web' 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ['active', 'archived'], 
    default: 'active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);