import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, ArrowUpRight, ArrowRight, MapPin, Quote, Hammer, Wrench
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
                      className="relative w-[58%] text-ink-800"
                      viewBox="0 0 64 64" fill="none"
                      stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <rect x="16" y="26" width="32" height="26" rx="3" strokeWidth="1.6" />
                      <rect x="12" y="24" width="40" height="5" rx="2" strokeWidth="1.6" />
                      <line x1="26" y1="52" x2="22" y2="61" strokeWidth="1.6" />
                      <line x1="38" y1="52" x2="42" y2="61" strokeWidth="1.6" />
                      <line x1="21" y1="20" x2="19" y2="12" strokeWidth="1.6" />
                      <line x1="43" y1="20" x2="45" y2="12" strokeWidth="1.6" />
                      <path d="M15 30c4-1.5 9-1.5 13 0" strokeWidth="1.2" opacity="0.55" />
                      <path d="M49 30c-4-1.5-9-1.5-13 0" strokeWidth="1.2" opacity="0.55" />
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
            <div className="grid grid-cols-5 gap-3">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className={`${i % 2 ? 'mt-8' : ''} aspect-[3/4] bg-gradient-to-b ${i % 2 ? 'from-ink-800 to-ink-950' : 'from-ink-700 to-ink-900'} border border-ink-800 flex items-center justify-center`}>
                  <svg width="34" height="34" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-paper-500/50" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="16" y="26" width="32" height="26" rx="3" />
                    <line x1="26" y1="52" x2="22" y2="60" />
                    <line x1="38" y1="52" x2="42" y2="60" />
                  </svg>
                </div>
              ))}
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