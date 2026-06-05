import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('plumbpro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — log out and redirect
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('plumbpro_token');
      localStorage.removeItem('plumbpro_admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default API;
