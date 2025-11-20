// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router(); // <--- FIX 1: Initialize the router

// Import the necessary controller functions
const { 
  login, 
  createAdmin 
} = require('../controllers/authController');

// Only expose the login route
router.post('/login', login); 

// Note: Removed the unused createAdmin function from the file, as it is not exposed via this route.

module.exports = router;