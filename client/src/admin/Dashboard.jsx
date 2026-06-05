import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/auth/stats')
      .then(({ data }) => setStats(data.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: 'Active Services', value: stats.totalServices, icon: '🔧', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', link: '/admin/services' },
        { label: 'Featured Services', value: stats.featuredServices, icon: '⭐', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/20', link: '/admin/services' },
        { label: 'Total Messages', value: stats.totalMessages, icon: '✉️', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20', link: '/admin/messages' },
        { label: 'Unread Messages', value: stats.unreadMessages, icon: '🔔', color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/20', link: '/admin/messages' },
      ]
    : [];

  const quickActions = [
    { label: 'Add New Service', icon: '➕', to: '/admin/services', color: 'bg-blue-600 hover:bg-blue-500' },
    { label: 'View Messages', icon: '📬', to: '/admin/messages', color: 'bg-purple-600 hover:bg-purple-500' },
    { label: 'View Public Site', icon: '🌐', to: '/', color: 'bg-slate-700 hover:bg-slate-600', external: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-white">
          Welcome back, <span className="text-cyan-400">{admin?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-slate-400 mt-1">Here's what's happening with PlumbPro today.</p>
      </div>

      {/* Stats */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map(({ label, value, icon, color, border, link }) => (
            <Link
              key={label}
              to={link}
              className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{label}</p>
                  <p className="text-4xl font-black text-white mt-2">{value}</p>
                </div>
                <div className="text-3xl">{icon}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, icon, to, color, external }) =>
            external ? (
              <a
                key={label}
                href={to}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 ${color} text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors`}
              >
                {icon} {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-2 ${color} text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors`}
              >
                {icon} {label}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">🔐 Admin Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-slate-400">Name</span>
              <span className="text-white font-medium">{admin?.name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-400">Email</span>
              <span className="text-white font-medium">{admin?.email}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-400">Role</span>
              <span className="bg-cyan-500/15 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full capitalize">
                {admin?.role}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">📖 Getting Started</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">→</span> Go to <Link to="/admin/services" className="text-cyan-400 hover:underline">Services</Link> to add or edit your plumbing services
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">→</span> Check <Link to="/admin/messages" className="text-cyan-400 hover:underline">Messages</Link> for new contact form submissions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">→</span> Mark services as <strong className="text-white">Featured</strong> to show them on the Home page
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
