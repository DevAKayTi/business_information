import { useEffect, useState } from 'react';
import { getMessages, markMessageRead, deleteMessage } from '../api/contact.api';
import Loader from '../components/Loader';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'

  useEffect(() => {
    getMessages()
      .then(({ data }) => setMessages(data.data))
      .catch(() => setError('Failed to load messages.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) {
      try {
        await markMessageRead(msg._id);
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      } catch {}
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      setError('Failed to delete message.');
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'read') return m.isRead;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            Messages
            {unreadCount > 0 && (
              <span className="bg-cyan-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Contact form submissions from your website.</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-900/60 border border-white/5 rounded-xl p-1 w-fit">
        {['all', 'unread', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-2">📭</div>
                <p>No {filter !== 'all' ? filter : ''} messages.</p>
              </div>
            ) : (
              filtered.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => handleSelect(msg)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selected?._id === msg._id
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : msg.isRead
                      ? 'bg-slate-900/40 border-white/5 hover:border-white/10'
                      : 'bg-slate-800/60 border-white/10 hover:border-cyan-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />}
                        <p className={`font-semibold truncate ${msg.isRead ? 'text-slate-300' : 'text-white'}`}>
                          {msg.name}
                        </p>
                      </div>
                      <p className="text-slate-500 text-xs truncate mt-0.5">{msg.subject}</p>
                    </div>
                    <p className="text-slate-600 text-xs flex-shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-1">{msg.message}</p>
                </button>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 space-y-5">
                {/* Subject */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-white">{selected.subject}</h2>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    🗑️ Delete
                  </button>
                </div>

                {/* Sender info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'From', value: selected.name },
                    { label: 'Email', value: selected.email, link: `mailto:${selected.email}` },
                    { label: 'Phone', value: selected.phone || 'Not provided' },
                  ].map(({ label, value, link }) => (
                    <div key={label} className="bg-slate-800/50 rounded-xl p-3">
                      <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold mb-1">{label}</p>
                      {link ? (
                        <a href={link} className="text-cyan-400 text-sm font-medium hover:underline break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium break-all">{value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Date */}
                <p className="text-slate-500 text-xs">{formatDate(selected.createdAt)}</p>

                {/* Message body */}
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-5">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">{selected.message}</p>
                </div>

                {/* Quick reply */}
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  ✉️ Reply via Email
                </a>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl flex items-center justify-center h-64 text-slate-600">
                <div className="text-center">
                  <div className="text-5xl mb-3">👈</div>
                  <p>Select a message to view it</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
