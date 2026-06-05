import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="text-white font-bold text-xl">
                Plumb<span className="text-cyan-400">Pro</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your trusted plumbing experts. Available 24/7 for all emergency and routine plumbing needs throughout the area.
            </p>
            <div className="flex gap-3 mt-5">
              {['📘', '📸', '🐦'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center text-base transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Plumber Ave, Sydney NSW 2000</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+15551234567" className="hover:text-cyan-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@plumbpro.com" className="hover:text-cyan-400 transition-colors">
                  info@plumbpro.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {year} PlumbPro. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
