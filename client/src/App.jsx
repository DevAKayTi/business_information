import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin pages
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageServices from './admin/ManageServices';
import Messages from './admin/Messages';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
    <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

    {/* Admin Login (no layout) */}
    <Route path="/admin/login" element={<Login />} />

    {/* Admin Panel (protected) */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="services" element={<ManageServices />} />
      <Route path="messages" element={<Messages />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
