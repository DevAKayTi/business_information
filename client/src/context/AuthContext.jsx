import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('plumbpro_admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('plumbpro_token'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('plumbpro_token', data.token);
      localStorage.setItem('plumbpro_admin', JSON.stringify(data.admin));
      setToken(data.token);
      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('plumbpro_token');
    localStorage.removeItem('plumbpro_admin');
    setToken(null);
    setAdmin(null);
  };

  const isAuthenticated = !!token && !!admin;

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
