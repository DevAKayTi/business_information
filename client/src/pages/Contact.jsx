import { useState } from 'react';
import { submitContact } from '../api/contact.api';

const contactInfo = [
  { icon: '📞', title: 'Phone', value: '(555) 123-4567', link: 'tel:+15551234567' },
  { icon: '✉️', title: 'Email', value: 'info@plumbpro.com', link: 'mailto:info@plumbpro.com' },
  { icon: '📍', title: 'Address', value: '123 Plumber Ave, Sydney NSW 2000', link: null },
  { icon: '🕐', title: 'Hours', value: '24/7 Emergency Service', link: null },
];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm';

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mt-3 mb-6">
            Contact <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question or need a quote? Fill out the form below and we'll get back to you within hours.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            {contactInfo.map(({ icon, title, value, link }) => (
              <div
                key={title}
                className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-500/20 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold mb-0.5">{title}</p>
                  {link ? (
                    <a href={link} className="text-white font-medium hover:text-cyan-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Emergency Banner */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-5 mt-4">
              <div className="text-2xl mb-2">🚨</div>
              <h3 className="text-white font-bold mb-1">Plumbing Emergency?</h3>
              <p className="text-slate-400 text-sm mb-3">Don't wait — call us right now for immediate assistance.</p>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:-translate-y-0.5 transition-all shadow-lg"
              >
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/40 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        Phone (optional)
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="" disabled>Select a subject</option>
                        <option>Emergency Repair</option>
                        <option>General Inquiry</option>
                        <option>Get a Quote</option>
                        <option>Schedule Service</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your plumbing issue or question..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      '✉️ Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
