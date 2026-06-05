const express = require('express');
const router = express.Router();
const {
    getCompanyInfo,
    updateCompanyInfo
} = require('../controllers/companyInfo.controller');
const { protect } = require('../middleware/auth.middleware');

// Public
router.get('/', getCompanyInfo);

// Admin only
router.put('/', protect, updateCompanyInfo);

module.exports = router;