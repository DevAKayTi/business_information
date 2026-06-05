import { useEffect, useState } from 'react';
import { getServices } from '../api/services.api';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getServices()
      .then(({ data }) => setServices(data.data))
      .catch(() => setError('Failed to load services. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">What We Do</span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mt-3 mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Comprehensive plumbing solutions for every need. Browse our full range of professional services below.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <input
              id="services-search"
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 rounded-xl px-5 py-3 pl-12 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading && <Loader text="Loading services..." />}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No services found{search ? ` for "${search}"` : ''}.</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-slate-500 text-sm mb-6">{filtered.length} service{filtered.length !== 1 ? 's' : ''} available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <ServiceCard key={s._id} service={s} featured={s.isFeatured} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-10">
          <h2 className="text-3xl font-black text-white mb-3">Don't See What You Need?</h2>
          <p className="text-slate-400 mb-6">Contact us — we handle all types of plumbing jobs, big or small.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
