// backend/src/routes/contentRoutes.js

const express = require('express');
const router = express.Router();
const { getStaticContent, updateStaticContent } = require('../controllers/ContentController');
const { protect, authorize } = require('../middleware/auth');

// Public route to fetch static content (e.g., for the homepage)
router.get('/', getStaticContent);

// Admin route to update static content
router.put('/', protect, authorize('admin'), updateStaticContent);

module.exports = router;