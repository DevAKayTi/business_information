const express = require('express');
const router = express.Router();
const {
  submitContact,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');

// Public
router.post('/', submitContact);

// Admin only
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
