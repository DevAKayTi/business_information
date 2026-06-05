import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/services', icon: '🔧', label: 'Services' },
  { to: '/admin/messages', icon: '✉️', label: 'Messages' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-white font-bold">
              Plumb<span className="text-cyan-400">Pro</span>
            </span>
          </Link>
          <p className="text-slate-500 text-xs mt-1 ml-10">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              {admin?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin?.name}</p>
              <p className="text-slate-500 text-xs truncate">{admin?.role}</p>
            </div>
          </div>
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-20">
          <button
            id="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            ☰
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <Link
              to="/"
              target="_blank"
              className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              🌐 View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
