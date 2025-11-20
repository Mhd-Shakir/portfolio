const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/emailService');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    const ipAddress = req.ip;
    
    const contact = await Contact.create({ name, email, phone, message, ipAddress });
    
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Request from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }
    
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// ✅ NEW: Delete a single message
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

// ✅ NEW: Delete ALL messages
const deleteAllContacts = async (req, res, next) => {
  try {
    await Contact.deleteMany({});
    res.json({ success: true, message: 'All messages deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getAllMessages,
  markAsRead,
  deleteContact,     // Exported
  deleteAllContacts  // Exported
};