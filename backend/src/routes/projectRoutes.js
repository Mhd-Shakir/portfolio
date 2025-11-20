const express = require('express');
const router = express.Router(); // FIX: Router is now correctly defined

// Import middleware and controller functions
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Assuming this is your Multer upload middleware
const { 
  getAllProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');

// Public routes (Anyone can view projects)
router.get('/', getAllProjects);
router.get('/:id', getProject);

// ✅ Admin Only routes (Requires token + admin role)
router.post('/', protect, authorize('admin'), upload.single('image'), createProject);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router;