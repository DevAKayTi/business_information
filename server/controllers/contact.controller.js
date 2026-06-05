const Contact = require('../models/Contact');

// @desc  Submit contact form (public)
// @route POST /api/contact
// @access Public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required',
      });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent. We will get back to you shortly!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all contact messages (admin)
// @route GET /api/contact
// @access Private
const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc  Mark message as read
// @route PUT /api/contact/:id/read
// @access Private
const markAsRead = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete a message
// @route DELETE /api/contact/:id
// @access Private
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getMessages, markAsRead, deleteMessage };
