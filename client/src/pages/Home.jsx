import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, ArrowUpRight, ArrowRight, MapPin, Quote, Hammer, Wrench,
  Scissors, Ruler, Truck, Layers, Package
} from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { BUSINESS } from '../utils/constants';

const fallbackCategories = [
  { name: 'Office & Executive' },
  { name: 'Gaming Chairs' },
  { name: 'Wooden Chairs' },
  { name: 'Custom Furniture' }
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setFeatured(prodRes.data.filter(p => p.featured));
        setCategories(catRes.data.length ? catRes.data : fallbackCategories);
      } catch (err) {
        setCategories(fallbackCategories);
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-paper-100">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_0%,rgba(226,169,125,0.18),transparent)]" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center pt-14 pb-16 lg:pt-24 lg:pb-28">

            {/* Copy */}
            <div className="lg:col-span-6">
              <span className="eyebrow">
                <span className="h-rule" />
                Manufacturing &amp; Repairing · Vasai East
              </span>

              <h1 className="mt-7 font-display text-[44px] leading-[1.02] sm:text-6xl xl:text-[76px] tracking-tight text-ink-900">
                Every chair,
                <br />
                <em className="italic text-rust-700">built</em> or
                <em className="italic text-rust-700"> repaired</em>
                <br />
                to last.
              </h1>

              <p className="mt-7 text-ink-500 leading-relaxed max-w-md text-[17px]">
                Office, executive, gaming and wooden chairs — manufactured to your spec and
                repaired by craftsmen who care. From a single seat to a full office.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href={`tel:+91${BUSINESS.phone}`} className="btn-dark">
                  <Phone size={16} /> Book a Call
                </a>
                <Link to="/products" className="btn-outline group">
                  Browse Collection
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 divide-x divide-ink-900/10 max-w-md">
                {[
                  { n: '5+', l: 'Years in craft' },
                  { n: '300+', l: 'Chairs repaired' },
                  { n: '100%', l: 'Commitment' }
                ].map(s => (
                  <div key={s.l} className="pr-6 first:pl-0 pl-6 first:pr-6">
                    <p className="stat-number">{s.n}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-400">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-6">
              <div className="relative flex justify-center">
                {/* Arch panel */}
                <div className="relative w-[340px] sm:w-[400px] lg:w-[460px] aspect-[3/4]">
                  <div className="absolute -inset-4 border border-rust-200 rounded-t-full" />
                  <div className="relative w-full h-full overflow-hidden rounded-t-[240px] bg-gradient-to-b from-paper-200 to-paper-300 border border-paper-300 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(60%_45%_at_50%_38%,rgba(255,255,255,0.9),transparent)]" />
                    <svg
                      className="relative w-[64%] text-ink-800"
                      viewBox="0 0 96 96" fill="none"
                      stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      {/* pinstripe texture */}
                      <g strokeWidth="0.6" opacity="0.14">
                        {[22, 30, 38, 46, 54, 62, 70].map(x => (
                          <line key={x} x1={x} y1="8" x2={x} y2="90" />
                        ))}
                      </g>
                      {/* soft ground shadow */}
                      <ellipse cx="48" cy="91" rx="27" ry="3.2" stroke="none" fill="currentColor" opacity="0.16" />
                      {/* headrest */}
                      <rect x="39" y="9" width="18" height="9" rx="4.5" strokeWidth="1.5" />
                      {/* backrest */}
                      <path d="M34 19 C32 40 32 52 36 60 L60 60 C64 52 64 40 62 19 C56 15 42 15 36 19 Z"
                        fill="currentColor" opacity="0.08" />
                      <path d="M36 19 C34 40 34 52 37 60 M60 19 C62 40 62 52 59 60" opacity="0.6" strokeWidth="1.4" />
                      {/* lumbar curve */}
                      <path d="M39 32 C44 28 52 28 57 32" opacity="0.5" strokeWidth="1.2" />
                      {/* armrests */}
                      <rect x="25" y="41" width="9" height="5" rx="2.5" strokeWidth="1.5" />
                      <rect x="62" y="41" width="9" height="5" rx="2.5" strokeWidth="1.5" />
                      <line x1="30" y1="46" x2="30" y2="60" opacity="0.7" strokeWidth="1.3" />
                      <line x1="66" y1="46" x2="66" y2="60" opacity="0.7" strokeWidth="1.3" />
                      {/* seat cushion */}
                      <path d="M31 58 C24 59 24 67 31 68 L65 68 C72 67 72 59 65 58 Z"
                        fill="currentColor" opacity="0.10" />
                      <path d="M33 60 C28 61 28 66 34 66 L62 66 C68 66 68 61 63 60 Z" strokeWidth="1.3" />
                      {/* gas lift */}
                      <line x1="48" y1="67" x2="48" y2="77" strokeWidth="1.5" />
                      {/* base */}
                      <line x1="48" y1="77" x2="31" y2="87" strokeWidth="1.5" />
                      <line x1="48" y1="77" x2="65" y2="87" strokeWidth="1.5" />
                      <line x1="48" y1="77" x2="21" y2="83" strokeWidth="1.5" />
                      <line x1="48" y1="77" x2="75" y2="83" strokeWidth="1.5" />
                      {/* casters */}
                      <circle cx="31" cy="88" r="1.7" stroke="none" fill="currentColor" />
                      <circle cx="65" cy="88" r="1.7" stroke="none" fill="currentColor" />
                      <circle cx="21" cy="84" r="1.7" stroke="none" fill="currentColor" />
                      <circle cx="75" cy="84" r="1.7" stroke="none" fill="currentColor" />
                    </svg>

                    {/* Stamp */}
                    <div className="absolute top-[12%] right-[6%] w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-ink-900/20 bg-paper-50/80 backdrop-blur-sm flex flex-col items-center justify-center">
                      <span className="font-display text-2xl text-ink-900 leading-none">A1</span>
                      <span className="mt-1 text-[8px] uppercase tracking-[0.28em] text-ink-400">Est · Vasai</span>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="hidden sm:block absolute -bottom-8 left-2 lg:left-4 bg-paper-50 border border-paper-300 px-6 py-4 shadow-lift">
                  <p className="text-[10px] uppercase tracking-eyebrow text-ink-400">Craft &amp; Care</p>
                  <p className="mt-1.5 font-display text-lg text-ink-900 leading-tight">
                    Quality that outlasts
                    <br /> the season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-paper-300">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-wrap gap-x-10 gap-y-2 justify-between text-[11px] uppercase tracking-wider text-ink-400">
            <span>Office Furniture</span>
            <span className="hidden sm:inline">Gaming Seating</span>
            <span className="hidden sm:inline">School &amp; Cafes</span>
            <span>Repairs on-site</span>
            <span>Custom Orders</span>
          </div>
        </div>
      </section>

      {/* ============ THE RANGE ============ */}
      <section className="py-16 lg:py-24 border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="eyebrow"><span className="h-rule" /> The Range</span>
              <h2 className="section-title mt-4">Made in Vasai.<br />Nothing standard about it.</h2>
            </div>
            <Link to="/products" className="text-link">
              View all products <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-paper-300">
            {categories.slice(0, 4).map((cat, i) => (
              <Link
                key={cat._id || cat.name}
                to="/products"
                className="group relative bg-paper-50 border-r border-b border-paper-300 p-6 sm:p-8 flex flex-col justify-between min-h-[180px] transition-colors hover:bg-white"
              >
                <span className="font-display text-4xl text-paper-400 group-hover:text-rust-600 transition-colors tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ink-900 leading-tight">{cat.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-400 group-hover:text-rust-700 transition-colors">
                    Explore <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="eyebrow"><span className="h-rule" /> Selected Works</span>
              <h2 className="section-title mt-4">Featured in the workshop</h2>
            </div>
            <Link to="/products" className="text-link">
              See the full collection <ArrowUpRight size={15} />
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : featured.length === 0 ? (
            <div className="card-line">
              <EmptyState
                title="Fresh stock arriving soon"
                message="Our featured pieces are being prepared in the workshop. Browse the full collection meanwhile."
                to="/products"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {featured.slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Link to="/products" className="btn-dark">
                  View All Products <ArrowUpRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section id="services" className="py-16 lg:py-24 bg-white border-y border-paper-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-14">
            {/* Left — heading */}
            <div className="lg:col-span-4">
              <span className="eyebrow"><span className="h-rule" /> What we do</span>
              <h2 className="section-title mt-4">Two craftsmanship,<br />one workshop.</h2>
              <p className="section-subtitle">
                Whether the need is new or the chair is old, the result is the same —
                furniture that works hard and holds up.
              </p>
              <Link to="/services" className="btn-outline mt-8">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right — services list */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-paper-300">
              <Link to="/services" className="group bg-paper-50 p-8 hover:bg-white transition-colors">
                <span className="text-[11px] uppercase tracking-eyebrow text-rust-600">01 — Manufacturing</span>
                <h3 className="mt-4 font-display text-2xl text-ink-900">Built to order</h3>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                  Office, executive, gaming, wooden and custom furniture — made to your
                  measurements, material and budget.
                </p>
                <span className="mt-6 inline-flex w-10 h-10 rounded-full border border-ink-900/15 items-center justify-center text-ink-700 group-hover:bg-ink-900 group-hover:text-paper-50 group-hover:border-ink-900 transition-colors">
                  <Hammer size={17} />
                </span>
              </Link>

              <Link to="/services" className="group bg-paper-50 p-8 hover:bg-white transition-colors">
                <span className="text-[11px] uppercase tracking-eyebrow text-moss-600">02 — Repairing</span>
                <h3 className="mt-4 font-display text-2xl text-ink-900">Restored to life</h3>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                  Gas lifts, cushioning, re-upholstery, welding and structural fixes —
                  often at a fraction of the cost of new.
                </p>
                <span className="mt-6 inline-flex w-10 h-10 rounded-full border border-ink-900/15 items-center justify-center text-ink-700 group-hover:bg-ink-900 group-hover:text-paper-50 group-hover:border-ink-900 transition-colors">
                  <Wrench size={17} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CRAFT / ABOUT PREVIEW ============ */}
      <section className="bg-ink-950 text-paper-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-6 gap-3 auto-rows-[92px]">
              {/* 01 — Big workshop card */}
              <div className="relative col-span-2 row-span-2 bg-ink-800 border border-ink-700 overflow-hidden p-5 flex flex-col justify-between group">
                <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_25%_15%,rgba(216,168,126,0.18),transparent)]" />
                <div className="absolute inset-y-0 right-0 w-px bg-ink-700" />
                <span className="relative text-[10px] uppercase tracking-eyebrow text-paper-400">01 — The workshop</span>
                <Hammer size={30} className="relative text-rust-400" />
                <p className="relative font-display text-lg text-paper-50 leading-snug">
                  Repairs that leave pieces<br />better than new.
                </p>
              </div>

              {/* 02 — Upholstery */}
              <div className="relative col-span-2 border border-ink-700 bg-gradient-to-b from-ink-900 to-ink-800 p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent_0_9px,rgba(239,233,223,0.05)_9px_10px)]" />
                <span className="relative text-[10px] uppercase tracking-eyebrow text-paper-400">02 — Upholstery</span>
                <Scissors size={24} className="relative text-paper-300" />
                <p className="relative text-sm text-paper-200">Fabric, PU, mesh &amp; foam</p>
              </div>

              {/* 03 — Wood & polish */}
              <div className="relative col-span-2 border border-ink-700 bg-gradient-to-b from-ink-900 to-ink-800 p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent_0_11px,rgba(239,233,223,0.05)_11px_12px)]" />
                <span className="relative text-[10px] uppercase tracking-eyebrow text-paper-400">03 — Wood &amp; polish</span>
                <Ruler size={24} className="relative text-paper-300" />
                <p className="relative text-sm text-paper-200">Teak, sheesham &amp; finishing</p>
              </div>

              {/* 04 — Lift & base */}
              <div className="relative col-span-2 border border-ink-700 bg-gradient-to-b from-ink-900 to-ink-800 p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(rgba(239,233,223,0.07)_1px,transparent_1px)] bg-[size:12px_12px]" />
                <span className="relative text-[10px] uppercase tracking-eyebrow text-paper-400">04 — Lift &amp; base</span>
                <Wrench size={24} className="relative text-paper-300" />
                <p className="relative text-sm text-paper-200">Gas lifts, casters, welding</p>
              </div>

              {/* 05 — On-site service */}
              <div className="relative col-span-2 border border-ink-700 bg-gradient-to-b from-ink-900 to-ink-800 p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(135deg,transparent_0_9px,rgba(239,233,223,0.05)_9px_10px)]" />
                <span className="relative text-[10px] uppercase tracking-eyebrow text-paper-400">05 — On-site service</span>
                <Truck size={24} className="relative text-paper-300" />
                <p className="relative text-sm text-paper-200">We come to your office</p>
              </div>

              {/* 06 — Made to measure */}
              <div className="relative col-span-3 border border-ink-700 bg-gradient-to-b from-ink-800 to-ink-900 p-5 flex items-end justify-between gap-4 overflow-hidden">
                <span className="absolute top-4 left-5 text-[10px] uppercase tracking-eyebrow text-rust-400">06 — Made to measure</span>
                <p className="absolute bottom-5 mt-2 font-display text-lg text-paper-50">Custom sizes, any order.</p>
                <Layers size={26} className="absolute right-5 top-1/2 -translate-y-1/2 text-paper-300 shrink-0" />
              </div>

              {/* 07 — Contract work */}
              <div className="relative col-span-3 border border-ink-700 bg-gradient-to-b from-ink-800 to-ink-900 p-5 flex items-end justify-between gap-4 overflow-hidden">
                <span className="absolute top-4 left-5 text-[10px] uppercase tracking-eyebrow text-rust-400">07 — Contract work</span>
                <p className="absolute bottom-5 mt-2 font-display text-lg text-paper-50">Bulk &amp; long-term partners.</p>
                <Package size={26} className="absolute right-5 top-1/2 -translate-y-1/2 text-paper-300 shrink-0" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="eyebrow"><span className="h-rule" /> The Craft</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-paper-50 leading-[1.1]">
              Built by hand.<br />Backed by years.
            </h2>
            <p className="mt-6 text-paper-400 leading-relaxed max-w-lg">
              A1 Chairs is a family-run workshop in Vasai East — a place where chairs are
              made properly and repaired honestly, not just moved through a line.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'All types — office, gaming, wooden, executive',
                'Custom measurements and materials',
                'On-site and walk-in repairs',
                'Bulk and contract orders welcome'
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 text-paper-200 text-[15px]">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-rust-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-5 items-center">
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
              <a href={`tel:+91${BUSINESS.phone}`} className="font-display italic text-lg text-paper-200 hover:text-white transition-colors">
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 lg:py-24 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-9">
              <div className="grid sm:grid-cols-3 gap-10">
                {[
                  {
                    quote: 'Got twenty office chairs manufactured for our office. Clean work, delivered on time. We simply came back for more.',
                    name: 'Ravi Sharma',
                    role: 'Office Owner · Vasai'
                  },
                  {
                    quote: 'My gaming chair was beyond saving. He brought it back better than new. Genuinely impressed.',
                    name: 'Priya Desai',
                    role: 'Home Customer'
                  },
                  {
                    quote: 'We run a café and seat a lot of people. Regular repairs and quick turnaround keep everything looking sharp.',
                    name: 'Amit Patil',
                    role: 'Café Owner · Palghar'
                  }
                ].map((t, i) => (
                  <figure key={i} className="flex flex-col">
                    <Quote size={26} className="text-rust-300" />
                    <blockquote className="mt-5 font-display text-lg leading-relaxed text-ink-800">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-paper-300">
                      <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                      <p className="text-[11px] uppercase tracking-wider text-ink-400 mt-0.5">{t.role}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <span className="eyebrow"><span className="h-rule" /> Their words</span>
              <h2 className="section-title mt-4">Customers<br />keep coming<br />back.</h2>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / MAP PREVIEW ============ */}
      <section className="py-16 lg:py-24 bg-white border-t border-paper-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow"><span className="h-rule" /> Visit us</span>
              <h2 className="section-title mt-4">Drop by the workshop, or just call.</h2>
              <p className="section-subtitle">
                We're easy to find near Kolhi, Kaman in Vasai East. Walk in with a broken
                chair, or call ahead for a quote.
              </p>

              <div className="mt-8 space-y-5 text-[15px]">
                <div className="flex gap-4">
                  <Phone size={18} className="text-rust-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-ink-400">Phone</p>
                    <a href={`tel:+91${BUSINESS.phone}`} className="font-display text-xl text-ink-900 hover:text-rust-700">{BUSINESS.phone}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={18} className="text-rust-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-ink-400">Address</p>
                    <p className="text-ink-700 leading-relaxed">{BUSINESS.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-dark">Contact Us</Link>
                <a href={`tel:+91${BUSINESS.phone}`} className="btn-outline">Call Now</a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative border border-paper-300">
                <iframe
                  src={BUSINESS.mapEmbedUrl}
                  title="A1 Chairs workshop location"
                  className="w-full h-[420px]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-4 left-4 bg-paper-50 px-5 py-3.5 shadow-lift">
                  <p className="text-[10px] uppercase tracking-eyebrow text-ink-400">Find us at</p>
                  <p className="mt-1 font-display text-ink-900">Kaman, Vasai East — Palghar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative bg-ink-950 px-6 py-16 sm:p-16 lg:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(187,106,59,0.22),transparent)]" />
            <div className="relative">
              <span className="eyebrow justify-center"><span className="h-rule" /> Ready when you are</span>
              <h2 className="mt-5 font-display text-3xl sm:text-5xl text-paper-50 leading-[1.08]">
                A broken chair, or a whole new batch —
                <span className="italic text-rust-400"> either way, we're in.</span>
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a href={`tel:+91${BUSINESS.phone}`} className="btn-primary">
                  <Phone size={16} /> {BUSINESS.phone}
                </a>
                <Link to="/contact" className="btn-outline !border-paper-50/40 !text-paper-50 hover:!border-rust-500 hover:!text-rust-400">
                  Send an Enquiry <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;