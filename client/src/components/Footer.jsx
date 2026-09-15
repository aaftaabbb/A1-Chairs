import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { BUSINESS } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-ink-950 text-paper-300">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold text-paper-50 leading-none">
                A1<span className="text-rust-500">.</span>
              </span>
              <span className="text-[11px] uppercase tracking-eyebrow text-paper-400">Chairs</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm text-paper-400 leading-relaxed">
              Manufacturing &amp; repairing of all types of chairs and furniture. Crafted with care and
              built to last — serving homes, offices and businesses across Palghar.
            </p>
            <p className="mt-6 text-xs uppercase tracking-eyebrow text-paper-500">Contact — Jahir Ali</p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-eyebrow text-paper-500 mb-5">Browse</h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/products', label: 'Products' },
                { to: '/services', label: 'Services' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' }
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="flex items-center justify-between group text-paper-300 hover:text-white transition-colors">
                    {link.label}
                    <ArrowUpRight size={14} className="text-paper-500 group-hover:text-rust-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-eyebrow text-paper-500 mb-5">Visit the Workshop</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone size={16} className="text-rust-400 shrink-0 mt-0.5" />
                <a href={`tel:+91${BUSINESS.phone}`} className="hover:text-white transition-colors">{BUSINESS.phone}</a>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-rust-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-paper-400">{BUSINESS.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-rust-400 shrink-0 mt-0.5" />
                <span className="text-paper-400">Mon–Sun · 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
            <a href={`tel:+91${BUSINESS.phone}`} className="btn-primary mt-7 !px-6 !py-3 !text-[13px]">
              <Phone size={15} /> {BUSINESS.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-paper-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-paper-500">
          <p>© {new Date().getFullYear()} A1 Chairs. All rights reserved.</p>
          <p className="font-display italic text-paper-400">Manufacturing &amp; Repairing of all types of chairs &amp; furniture.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;