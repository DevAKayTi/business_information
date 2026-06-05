const mongoose = require('mongoose');

const CompanyInfoSchema = new mongoose.Schema({
    overview: {
        type: String,
        required: true,
        default: 'Welcome to PlumbPro. We provide top-tier plumbing solutions.'
    },
    history: {
        type: String,
        default: 'Founded with a vision to deliver reliable plumbing services.'
    },
    vision: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    organizationalStructure: {
        type: String, // Can be text or a URL to an org chart image
        default: ''
    },
    ceoMessage: {
        type: String,
        default: ''
    },
    certifications: [{
        type: String // e.g., ["ISO 9001 Certified", "Green Plumbing Certified"]
    }],
    awards: [{
        type: String // e.g., ["Best Local Business 2025"]
    }],
    licenses: [{
        type: String // e.g., ["Licensed Gas Fitter #12345", "Master Plumber #67890"]
    }],
    documents: [{
        title: { type: String, required: true },
        url: { type: String, required: true } // URL to PDFs/Policies
    }]
}, { timestamps: true });

module.exports = mongoose.model('CompanyInfo', CompanyInfoSchema);