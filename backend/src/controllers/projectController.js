// backend/src/controllers/projectController.js

const Project = require('../models/Project');
// If you haven't created this file yet, you might get an error. 
// Ensure src/config/cloudinary.js exists, or comment this import out if you aren't ready for image upload yet.
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, status = 'active' } = req.query;
    const filter = { status };
    
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    let imageUrl = req.body.image;
    
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.path, 'projects');
      } catch (uploadError) {
         console.error("Image upload failed:", uploadError);
         return res.status(500).json({ success: false, message: 'Image upload failed. Check Cloudinary config.' });
      }
    }
    
    const project = await Project.create({ ...req.body, image: imageUrl });
    
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    if (req.file) {
      try {
        if (project.image) await deleteFromCloudinary(project.image);
        req.body.image = await uploadToCloudinary(req.file.path, 'projects');
      } catch (uploadError) {
        console.error("Image update failed:", uploadError);
        // Continue update even if image fails, or handle differently
      }
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    // ✅ FIX: Wrap image deletion in try-catch so it doesn't crash the server
    // This handles cases where Cloudinary keys are bad OR the image is just a URL string (seeded data)
    if (project.image) {
      try {
        await deleteFromCloudinary(project.image);
      } catch (err) {
        console.log("Skipping Cloudinary delete (Image might be external URL or config missing)");
      }
    }

    await project.deleteOne();
    
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};