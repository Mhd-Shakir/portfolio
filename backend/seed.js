require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');

const projects = [
  {
    title: 'E-Commerce Platform',
    shortDescription: 'A modern full-stack e-commerce solution.',
    description: 'A full-stack e-commerce platform with payment integration, real-time inventory, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'fullstack',
    featured: true
  },
  {
    title: 'Social Media Dashboard',
    shortDescription: 'Analytics dashboard for social media management.',
    description: 'Analytics dashboard for social media management with real-time data visualization and reporting.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Express', 'Chart.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'web',
    featured: true
  },
  {
    title: 'Task Management App',
    shortDescription: 'Collaborative tool for team productivity.',
    description: 'Collaborative task management tool with drag-and-drop interface, team collaboration, and notifications.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'web'
  },
  {
    title: 'Weather Forecast App',
    shortDescription: 'Real-time weather tracking application.',
    description: 'Real-time weather application with interactive maps, 7-day forecast, and location-based alerts.',
    image: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'API Integration', 'Tailwind', 'Maps'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'web'
  },
  {
    title: 'Blog Platform',
    shortDescription: 'SEO-optimized blogging platform.',
    description: 'Modern blogging platform with markdown support, SEO optimization, and comment system.',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'SEO'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'fullstack'
  },
  {
    title: 'Video Streaming Service',
    shortDescription: 'Netflix-style video streaming application.',
    description: 'Netflix-like streaming service with user authentication, video encoding, and recommendation system.',
    image: 'https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'AWS', 'Redis'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'fullstack'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    await Project.deleteMany();
    console.log('🗑️  Cleared old projects...');

    await Project.insertMany(projects);
    console.log('✨ Added 6 new projects!');

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDB();