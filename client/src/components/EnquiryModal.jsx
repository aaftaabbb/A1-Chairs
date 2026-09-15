import { useState } from 'react';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

const EnquiryModal = ({ productName, productId, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter your name and phone number');
      return;
    }
    const digits = form.phone.replace(/[^\d]/g, '').replace(/^91/, '');
    if (!/^\d{10}$/.test(digits)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setSubmitting(true);
    try {
      const productInterested = productId
        ? JSON.stringify({ id: productId, name: productName })
        : productName || '';
      await api.post('/enquiries', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        productInterested
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setForm({ name: '', phone: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-paper-50 w-full max-w-md shadow-lift max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-paper-300">
          <div>
            <span className="eyebrow">Enquiry</span>
            <h3 className="mt-2 font-display text-2xl text-ink-900 leading-tight">
              {success ? 'Message sent' : (productName ? productName : 'Send an enquiry')}
            </h3>
          </div>
          <button onClick={resetAndClose} className="p-1.5 hover:text-ink-900 text-ink-400" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="px-7 py-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 size={44} className="mx-auto text-moss-600" />
              <h4 className="mt-5 font-display text-xl text-ink-900">Thank you, {form.name.split(' ')[0]}.</h4>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                We've received your enquiry and will call you back shortly.
                {productName && ` We'll discuss "${productName}" with you.`}
              </p>
              <button onClick={resetAndClose} className="btn-dark mt-7">Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {productName && (
                <p className="text-sm text-ink-600 bg-rust-50 border-l-2 border-rust-500 px-4 py-2.5">
                  Enquiry for <span className="font-semibold text-ink-900">"{productName}"</span>
                </p>
              )}

              <div>
                <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Your Name</label>
                <input
                  className="input-field"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Phone Number</label>
                <input
                  className="input-field"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-eyebrow text-ink-500 mb-1.5">Message</label>
                <textarea
                  className="input-field resize-none"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us what you need…"
                />
              </div>

              {error && <p className="text-sm text-rust-700 bg-rust-50 border border-rust-200 px-4 py-2.5">{error}</p>}

              <button type="submit" disabled={submitting} className="btn-dark w-full disabled:opacity-60">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                {submitting ? 'Sending…' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;