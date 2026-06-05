import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/50' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Plumb<span className="text-cyan-400">Pro</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+15551234567"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5"
          >
            <span>📞</span> Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-900/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(to) ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+15551234567"
            className="block mt-2 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-4 py-3 rounded-lg"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
