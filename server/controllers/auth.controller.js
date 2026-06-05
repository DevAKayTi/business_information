const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const generateToken = require('../utils/generateToken');

// @desc  Login admin
// @route POST /api/auth/login
// @access Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find admin (include password since select: false by default)
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      success: true,
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Get current logged-in admin
// @route GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};

// @desc  Get dashboard stats
// @route GET /api/admin/stats
// @access Private
const getStats = async (req, res, next) => {
  try {
    const [totalServices, totalMessages, unreadMessages, featuredServices] =
      await Promise.all([
        Service.countDocuments({ isActive: true }),
        Contact.countDocuments(),
        Contact.countDocuments({ isRead: false }),
        Service.countDocuments({ isFeatured: true }),
      ]);

    res.status(200).json({
      success: true,
      stats: { totalServices, totalMessages, unreadMessages, featuredServices },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, getStats };
