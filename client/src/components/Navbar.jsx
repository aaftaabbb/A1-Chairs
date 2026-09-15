import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS } from '../utils/constants';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden lg:block bg-ink-950 text-paper-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 h-9 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase">
          <p className="text-paper-400">Chair Manufacturing &amp; Repairing — Palghar, Maharashtra</p>
          <div className="flex items-center gap-8">
            <span className="hidden xl:inline">Mon–Sun · 9 AM–8 PM</span>
            <a href={`tel:+91${BUSINESS.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={12} /> {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-paper-100/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-soft border-b border-paper-300' : 'border-b border-paper-300'}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[76px] lg:h-20">
            {/* Wordmark */}
            <Link to="/" className="group flex items-baseline gap-1.5 shrink-0">
              <span className="font-display text-[26px] lg:text-[28px] font-semibold leading-none tracking-tight">
                A1<span className="text-rust-700">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-eyebrow text-ink-500 pt-0.5">
                Chairs
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-rust-700'
                        : 'text-ink-600 hover:text-ink-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition-colors"
              >
                WhatsApp
              </a>
              <a href={`tel:+91${BUSINESS.phone}`} className="btn-dark !px-6 !py-3 !text-[13px]">
                Call Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-paper-50 border-b border-paper-300 shadow-soft">
          <nav className="px-5 py-5 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-2 py-3 text-sm font-semibold tracking-wide border-b border-paper-200 ${
                    isActive ? 'text-rust-700' : 'text-ink-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 flex gap-3">
              <a href={`tel:+91${BUSINESS.phone}`} className="btn-dark flex-1 !py-3">
                <Phone size={15} /> Call Now
              </a>
              <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp flex-1 !py-3">
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;