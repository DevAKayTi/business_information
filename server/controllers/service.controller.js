const Service = require('../models/Service');

// @desc  Get all active services (public)
// @route GET /api/services
// @access Public
const getServices = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc  Get featured services (for home page)
// @route GET /api/services/featured
// @access Public
const getFeaturedServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true, isFeatured: true }).sort({ order: 1 }).limit(6);
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all services (admin — includes inactive)
// @route GET /api/services/all
// @access Private
const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single service
// @route GET /api/services/:id
// @access Public
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Create service
// @route POST /api/services
// @access Private
const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Update service
// @route PUT /api/services/:id
// @access Private
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete service
// @route DELETE /api/services/:id
// @access Private
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getFeaturedServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
