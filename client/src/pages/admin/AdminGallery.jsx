import { useEffect, useState } from 'react';
import { Plus, Trash2, X, Loader2, ImagePlus, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import AdminPageHeader from './AdminPageHeader';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState('');

  const fetchImages = async () => {
    try {
      const res = await api.get('/gallery');
      setImages(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('caption', caption.trim());
      await api.post('/admin/gallery', fd);
      setFile(null);
      setCaption('');
      setShowUpload(false);
      setNotice('Photo uploaded successfully');
      await fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await api.delete(`/admin/gallery/${img._id}`);
      setImages(prev => prev.filter(i => i._id !== img._id));
      setNotice('Photo deleted');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete photo');
    }
  };

  if (loading) return <Loader text="Loading gallery..." />;

  return (
    <div>
      <AdminPageHeader
        title="Manage Gallery"
        subtitle={`${images.length} photo(s)`}
        action={
          <button onClick={() => setShowUpload(true)} className="btn-primary !px-4 !py-2.5 text-sm">
            <Plus size={16} className="mr-1.5" /> Upload Photo
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

      {images.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState
            title="No photos yet"
            message="Upload photos of your finished work to showcase it in the public gallery."
            action={<button onClick={() => setShowUpload(true)} className="btn-primary"><Plus size={16} className="mr-1.5" /> Upload Photo</button>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img._id} className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-square overflow-hidden">
                <img src={img.imageUrl} alt={img.caption || 'Gallery photo'} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <button
                onClick={() => handleDelete(img)}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                aria-label="Delete photo"
              >
                <Trash2 size={15} />
              </button>
              {img.caption && (
                <p className="px-3 py-2 text-xs text-gray-600 line-clamp-1">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowUpload(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Upload Photo</h3>
              <button onClick={() => setShowUpload(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors text-center">
                {file ? (
                  <>
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                    <span className="text-sm text-gray-700 font-medium">{file.name}</span>
                  </>
                ) : (
                  <>
                    <ImagePlus size={28} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Click to choose a photo</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption (optional)</label>
                <input
                  className="input-field"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Customer office chair repair"
                />
              </div>

              <button type="submit" disabled={uploading || !file} className="btn-primary w-full disabled:opacity-60">
                {uploading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Plus size={16} className="mr-2" />}
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;