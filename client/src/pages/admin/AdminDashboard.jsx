import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, FolderOpen, Mail, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import AdminPageHeader from './AdminPageHeader';
import Loader from '../../components/Loader';

const DashboardCard = ({ icon: Icon, label, value, color, to }) => (
  <Link
    to={to}
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex items-center justify-between"
  >
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white`}>
      <Icon size={22} />
    </div>
  </Link>
);

const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    closed: 'bg-gray-200 text-gray-600'
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || styles.new}`}>
      {status}
    </span>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  if (error) {
    return <p className="text-red-600 bg-red-50 border border-red-100 rounded-lg p-4">{error}</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Overview of your business activity"
      />

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard icon={Package} label="Total Products" value={stats.totalProducts} color="bg-brand-600" to="/admin/products" />
        <DashboardCard icon={FolderOpen} label="Total Categories" value={stats.totalCategories} color="bg-navy-600" to="/admin/categories" />
        <DashboardCard icon={Inbox} label="Total Enquiries" value={stats.totalEnquiries} color="bg-purple-600" to="/admin/enquiries" />
        <DashboardCard icon={Mail} label="New Enquiries" value={stats.newEnquiries} color="bg-green-600" to="/admin/enquiries" />
      </div>

      {/* Recent enquiries */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {stats.recentEnquiries.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-gray-500">No enquiries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Phone</th>
                <th className="px-6 py-3 font-semibold hidden md:table-cell">Message</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentEnquiries.map(enquiry => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{enquiry.name}</td>
                  <td className="px-6 py-3 text-gray-600">{enquiry.phone}</td>
                  <td className="px-6 py-3 text-gray-500 hidden md:table-cell line-clamp-1 max-w-xs">
                    {enquiry.message || '—'}
                  </td>
                  <td className="px-6 py-3"><StatusBadge status={enquiry.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;