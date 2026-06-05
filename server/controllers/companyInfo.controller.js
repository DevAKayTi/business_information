const CompanyInfo = require('../models/CompanyInfo');

// @desc    Get company information (public)
// @route   GET /api/company-info
// @access  Public
const getCompanyInfo = async (req, res, next) => {
    try {
        const companyInfo = await CompanyInfo.findOne();

        if (!companyInfo) {
            return res.status(404).json({
                success: false,
                message: 'Company information profile has not been initialized yet.'
            });
        }

        res.status(200).json({
            success: true,
            data: companyInfo
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update or Initialize company information (admin)
// @route   PUT /api/company-info
// @access  Private
const updateCompanyInfo = async (req, res, next) => {
    try {
        // - new: true returns the newly updated document
        // - upsert: true creates the document if it doesn't exist yet
        // - runValidators: ensures incoming data matches schema requirements
        const updatedInfo = await CompanyInfo.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Company information updated successfully!',
            data: updatedInfo,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getCompanyInfo, updateCompanyInfo };