import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Tag } from 'lucide-react';
import api from '../../utils/api';
import AdminPageHeader from './AdminPageHeader';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setError('');
    setSaving(true);
    try {
      await api.post('/admin/categories', { name });
      setNewName('');
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  if (loading) return <Loader text="Loading categories..." />;

  return (
    <div>
      <AdminPageHeader title="Manage Categories" subtitle="Add or remove product categories" />

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-3 max-w-md">
        <input
          className="input-field"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
        />
        <button type="submit" disabled={saving || !newName.trim()} className="btn-primary !px-4 shrink-0 disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          <span className="ml-1.5">Add</span>
        </button>
      </form>

      {/* Category list */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState title="No categories yet" message="Create categories like Office Chairs or Wooden Chairs to organize your products." />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100 max-w-md">
          {categories.map(cat => (
            <div key={cat._id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Tag size={16} />
                </span>
                <div>
                  <p className="font-medium text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-500">/{cat.slug}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(cat._id, cat.name)}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                aria-label={`Delete ${cat.name}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;