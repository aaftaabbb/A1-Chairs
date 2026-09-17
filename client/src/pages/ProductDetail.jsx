import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Phone, MessageCircle, Check,
  ArrowLeft, Quote, Hammer, Wrench, Timer, Truck
} from 'lucide-react';
import api from '../utils/api';
import optimizeImage from '../utils/imageUtils';
import Loader from '../components/Loader';
import EnquiryModal from '../components/EnquiryModal';
import ProductPlaceholder from '../components/ProductPlaceholder';
import { BUSINESS } from '../utils/constants';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    window.scrollTo(0, 0);
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setActiveImage(0);
      })
      .catch(err => setError(err.response?.data?.message || 'Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader text="Loading piece…" />;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-28 text-center">
        <span className="font-display italic text-2xl text-ink-300">"{error}"</span>
        <p className="mt-4 text-ink-500">This piece may have been moved or retired.</p>
        <button onClick={() => navigate('/products')} className="btn-dark mt-7">
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];
  const colors = product.colors && product.colors.length ? product.colors : [];
  const activeVariant = activeColor !== null && colors[activeColor] ? colors[activeColor] : null;
  const displayImage = optimizeImage(activeVariant?.image || images[activeImage], 1100);
  const whatsappMessage = encodeURIComponent(
    `Hello A1 Chairs! I'm interested in "${product.name}"${activeVariant ? ` (${activeVariant.name})` : ''} (₹${Number(product.price).toLocaleString('en-IN')}). Please share more details.`
  );

  const nextImage = () => setActiveImage(prev => (prev + 1) % images.length);
  const prevImage = () => setActiveImage(prev => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-paper-100 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-14">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-[13px] text-ink-400 mb-10 lg:mb-12">
          <Link to="/" className="hover:text-ink-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-ink-900 transition-colors">The Collection</Link>
          <span>/</span>
          <span className="text-ink-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative bg-paper-200 border border-paper-300 aspect-square overflow-hidden">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={activeVariant ? `${product.name} — ${activeVariant.name}` : `${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProductPlaceholder className="w-full h-full" />
              )}

              {images.length > 1 && !activeVariant && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper-50/90 hover:bg-paper-50 border border-paper-300 flex items-center justify-center text-ink-700 shadow-soft transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={19} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper-50/90 hover:bg-paper-50 border border-paper-300 flex items-center justify-center text-ink-700 shadow-soft transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={19} />
                  </button>
                </>
              )}

              <span className="absolute top-5 left-5 bg-ink-900/85 text-paper-50 text-[10px] uppercase tracking-eyebrow px-3 py-1.5">
                {activeVariant
                  ? `Colour — ${activeVariant.name}`
                  : images.length > 0
                    ? `${activeImage + 1} / ${images.length}`
                    : 'To be photographed'}
              </span>
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setActiveColor(null); }}
                    className={`shrink-0 w-24 h-24 lg:w-28 lg:h-28 bg-paper-200 border overflow-hidden transition-colors ${
                      activeImage === i && !activeVariant ? 'border-ink-900' : 'border-paper-300 hover:border-ink-400'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={optimizeImage(img, 240)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <span className="eyebrow">
              <span className="h-rule" /> {product.category?.name || 'Chairs'}
            </span>

            <h1 className="mt-4 font-display text-4xl lg:text-5xl tracking-tight text-ink-900 leading-[1.05]">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-5">
              <p className="font-display text-3xl tabular-nums text-ink-900">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
              <span className={`text-[11px] uppercase tracking-wider px-3 py-1.5 border ${
                product.inStock ? 'border-moss-500/40 text-moss-700 bg-moss-50' : 'border-rust-400/50 text-rust-700 bg-rust-50'
              }`}>
                {product.inStock ? 'In stock' : 'On enquiry'}
              </span>
            </div>

            {/* Colour variants */}
            {colors.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-eyebrow text-ink-900">Colour</span>
                  <span className="text-sm text-ink-600 font-medium">
                    {activeVariant ? activeVariant.name : 'Select a shade'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveColor(activeColor === i ? null : i)}
                      className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-colors ${
                        activeColor === i ? 'border-ink-900' : 'border-paper-300 hover:border-ink-400'
                      }`}
                      title={c.name}
                      aria-label={`Colour ${c.name}`}
                    >
                      {c.image ? (
                        <img src={optimizeImage(c.image, 100)} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="block w-full h-full bg-paper-300" />
                      )}
                      {activeColor === i && (
                        <span className="absolute inset-0 bg-ink-900/30 flex items-center justify-center">
                          <Check size={16} className="text-paper-50" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <dl className="mt-10">
              {product.material && (
                <div className="flex py-4 border-t border-paper-300">
                  <dt className="w-36 shrink-0 text-[11px] uppercase tracking-wider text-ink-400 pt-0.5">Material</dt>
                  <dd className="text-ink-800 font-medium">{product.material}</dd>
                </div>
              )}
              <div className="flex py-4 border-t border-paper-300">
                <dt className="w-36 shrink-0 text-[11px] uppercase tracking-wider text-ink-400 pt-0.5">Availability</dt>
                <dd className="text-ink-800 font-medium">{product.inStock ? 'Ready — delivery available' : 'Made / repaired to order'}</dd>
              </div>
              <div className="flex py-4 border-t border-paper-300">
                <dt className="w-36 shrink-0 text-[11px] uppercase tracking-wider text-ink-400 pt-0.5">Workshop</dt>
                <dd className="text-ink-800 font-medium">Kaman, Vasai East — Palghar</dd>
              </div>
              <div className="border-b border-paper-300" />
            </dl>

            {product.description && (
              <div className="mt-8">
                <h2 className="text-[11px] uppercase tracking-eyebrow text-ink-900">About this piece</h2>
                <p className="mt-3 text-ink-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowEnquiry(true)}
                className="btn-dark flex-1 !py-4"
              >
                <Phone size={17} /> Enquire Now
              </button>
              <a
                href={BUSINESS.whatsappUrl + `?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp flex-1 !py-4"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
            </div>

            {/* Assurance */}
            <div className="mt-8 grid grid-cols-3 gap-px bg-paper-300 border border-paper-300">
              {[
                { icon: Hammer, t: 'Hand-built' },
                { icon: Truck, t: 'Delivery' },
                { icon: Timer, t: 'Repairs backed' }
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="bg-paper-50 px-4 py-5 text-center">
                  <Icon size={18} className="mx-auto text-ink-500" />
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-ink-500">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline testimonial-ish strip */}
        <div className="mt-16 lg:mt-20 border-t border-paper-300">
          <div className="grid lg:grid-cols-12 gap-10 items-center py-10">
            <div className="lg:col-span-8 flex gap-6 items-start">
              <Quote size={30} className="text-rust-300 shrink-0" />
              <p className="font-display text-lg lg:text-xl text-ink-700 leading-relaxed">
                Not sure if this is the right chair for your space or body? Call us —
                we'll tell you straight, and can make it to your exact spec instead.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <a href={`tel:+91${BUSINESS.phone}`} className="btn-outline">
                <Phone size={15} /> Talk to the workshop
              </a>
            </div>
          </div>
        </div>
      </div>

      {showEnquiry && (
        <EnquiryModal
          productName={product.name}
          productId={product._id}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;