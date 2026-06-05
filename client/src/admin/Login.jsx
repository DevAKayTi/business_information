import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
                P
              </div>
            </div>
            <h1 className="text-2xl font-black text-white">
              Plumb<span className="text-cyan-400">Pro</span> Admin
            </h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to your dashboard</p>
          </div>

          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@plumbpro.com"
                className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 pr-11 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                ⚠️ {error}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                '🔐 Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-6">
            Protected area — authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
