import { useState } from 'react';
import { Phone, MapPin, Clock, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import api from '../utils/api';
import { BUSINESS } from '../utils/constants';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    const digits = form.phone.replace(/[^\d]/g, '').replace(/^91/, '');
    if (!/^\d{10}$/.test(digits)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/enquiries', form);
      setSuccess(true);
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-paper-100">
      {/* Header */}
      <div className="border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-12">
          <span className="eyebrow"><span className="h-rule" /> Contact</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-900">
            Let's talk chairs.
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            A quote, a repair, a bulk order — call, WhatsApp, or send the form and
            we'll get back to you the same day in most cases.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-paper-300 p-8 sm:p-12">
              {success ? (
                <div className="text-center py-14">
                  <CheckCircle2 size={44} className="mx-auto text-moss-600" />
                  <h3 className="mt-6 font-display text-3xl text-ink-900">Thank you.</h3>
                  <p className="mt-3 text-ink-500 leading-relaxed max-w-sm mx-auto">
                    Your enquiry has been received. We'll call you back shortly —
                    usually the same day.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn-dark mt-8">Send Another</button>
                </div>
              ) : (
                <>
                  <span className="eyebrow"><span className="h-rule" /> Send an enquiry</span>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-900">Tell us what you need</h2>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Your Name</label>
                        <input className="input-field !bg-white" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Phone Number</label>
                        <input className="input-field !bg-white" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" inputMode="numeric" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Message</label>
                      <textarea
                        className="input-field !bg-white resize-none"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="e.g. I need 5 office chairs for a new branch, or — my chair's gas lift is broken…"
                      />
                    </div>

                    {error && <p className="text-sm text-rust-700 bg-rust-50 border border-rust-200 px-4 py-3">{error}</p>}

                    <button type="submit" disabled={submitting} className="btn-dark w-full !py-4 disabled:opacity-60">
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                      {submitting ? 'Sending…' : 'Send Enquiry'}
                    </button>

                    <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp w-full !py-4">
                      <MessageCircle size={16} /> Or chat on WhatsApp
                    </a>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Info + map */}
          <div className="lg:col-span-5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-paper-50 border border-paper-300 p-6">
                <Phone size={18} className="text-rust-600" />
                <p className="mt-3 text-[10px] uppercase tracking-eyebrow text-ink-400">Phone / WhatsApp</p>
                <a href={`tel:+91${BUSINESS.phone}`} className="mt-1 block font-display text-xl text-ink-900 hover:text-rust-700">{BUSINESS.phone}</a>
                <p className="mt-1 text-xs text-ink-400">Contact · Jahir Ali</p>
              </div>
              <div className="bg-paper-50 border border-paper-300 p-6">
                <Clock size={18} className="text-rust-600" />
                <p className="mt-3 text-[10px] uppercase tracking-eyebrow text-ink-400">Hours</p>
                <p className="mt-1 font-display text-xl text-ink-900">Mon – Sun</p>
                <p className="mt-1 text-xs text-ink-400">9:00 AM – 8:00 PM</p>
              </div>
            </div>

            <div className="bg-paper-50 border border-paper-300 p-6">
              <MapPin size={18} className="text-rust-600" />
              <p className="mt-3 text-[10px] uppercase tracking-eyebrow text-ink-400">Workshop address</p>
              <p className="mt-1.5 text-ink-700 leading-relaxed">{BUSINESS.address}</p>
            </div>

            <div className="border border-paper-300 bg-paper-200 overflow-hidden min-h-[320px]">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                title="A1 Chairs location"
                className="w-full h-[360px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;