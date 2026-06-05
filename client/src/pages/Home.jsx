import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedServices } from '../api/services.api';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '2,400+', label: 'Happy Customers' },
  { value: '24/7', label: 'Emergency Service' },
  { value: '100%', label: 'Satisfaction Rate' },
];

const whyUs = [
  { icon: '✓', title: 'Licensed & Insured', desc: 'Fully licensed plumbers with comprehensive liability coverage for your peace of mind.' },
  { icon: '⚡', title: 'Fast Response', desc: 'Emergency call-outs within the hour. We know plumbing crises cannot wait.' },
  { icon: '💎', title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. What we quote is what you pay — guaranteed.' },
  { icon: '★', title: '5-Star Rated', desc: 'Consistently rated 5 stars across Google, Yelp, and local directories.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedServices()
      .then(({ data }) => setFeatured(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-700/20 rounded-full blur-3xl -ml-40 -mb-40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-lg uppercase tracking-wide">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Professional Plumbing Services
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Expert Plumbing Solutions for Every Challenge
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              From emergency repairs to full installations, our licensed team delivers reliable, transparent plumbing services you can trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Call Now
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg border border-white/20 transition-colors duration-200"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">{value}</div>
                <div className="text-sm sm:text-base text-slate-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Featured Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From routine maintenance to complex installations, our expert team handles every plumbing need.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featured.map((s) => <ServiceCard key={s._id} service={s} featured />)}
            </div>
          ) : (
            <p className="text-center text-slate-500">No featured services at this time.</p>
          )}

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors group"
            >
              View all services
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">The Right Choice for Your Plumbing Needs</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4 font-bold text-blue-600">{icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-blue-600 rounded-2xl p-12 sm:p-16 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Emergency Plumbing Service
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Available 24/7. Call us now for immediate assistance with any plumbing issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Call (555) 123-4567
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Send Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
