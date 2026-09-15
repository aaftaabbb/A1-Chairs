import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const MAX_PRICE = 100000;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  // Debounced fetch
  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('minPrice', minPrice);
        params.set('maxPrice', maxPrice);
        if (searchQuery) params.set('search', searchQuery);

        const res = await api.get(`/products${params.toString() ? `?${params}` : ''}`);
        const all = res.data;
        const filtered = selectedCategories.length
          ? all.filter(p => selectedCategories.includes(p.category?._id))
          : all;
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [selectedCategories, minPrice, maxPrice, searchQuery]);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => {});
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
  };

  const resultCount = useMemo(() => products.length, [products]);

  const filtersActive = selectedCategories.length > 0 || minPrice > 0 || maxPrice < MAX_PRICE || searchQuery;

  return (
    <div className="bg-paper-100 min-h-screen">
      {/* Page header */}
      <div className="border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-12">
          <span className="eyebrow"><span className="h-rule" /> The Collection</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-900">
            Choose your chair.
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            Office, executive, gaming, wooden and custom furniture — every piece made or
            repaired in our Vasai workshop.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12">
        {/* Search + mobile filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1 max-w-lg">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              className="input-field !pl-11 !bg-white"
              placeholder="Search the collection…"
              value={searchQuery}
              onChange={(e) => {
                const s = e.target.value;
                if (s) searchParams.set('search', s);
                else searchParams.delete('search');
                setSearchParams(searchParams, { replace: true });
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-outline !px-5"
          >
            <SlidersHorizontal size={15} className="mr-2" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        <div className="flex gap-12">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersPanel
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
              filtersActive={filtersActive}
              onClose={() => setShowFilters(false)}
            />
          </aside>

          {/* Sidebar (mobile) */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 flex justify-end">
              <div className="fixed inset-0 bg-ink-950/50" onClick={() => setShowFilters(false)} />
              <div className="relative bg-paper-50 h-full w-80 max-w-[85%] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow">Filters</span>
                  <button onClick={() => setShowFilters(false)} className="p-1.5 text-ink-500" aria-label="Close filters">
                    <X size={18} />
                  </button>
                </div>
                <FiltersPanel
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  clearFilters={clearFilters}
                  filtersActive={filtersActive}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[12px] uppercase tracking-wider text-ink-400">
                {loading ? 'Gathering…' : `${resultCount} ${resultCount === 1 ? 'piece' : 'pieces'}`}
              </p>
              {filtersActive && (
                <button onClick={clearFilters} className="text-link !text-xs">
                  Clear all filters <X size={13} />
                </button>
              )}
            </div>

            {loading ? (
              <Loader text="Loading the collection" />
            ) : resultCount === 0 ? (
              <div className="card-line">
                <EmptyState
                  title="Nothing matches that just yet"
                  message="Try a different search or relax the filters — the right chair is probably in here."
                  action={<button onClick={clearFilters} className="btn-dark">Reset Filters</button>}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FiltersPanel = ({
  categories, selectedCategories, toggleCategory,
  minPrice, maxPrice, setMinPrice, setMaxPrice, clearFilters, filtersActive
}) => (
  <div className="space-y-10">
    <div>
      <h3 className="text-[11px] uppercase tracking-eyebrow text-ink-900 mb-5 flex items-center justify-between">
        Category
        {filtersActive && (
          <button onClick={clearFilters} className="uppercase tracking-wider text-[11px] text-rust-700 hover:text-ink-900 font-semibold">
            Reset
          </button>
        )}
      </h3>
      <div className="space-y-3">
        {categories.length === 0 && <p className="text-sm text-ink-400">No categories yet</p>}
        {categories.map(cat => (
          <label key={cat._id} className="flex items-center gap-3 cursor-pointer text-sm text-ink-600 hover:text-ink-900 transition-colors group">
            <span className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat._id) ? 'bg-ink-900 border-ink-900' : 'border-ink-300 group-hover:border-ink-500'}`}>
              {selectedCategories.includes(cat._id) && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FBF9F5" strokeWidth="2"><path d="M1 5l3 3 5-6" /></svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat._id)}
              onChange={() => toggleCategory(cat._id)}
              className="sr-only"
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>

    <div className="border-t border-paper-300 pt-8">
      <h3 className="text-[11px] uppercase tracking-eyebrow text-ink-900 mb-5">Price Range</h3>

      <div className="relative h-6 mb-6">
        {/* track */}
        <div className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-paper-300 inset-x-0" />
        {/* active range */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-ink-900"
          style={{
            left: `${(minPrice / MAX_PRICE) * 100}%`,
            right: `${100 - (maxPrice / MAX_PRICE) * 100}%`
          }}
        />
        <input
          type="range"
          min="0" max={MAX_PRICE} step="500" value={minPrice}
          onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 500))}
          className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none slider-thumb"
        />
        <input
          type="range"
          min="0" max={MAX_PRICE} step="500" value={maxPrice}
          onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 500))}
          className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none slider-thumb"
        />
      </div>

      <div className="flex justify-between text-sm tabular-nums">
        <span className="text-ink-900 font-semibold">₹{Number(minPrice).toLocaleString('en-IN')}</span>
        <span className="text-ink-400">{maxPrice >= MAX_PRICE ? `${Number(maxPrice).toLocaleString('en-IN')}+` : `₹${Number(maxPrice).toLocaleString('en-IN')}`}</span>
      </div>
    </div>

    <a
      href="#top"
      className="hidden lg:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-900 transition-colors"
    >
      <ArrowUpRight size={13} /> Back to top
    </a>
  </div>
);

export default Products;