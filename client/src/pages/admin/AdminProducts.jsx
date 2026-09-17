import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Loader2, ImagePlus, Palette, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import optimizeImage from '../../utils/imageUtils';
import AdminPageHeader from './AdminPageHeader';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  description: '',
  material: '',
  featured: false,
  inStock: true,
  existingImages: [],
  newImages: [],
  colors: []
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      if (catRes.data.length && !form.category) {
        setForm(prev => ({ ...prev, category: catRes.data[0]._id }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      category: categories[0]?._id || ''
    });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category?._id || product.category,
      price: product.price,
      description: product.description || '',
      material: product.material || '',
      featured: product.featured,
      inStock: product.inStock,
      existingImages: product.images || [],
      newImages: [],
      colors: (product.colors || []).map((c, i) => ({
        key: `existing-${i}`,
        name: c.name,
        image: c.image || '',
        file: null
      }))
    });
    setShowForm(true);
  };

  const addColor = () => {
    setForm(prev => ({
      ...prev,
      colors: [...prev.colors, { key: `new-${Date.now()}-${Math.random()}`, name: '', image: '', file: null }]
    }));
  };

  const updateColor = (key, patch) => {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.map(r => (r.key === key ? { ...r, ...patch } : r))
    }));
  };

  const removeColor = (key) => {
    setForm(prev => ({ ...prev, colors: prev.colors.filter(r => r.key !== key) }));
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setForm(prev => ({ ...prev, newImages: [...prev.newImages, ...files] }));
    // reset so the same file can be re-selected later
    e.target.value = '';
  };

  const removeExistingImg = (url) => {
    setForm(prev => ({ ...prev, existingImages: prev.existingImages.filter(u => u !== url) }));
  };

  const removeNewImg = (idx) => {
    setForm(prev => ({ ...prev, newImages: prev.newImages.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice('');
    if (!form.name.trim() || !form.category || !form.price) {
      setError('Name, category, and price are required');
      return;
    }
    setError('');
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append('name', form.name.trim());
      fd.append('category', form.category);
      fd.append('price', form.price);
      fd.append('description', form.description);
      fd.append('material', form.material);
      fd.append('featured', String(form.featured));
      fd.append('inStock', String(form.inStock));
      fd.append('existingImages', JSON.stringify(form.existingImages));

      const existingColors = [];
      const newColors = [];
      const colorFiles = [];
      form.colors.forEach(r => {
        if (!r.name.trim()) return;
        if (r.file) {
          newColors.push({ name: r.name.trim() });
          colorFiles.push(r.file);
        } else if (r.image) {
          existingColors.push({ name: r.name.trim(), image: r.image });
        }
      });
      fd.append('existingColors', JSON.stringify(existingColors));
      fd.append('newColors', JSON.stringify(newColors));
      colorFiles.forEach(file => fd.append('colorImages', file));

      form.newImages.forEach(file => fd.append('images', file));

      if (editingId) {
        await api.put(`/admin/products/${editingId}`, fd);
        setNotice('Product updated successfully');
      } else {
        await api.post('/admin/products', fd);
        setNotice('Product created successfully');
      }

      setShowForm(false);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/products/${product._id}`);
      setNotice('Product deleted');
      setProducts(prev => prev.filter(p => p._id !== product._id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // show notice briefly
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  if (loading) return <Loader text="Loading products..." />;

  if (error && products.length === 0 && !showForm) {
    return <p className="text-red-600 bg-red-50 border border-red-100 rounded-lg p-4">{error}</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Manage Products"
        subtitle={`${products.length} product(s)`}
        action={
          <button onClick={openAdd} className="btn-primary !px-4 !py-2.5 text-sm">
            <Plus size={16} className="mr-1.5" /> Add Product
          </button>
        }
      />

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}
      {notice && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 inline-flex items-center gap-2">
          <CheckCircle2 size={16} /> {notice}
        </p>
      )}

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState
            title="No products yet"
            message="Add your first product to showcase it on the website."
            action={<button onClick={openAdd} className="btn-primary"><Plus size={16} className="mr-1.5" /> Add Product</button>}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Featured</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] ? (
                        <img src={optimizeImage(product.images[0], 120)} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <span className="w-10 h-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">A1</span>
                      )}
                      <span className="line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{product.category?.name || '—'}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900">₹{Number(product.price).toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {product.featured ? <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Yes</span> : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 rounded-lg text-navy-600 hover:bg-navy-50" title="Edit">
                        <Edit size={17} />
                      </button>
                      <button onClick={() => handleDelete(product)} className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Delete">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Product modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">{editingId ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input className="input-field" name="name" value={form.name} onChange={handleInput} placeholder="e.g. Ergonomic Office Chair" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select className="input-field" name="category" value={form.category} onChange={handleInput} required>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    className="input-field" name="price" value={form.price} onChange={handleInput}
                    type="number" min="0" step="0.01" placeholder="e.g. 3500" required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <input className="input-field" name="material" value={form.material} onChange={handleInput} placeholder="e.g. Leatherette, Mesh, Teak Wood" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-field resize-none" name="description" value={form.description} onChange={handleInput} rows={3} placeholder="Describe the product..." />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>

                {form.existingImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {form.existingImages.map(url => (
                      <div key={url} className="relative group aspect-square">
                        <img src={url} alt="Existing" className="w-full h-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeExistingImg(url)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {form.newImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {form.newImages.map((file, i) => (
                      <div key={file.name + i} className="relative group aspect-square">
                        <img src={URL.createObjectURL(file)} alt={`New ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeNewImg(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-4 py-5 cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors text-sm text-gray-500">
                  <ImagePlus size={18} />
                  Upload images (max 10MB each)
                  <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
                </label>
              </div>

              {/* Colour variants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colour Variants</label>
                <p className="text-xs text-gray-400 mb-3">
                  Optional. Add a colour and its photo — customers click the colour on the product page to see that image, like Amazon/Flipkart.
                </p>

                {form.colors.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {form.colors.map(row => (
                      <div key={row.key} className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5">
                        <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          {row.file || row.image ? (
                            <img
                              src={row.file ? URL.createObjectURL(row.file) : row.image}
                              alt={row.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Palette size={18} className="text-gray-300" />
                          )}
                        </div>
                        <input
                          className="input-field flex-1"
                          value={row.name}
                          onChange={e => updateColor(row.key, { name: e.target.value })}
                          placeholder="Colour name — e.g. Black"
                        />
                        <label className="shrink-0 p-2 rounded-lg text-navy-600 hover:bg-navy-50 cursor-pointer" title="Upload colour photo">
                          <ImagePlus size={17} />
                          <input
                            type="file" accept="image/*" className="hidden"
                            onChange={e => {
                              const f = e.target.files?.[0];
                              if (f) updateColor(row.key, { file: f });
                              e.target.value = '';
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeColor(row.key)}
                          className="shrink-0 p-2 rounded-lg text-red-600 hover:bg-red-50"
                          title="Remove colour"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addColor}
                  className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 hover:border-brand-500 hover:bg-brand-50 hover:text-gray-700 transition-colors"
                >
                  <Plus size={16} /> Add a colour
                </button>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleInput} className="w-4 h-4 accent-brand-600" />
                  Featured on homepage
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleInput} className="w-4 h-4 accent-brand-600" />
                  In stock
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving && <Loader2 size={16} className="mr-2 animate-spin" />}
                  {saving ? 'Saving...' : (editingId ? 'Update Product' : 'Create Product')}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;