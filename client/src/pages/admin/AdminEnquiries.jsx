import { useEffect, useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import AdminPageHeader from './AdminPageHeader';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const statusOptions = ['new', 'contacted', 'closed'];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/admin/enquiries');
      setEnquiries(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const handleStatusChange = async (enquiry, newStatus) => {
    setError('');
    try {
      const res = await api.put(`/admin/enquiries/${enquiry._id}`, { status: newStatus });
      setEnquiries(prev => prev.map(e => (e._id === enquiry._id ? res.data : e)));
      setNotice(`Enquiry marked as "${newStatus}"`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const parseProduct = (val) => {
    if (!val) return '';
    try {
      const parsed = JSON.parse(val);
      return parsed.name || val;
    } catch {
      return val;
    }
  };

  if (loading) return <Loader text="Loading enquiries..." />;

  if (error && enquiries.length === 0) {
    return <p className="text-red-600 bg-red-50 border border-red-100 rounded-lg p-4">{error}</p>;
  }

  return (
    <div>
      <AdminPageHeader title="Enquiries" subtitle="Leads received from your website" />

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}
      {notice && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 inline-flex items-center gap-2">
          <CheckCircle2 size={16} /> {notice}
        </p>
      )}

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState title="No enquiries yet" message="When customers submit the contact form or enquire about a product, their details will appear here." />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Message</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map(enquiry => (
                <tr key={enquiry._id} className="hover:bg-gray-50 align-top">
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{formatDate(enquiry.createdAt)}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900">{enquiry.name}</td>
                  <td className="px-5 py-3">
                    <a href={`tel:+91${enquiry.phone}`} className="inline-flex items-center gap-1 text-navy-600 hover:underline">
                      <Phone size={13} /> {enquiry.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-[160px] line-clamp-2">{parseProduct(enquiry.productInterested) || '—'}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[220px] line-clamp-3">{enquiry.message || '—'}</td>
                  <td className="px-5 py-3">
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry, e.target.value)}
                      className={`text-sm font-medium rounded-full border-0 cursor-pointer px-3 py-1.5 outline-none ring-1 
                        ${enquiry.status === 'new' ? 'bg-blue-50 text-blue-700 ring-blue-200' : ''}
                        ${enquiry.status === 'contacted' ? 'bg-amber-50 text-amber-700 ring-amber-200' : ''}
                        ${enquiry.status === 'closed' ? 'bg-gray-100 text-gray-600 ring-gray-200' : ''}`}
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;