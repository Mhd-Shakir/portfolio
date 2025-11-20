// backend/src/config/cloudinary.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload a file
const uploadToCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto"
    });

    // Remove the locally saved temporary file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response.secure_url;
  } catch (error) {
    // Remove local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};

// Function to delete a file (optional, used when deleting projects)
const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    
    // Extract the public ID from the URL (basic logic)
    // Example: .../upload/v123456/folder/image.jpg -> folder/image
    const parts = imageUrl.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0]; // remove extension

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };