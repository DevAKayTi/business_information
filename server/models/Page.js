const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
    title: String,
    content: String,
    updatedBy: String,
    updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const PageSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true // Unique system identifier (e.g., 'home', 'privacy-policy')
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true // Public URL route path matching (e.g., '/privacy-policy')
    },
    content: {
        type: String,
        default: '' // HTML block structural data or JSON layout blocks
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    seo: {
        metaTitle: { type: String, default: '' },
        metaDescription: { type: String, default: '' },
        keywords: { type: String, default: '' }
    },
    versions: [VersionSchema] // Stores historical states of your pages
}, { timestamps: true });

// Pre-save hook example to backup changes into history versioning
PageSchema.pre('save', function (next) {
    if (this.isModified('content') || this.isModified('title')) {
        // Keep a maximum of 10 history records to avoid document bloating
        if (this.versions.length >= 10) {
            this.versions.shift();
        }
        this.versions.push({
            title: this.title,
            content: this.content,
            updatedAt: new Date()
        });
    }
    next();
});

module.exports = mongoose.model('Page', PageSchema);