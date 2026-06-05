import { useEffect, useState } from 'react';
import { getAllServicesAdmin, deleteService, updateService } from '../api/services.api';
import Loader from '../components/Loader';
import ServiceForm from './ServiceForm';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');

  const fetchServices = () => {
    setLoading(true);
    getAllServicesAdmin()
      .then(({ data }) => setServices(data.data))
      .catch(() => setError('Failed to load services.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setDeleting(id);
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch {
      setError('Failed to delete service.');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const { data } = await updateService(service._id, { isActive: !service.isActive });
      setServices((prev) => prev.map((s) => (s._id === service._id ? data.data : s)));
    } catch {
      setError('Failed to update service.');
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditing(null);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Services</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the services shown on the public website.</p>
        </div>
        <button
          id="add-service-btn"
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          ➕ Add Service
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
          ⚠️ {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ServiceForm
          existing={editing}
          onSave={handleFormSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {/* Table */}
      {loading ? (
        <Loader />
      ) : services.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-3">🔧</div>
          <p>No services yet. Add your first service!</p>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-slate-500 font-semibold uppercase tracking-wider text-xs px-6 py-4">Service</th>
                  <th className="text-left text-slate-500 font-semibold uppercase tracking-wider text-xs px-4 py-4">Price</th>
                  <th className="text-center text-slate-500 font-semibold uppercase tracking-wider text-xs px-4 py-4">Featured</th>
                  <th className="text-center text-slate-500 font-semibold uppercase tracking-wider text-xs px-4 py-4">Active</th>
                  <th className="text-right text-slate-500 font-semibold uppercase tracking-wider text-xs px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{s.icon || '🔧'}</span>
                        <div>
                          <p className="text-white font-medium">{s.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5 line-clamp-1 max-w-xs">{s.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{s.price || '—'}</td>
                    <td className="px-4 py-4 text-center">
                      {s.isFeatured ? (
                        <span className="text-yellow-400">⭐</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleToggleActive(s)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          s.isActive
                            ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25'
                            : 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                        }`}
                      >
                        {s.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditing(s); setShowForm(true); }}
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          disabled={deleting === s._id}
                          className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          {deleting === s._id ? '...' : '🗑️ Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
