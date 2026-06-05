/**
 * Seed script: wipes the database and creates a default admin user,
 * sample services, company information, and initial CMS pages.
 * Run: npm run seed  (from /server directory)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Service = require('./models/Service');
const CompanyInfo = require('./models/CompanyInfo');
const Page = require('./models/Page'); // 👈 Added
const connectDB = require('./config/db');

// ==========================================
// SAMPLE DATA DEFINITIONS
// ==========================================

const sampleServices = [
  {
    title: 'Emergency Plumbing',
    description: 'Available 24/7 for urgent plumbing emergencies including burst pipes, severe leaks, and blocked drains. Our rapid response team arrives within the hour.',
    icon: '🚨',
    price: 'From $99/call-out',
    isFeatured: true,
    order: 1,
  },
  {
    title: 'Pipe Repair & Installation',
    description: 'Expert repair and installation of all pipe types — copper, PVC, PEX. We handle everything from minor fixes to full re-piping of your home or business.',
    icon: '🔧',
    price: 'From $75/hour',
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Drain Cleaning & Unblocking',
    description: 'Professional drain cleaning using high-pressure water jetting. We clear blockages fast and safely, restoring full flow to your drains and sewers.',
    icon: '💧',
    price: 'From $120',
    isFeatured: true,
    order: 3,
  },
  {
    title: 'Hot Water Systems',
    description: 'Supply, installation, repair, and maintenance of electric, gas, and solar hot water systems from all leading brands. Guaranteed workmanship.',
    icon: '🔥',
    price: 'Free Quote',
    isFeatured: false,
    order: 4,
  },
  {
    title: 'Bathroom Renovations',
    description: 'Complete bathroom plumbing for renovations and new builds. We work with your designer or builder to deliver beautiful, functional bathrooms.',
    icon: '🛁',
    price: 'Free Quote',
    isFeatured: false,
    order: 5,
  },
  {
    title: 'Gas Fitting',
    description: 'Licensed gas fitters for natural gas and LPG installations, repairs, and safety inspections. We ensure your gas systems are safe and compliant.',
    icon: '⚡',
    price: 'From $90/hour',
    isFeatured: false,
    order: 6,
  },
];

const sampleCompanyInfo = {
  overview: 'PlumbPro is a premier plumbing service provider dedicated to delivering high-quality residential and commercial solutions.',
  history: 'Established in 2015, PlumbPro started with just one van and has grown into a fleet of highly skilled, licensed professionals.',
  vision: 'To be the most trusted and sustainable plumbing network in the region.',
  mission: 'To provide exceptional plumbing services with integrity, rapid response times, and unparalleled workmanship.',
  organizationalStructure: 'Our team consists of our Managing Director, Operations Manager, and Lead Technicians managing specialized teams.',
  ceoMessage: 'Thank you for choosing PlumbPro. We treat your property with the same care and respect as we would our own.',
  certifications: ['ISO 9001 Quality Management', 'Eco-Friendly Plumber Certification'],
  awards: ['Local Excellence Business Award 2025', 'Top Service Provider 2026'],
  licenses: ['Master Plumber License #MP-99210', 'Licensed Gas Fitter #GF-88301'],
  documents: [
    { title: 'Public Liability Insurance', url: '/docs/insurance_2026.pdf' },
    { title: 'Workplace Health & Safety Policy', url: '/docs/whs_policy.pdf' }
  ]
};

// New CMS Pages Dataset 👈 Added
const samplePages = [
  {
    key: 'home',
    title: 'Home Page CMS Shell',
    slug: '/',
    content: '<h1>Welcome to PlumbPro Services Grid Platform</h1><p>Top tiered technical support matrix layout options.</p>',
    status: 'published',
    seo: { metaTitle: 'PlumbPro | Expert Local Plumbing Services', metaDescription: 'Looking for dependable 24/7 plumbers? PlumbPro solves residential and commercial issues instantly.', keywords: 'plumber, emergency plumbing, gas fitter' }
  },
  {
    key: 'about',
    title: 'About Us Details Content',
    slug: '/about',
    content: '<h2>Our Core Background Foundation Portfolio</h2><p>Serving communities reliably with premium craftsmanship metrics.</p>',
    status: 'published',
    seo: { metaTitle: 'About PlumbPro | Our Professional Mission Matrix', metaDescription: 'Discover our story, industrial qualifications records, and commercial fleet history.', keywords: 'about plumbing business, licensed operators' }
  },
  {
    key: 'vision-mission',
    title: 'Vision & Mission Strategy Statement',
    slug: '/vision-mission',
    content: '<h2>Strategic Commitments Guidelines Matrix</h2><p>Aiming for operational execution supremacy safely.</p>',
    status: 'published',
    seo: { metaTitle: 'Corporate Directives | Mission Vision Core Framework', metaDescription: 'Our strategic benchmarks for technical growth, compliance standards, and green operations.', keywords: 'eco-friendly plumbing, green plumber compliance' }
  },
  {
    key: 'company-profile',
    title: 'Detailed Company Operations Profile',
    slug: '/company-profile',
    content: '<h2>Enterprise Capabilities Record</h2><p>A full breakdown of fleet infrastructure, insurance limits, and corporate capacity metrics.</p>',
    status: 'published',
    seo: { metaTitle: 'PlumbPro Enterprise Profile | Capability Matrix Statement', metaDescription: 'Commercial documentation summary profile packet resource files access point.', keywords: 'plumbing enterprise capabilities, contract infrastructure' }
  },
  {
    key: 'services',
    title: 'Services Index Framework Directory',
    slug: '/services',
    content: '<h2>Comprehensive Technical Operations Framework List</h2><p>Review standard package details directly inline.</p>',
    status: 'published',
    seo: { metaTitle: 'Professional Solutions Catalog | PlumbPro Offerings', metaDescription: 'From water jet structural cleanouts to hot heater replacement systems installations.', keywords: 'drain snake, burst water tank line fixtures' }
  },
  {
    key: 'contact',
    title: 'Contact Channels Portal Information',
    slug: '/contact',
    content: '<h2>Interact Directly With Technical Operators dispatch office</h2>',
    status: 'published',
    seo: { metaTitle: 'Contact Our Dispatchers 24/7 | Request Custom Quotes', metaDescription: 'Drop messaging tickets or speak instantly over localized telephone routing trunks.', keywords: 'call plumber near me, book diagnostic inspection' }
  },
  {
    key: 'privacy-policy',
    title: 'Corporate Data Privacy Protection Policies Statement',
    slug: '/privacy',
    content: '<h2>User Information Encryption Framework Commitments</h2><p>We process secure tokens and form properties tracking metrics layout records.</p>',
    status: 'published',
    seo: { metaTitle: 'Privacy Protection Policies | PlumbPro Terms Agreement', metaDescription: 'Legal protocols outlining localized cookies usage rules and server record definitions.', keywords: 'encrypted contact forms data policies' }
  },
  {
    key: 'terms-conditions',
    title: 'Terms of Professional Service Engagement Contracts',
    slug: '/terms',
    content: '<h2>Operational Service Level Agreement Parameters Statement</h2><p>Liability caps, emergency callout terms definitions metrics structures.</p>',
    status: 'draft', // Saved as a draft sample page!
    seo: { metaTitle: 'Terms of Use Agreements | Dispatch Scheduling Liabilities Rules', metaDescription: 'Official standard client operational contractual outlines declarations documentation.', keywords: 'service warranty terms, residential plumbing contracts' }
  }
];

// ==========================================
// SEED EXECUTION ENGINE
// ==========================================

const seedDB = async () => {
  await connectDB();
  console.log('🌱 Connected to database. Preparing for clean seed...');

  // 1. Wipe out ALL data, collections, and indexes completely
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️  Database dropped successfully. Stale collections and indexes cleared.');
  } catch (dropError) {
    console.error('⚠️  Warning during database drop:', dropError);
  }

  // 2. Create default admin
  const admin = await Admin.create({
    name: 'PlumbPro Admin',
    email: 'admin@plumbpro.com',
    password: 'Admin@123',
    role: 'superadmin',
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 3. Create services one-by-one so Mongoose hooks (like slug generation) fire smoothly
  for (const s of sampleServices) {
    await Service.create(s);
  }
  console.log(`✅ ${sampleServices.length} services seeded`);

  // 4. Create Company Information record
  await CompanyInfo.create(sampleCompanyInfo);
  console.log('✅ Company Information seeded');

  // 5. Create Dynamic CMS Pages 👈 Added
  for (const p of samplePages) {
    await Page.create(p);
  }
  console.log(`✅ ${samplePages.length} CMS Pages seeded successfully into registry`);

  // 6. Finalize process
  console.log('\n🎉 Database re-seeded successfully from a clean slate!');
  console.log('📧 Admin Email: admin@plumbpro.com');
  console.log('🔑 Admin Password: Admin@123');
  console.log('\n⚠️  Change the password after first login!');

  mongoose.connection.close();
  process.exit(0);
};

// Catch top-level execution errors
seedDB().catch((err) => {
  console.error('❌ Seed failed:', err);
  mongoose.connection.close();
  process.exit(1);
});