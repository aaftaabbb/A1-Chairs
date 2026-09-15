import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import api from '../utils/api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get('/gallery')
      .then(res => setImages(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load gallery'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-paper-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-12">
          <span className="eyebrow"><span className="h-rule" /> Gallery</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-900">
            Work from the floor.
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            New chairs leaving the workshop, and old ones restored — a look at the
            work that goes out the door.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        {loading ? (
          <Loader text="Loading the gallery" />
        ) : error ? (
          <p className="text-sm text-rust-700 bg-rust-50 border border-rust-200 px-4 py-3">{error}</p>
        ) : images.length === 0 ? (
          <div className="card-line">
            <EmptyState
              title="Fresh photos are coming"
              message="We're photographing recent work. The gallery will fill up soon — meanwhile, see the collection."
              to="/products"
            />
          </div>
        ) : (
          <>
            <div className="mb-8 text-[12px] uppercase tracking-wider text-ink-400">
              {images.length} {images.length === 1 ? 'photograph' : 'photographs'}
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
              {images.map(img => (
                <button
                  key={img._id}
                  onClick={() => setLightbox(img)}
                  className="group relative block w-full overflow-hidden bg-paper-200 border border-paper-300"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.caption || 'A1 Chairs work'}
                    loading="lazy"
                    className="w-full h-auto object-cover min-h-[160px] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {img.caption && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-5 pt-12 text-left">
                      <span className="text-paper-50 font-display text-sm line-clamp-2">{img.caption}</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-ink-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.imageUrl}
              alt={lightbox.caption || 'Gallery photo'}
              className="mx-auto max-h-[78vh] rounded-none object-contain border border-ink-800"
            />
            {lightbox.caption && (
              <p className="mt-5 text-center font-display text-lg text-paper-100">{lightbox.caption}</p>
            )}
          </div>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 p-2.5 text-paper-300 hover:text-white"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;