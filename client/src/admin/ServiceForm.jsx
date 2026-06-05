import { useState, useEffect } from 'react';
import { createService, updateService } from '../api/services.api';

const emptyForm = {
  title: '',
  description: '',
  icon: '🔧',
  price: '',
  isFeatured: false,
  isActive: true,
  order: 0,
};

const ServiceForm = ({ existing, onSave, onCancel }) => {
  const [form, setForm] = useState(existing ? { ...existing } : { ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (existing) {
        await updateService(existing._id, form);
      } else {
        await createService(form);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full bg-slate-800 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-white">
            {existing ? '✏️ Edit Service' : '➕ Add New Service'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <form id="service-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Icon</label>
              <input
                name="icon"
                type="text"
                value={form.icon}
                onChange={handleChange}
                placeholder="🔧"
                className={inputClass}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Title *</label>
              <input
                id="service-title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Pipe Repair"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Description *</label>
            <textarea
              id="service-description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe this service..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Price</label>
              <input
                id="service-price"
                name="price"
                type="text"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g., From $75/hour"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Display Order</label>
              <input
                name="order"
                type="number"
                min="0"
                value={form.order}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:bg-cyan-500 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-slate-300 text-sm font-medium">Featured on Home</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:bg-green-500 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-slate-300 text-sm font-medium">Active (Visible)</span>
            </label>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              id="service-submit"
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
            >
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              ) : (
                existing ? '💾 Update Service' : '✅ Create Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
