const express = require('express');
const router = express.Router();
const {
  getServices,
  getFeaturedServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getServices);
router.get('/featured', getFeaturedServices);

// Admin routes (protected)
router.get('/all', protect, getAllServicesAdmin);
router.post('/', protect, createService);
router.get('/:id', getServiceById);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
