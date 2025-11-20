const express = require('express');
const router = express.Router();

const { 
  submitContact, 
  getAllMessages, 
  markAsRead,
  deleteContact,    // Import
  deleteAllContacts // Import
} = require('../controllers/contactController'); 

const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', submitContact); 

// Admin routes
router.get('/', protect, authorize('admin'), getAllMessages);
router.put('/:id', protect, authorize('admin'), markAsRead);

// ✅ NEW: Delete Routes
router.delete('/:id', protect, authorize('admin'), deleteContact); // Delete one
router.delete('/', protect, authorize('admin'), deleteAllContacts); // Delete all

module.exports = router;