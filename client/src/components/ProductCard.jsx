import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProductPlaceholder from './ProductPlaceholder';

const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const image = product.images?.[0];
  const hasImage = image && !imgError;
  const category = product.category?.name || 'Chairs';

  return (
    <div className="product-card group flex flex-col">
      {/* Media */}
      <Link
        to={`/products/${product._id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-paper-200"
      >
        {hasImage ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : (
          <ProductPlaceholder className="w-full h-full" />
        )}

        {/* Featured tag */}
        {product.featured && (
          <span className="absolute top-4 left-4 bg-ink-900/85 text-paper-50 text-[10px] font-semibold uppercase tracking-eyebrow px-3 py-1.5">
            Featured
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-4 right-4 bg-rust-700 text-paper-50 text-[10px] font-semibold uppercase tracking-eyebrow px-3 py-1.5">
            Out
          </span>
        )}

        {/* Hover CTA */}
        <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-ink-900/90 text-paper-50 text-xs font-semibold uppercase tracking-[0.18em] py-3.5 flex items-center justify-center gap-2">
          View Details <ArrowUpRight size={14} />
        </span>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-eyebrow text-ink-400">{category}</span>
        <h3 className="mt-2 font-display text-[17px] leading-snug text-ink-900 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-3 pt-3 border-t border-paper-200 flex items-center justify-between">
          <span className="font-display text-lg tabular-nums text-ink-900">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
          <Link
            to={`/products/${product._id}`}
            className="w-8 h-8 rounded-full border border-ink-900/15 flex items-center justify-center text-ink-700 hover:bg-ink-900 hover:text-paper-50 hover:border-ink-900 transition-colors"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;