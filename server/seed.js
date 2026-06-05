/**
 * Seed script: creates a default admin user and sample services
 * Run: npm run seed  (from /server directory)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Service = require('./models/Service');
const connectDB = require('./config/db');

const sampleServices = [
  {
    title: 'Emergency Plumbing',
    description:
      'Available 24/7 for urgent plumbing emergencies including burst pipes, severe leaks, and blocked drains. Our rapid response team arrives within the hour.',
    icon: '🚨',
    price: 'From $99/call-out',
    isFeatured: true,
    order: 1,
  },
  {
    title: 'Pipe Repair & Installation',
    description:
      'Expert repair and installation of all pipe types — copper, PVC, PEX. We handle everything from minor fixes to full re-piping of your home or business.',
    icon: '🔧',
    price: 'From $75/hour',
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Drain Cleaning & Unblocking',
    description:
      'Professional drain cleaning using high-pressure water jetting. We clear blockages fast and safely, restoring full flow to your drains and sewers.',
    icon: '💧',
    price: 'From $120',
    isFeatured: true,
    order: 3,
  },
  {
    title: 'Hot Water Systems',
    description:
      'Supply, installation, repair, and maintenance of electric, gas, and solar hot water systems from all leading brands. Guaranteed workmanship.',
    icon: '🔥',
    price: 'Free Quote',
    isFeatured: false,
    order: 4,
  },
  {
    title: 'Bathroom Renovations',
    description:
      'Complete bathroom plumbing for renovations and new builds. We work with your designer or builder to deliver beautiful, functional bathrooms.',
    icon: '🛁',
    price: 'Free Quote',
    isFeatured: false,
    order: 5,
  },
  {
    title: 'Gas Fitting',
    description:
      'Licensed gas fitters for natural gas and LPG installations, repairs, and safety inspections. We ensure your gas systems are safe and compliant.',
    icon: '⚡',
    price: 'From $90/hour',
    isFeatured: false,
    order: 6,
  },
];

const seedDB = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Drop collections entirely to clear stale indexes from partial runs
  await mongoose.connection.dropCollection('admins').catch(() => {});
  await mongoose.connection.dropCollection('services').catch(() => {});

  // Create default admin
  const admin = await Admin.create({
    name: 'PlumbPro Admin',
    email: 'admin@plumbpro.com',
    password: 'Admin@123',
    role: 'superadmin',
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Create services one-by-one so the pre-save slug hook fires
  for (const s of sampleServices) {
    await Service.create(s);
  }
  console.log(`✅ ${sampleServices.length} services seeded`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('📧 Admin Email: admin@plumbpro.com');
  console.log('🔑 Admin Password: Admin@123');
  console.log('\n⚠️  Change the password after first login!');

  mongoose.connection.close();
  process.exit(0);
};

seedDB().catch((err) => {
  console.error('❌ Seed failed:', err);
  mongoose.connection.close();
  process.exit(1);
});
