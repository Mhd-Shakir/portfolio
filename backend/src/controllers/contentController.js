// backend/src/controllers/ContentController.js

// This controller handles static content (e.g., About, Skills, Contact Info, etc.)
// which might be stored in the database for easy admin editing.

const getStaticContent = (req, res, next) => {
  try {
    // Logic to fetch static content from DB
    res.json({ success: true, message: 'Content retrieved', data: {} });
  } catch (error) {
    next(error);
  }
};

const updateStaticContent = (req, res, next) => {
  try {
    // Logic to update static content in DB (Admin only)
    res.json({ success: true, message: 'Content updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStaticContent,
  updateStaticContent,
};