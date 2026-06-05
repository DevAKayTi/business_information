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
  { icon: '🏅', title: 'Licensed & Insured', desc: 'Fully licensed plumbers with comprehensive liability coverage for your peace of mind.' },
  { icon: '⚡', title: 'Fast Response', desc: 'Emergency call-outs within the hour. We know plumbing crises cannot wait.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. What we quote is what you pay — guaranteed.' },
  { icon: '🌟', title: '5-Star Rated', desc: 'Consistently rated 5 stars across Google, Yelp, and local directories.' },
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
    <div className="min-h-screen bg-slate-900">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_60%)]" />
        {/* Animated orb */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              24/7 Emergency Plumbing Available
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Expert Plumbing{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                You Can Trust
              </span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Professional plumbing services for homes and businesses. From emergency repairs
              to full installations — we've got you covered every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+15551234567"
                id="hero-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                📞 Call (555) 123-4567
              </a>
              <Link
                to="/services"
                id="hero-services-btn"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200"
              >
                View Services →
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs">
          <span>Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-4xl font-black">{value}</div>
              <div className="text-sm font-medium opacity-80 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl font-black text-white mt-2">Our Featured Services</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From routine maintenance to complex installations, our expert team handles it all.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s) => <ServiceCard key={s._id} service={s} featured />)}
          </div>
        ) : (
          <p className="text-center text-slate-500">No featured services at this time.</p>
        )}

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
          >
            See all services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-4xl font-black text-white mt-2">The PlumbPro Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Got a Plumbing Emergency?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Don't wait — our team is on standby 24/7. Call us now for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              📞 Call Us Now
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
