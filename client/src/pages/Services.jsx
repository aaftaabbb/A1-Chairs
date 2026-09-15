import { Link } from 'react-router-dom';
import { Phone, ArrowUpRight, ArrowRight, Hammer, Wrench } from 'lucide-react';
import { BUSINESS } from '../utils/constants';

const Services = () => {
  return (
    <div className="bg-paper-100">
      {/* Header */}
      <div className="border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-12">
          <span className="eyebrow"><span className="h-rule" /> Services</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-900">
            Made, or made again.
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            One workshop, two crafts — we build chairs when you need a new one,
            and we bring old ones back to life.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-24">
        {/* 01 — Manufacturing */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow"><span className="h-rule" /> 01 — Manufacturing</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight text-ink-900 leading-[1.1]">
              Built to your spec,<br />not off the shelf.
            </h2>
            <p className="mt-6 text-ink-500 leading-relaxed">
              Tell us the room, the use, and the budget — we manufacture chairs and
              furniture to fit. One piece or a hundred, the standard is the same.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                'Office & executive chairs',
                'Gaming chairs',
                'Wooden chairs & furniture',
                'Sofa sets, recliners & café seating',
                'Bulk orders for offices, schools & hotels'
              ].map(item => (
                <li key={item} className="flex items-start gap-3.5 text-ink-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rust-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-dark"><Phone size={15} /> Get a Quote</Link>
              <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Us</a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div className="border border-rust-200 aspect-[4/3] bg-gradient-to-br from-paper-200 to-paper-300 flex items-center justify-center">
                <svg width="180" height="180" viewBox="0 0 64 64" fill="none" stroke="#403529" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="16" y="26" width="32" height="26" rx="3" />
                  <rect x="12" y="24" width="40" height="5" rx="2" />
                  <line x1="26" y1="52" x2="22" y2="61" />
                  <line x1="38" y1="52" x2="42" y2="61" />
                  <line x1="21" y1="20" x2="19" y2="12" />
                  <line x1="43" y1="20" x2="45" y2="12" />
                </svg>
                <span className="absolute top-6 left-6 bg-ink-900 text-paper-50 text-[10px] uppercase tracking-eyebrow px-3.5 py-2">
                  <Hammer size={12} className="inline mr-1.5 -mt-0.5" /> Manufactured here
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Repairing */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative">
              <div className="border border-moss-200 aspect-[4/3] bg-gradient-to-br from-ink-800 to-ink-950 flex items-center justify-center">
                <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="#E2D9CC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span className="absolute top-6 left-6 bg-paper-50 text-ink-900 text-[10px] uppercase tracking-eyebrow px-3.5 py-2">
                  <Wrench size={12} className="inline mr-1.5 -mt-0.5" /> Repaired here
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="eyebrow"><span className="h-rule" /> 02 — Repairing</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight text-ink-900 leading-[1.1]">
              Loved in,<br />good as new.
            </h2>
            <p className="mt-6 text-ink-500 leading-relaxed">
              A good chair is worth fixing. We repair most chairs in days — often for
              far less than a replacement — and stand behind the work.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                'Gas lift, mechanism & base replacement',
                'Cushioning, foam & re-upholstery',
                'Armrests, casters & tilt systems',
                'Welding & structural repairs',
                'Wooden furniture restoration'
              ].map(item => (
                <li key={item} className="flex items-start gap-3.5 text-ink-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-moss-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-dark"><Phone size={15} /> Book a Repair</Link>
              <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Us</a>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="eyebrow"><span className="h-rule" /> The difference</span>
              <h2 className="section-title mt-4">Why people<br />come back.</h2>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-paper-300 border border-paper-300">
              {[
                { n: '01', t: 'Straight talk', d: 'We tell you honestly what works — and what doesn’t cost you money.' },
                { n: '02', t: 'Fair pricing', d: 'Clear quotes up front. No surprises on the invoice.' },
                { n: '03', t: 'Fast turnaround', d: 'Most repairs handled within days, not weeks.' },
                { n: '04', t: 'Built to last', d: 'Quality materials on every job — new or restored.' }
              ].map(c => (
                <div key={c.n} className="bg-paper-50 p-8">
                  <span className="font-display text-xl text-rust-600 tabular-nums">{c.n}</span>
                  <h3 className="mt-3 font-display text-xl text-ink-900">{c.t}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="bg-ink-950 px-6 py-16 sm:p-16 lg:p-20 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(187,106,59,0.2),transparent)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-5xl text-paper-50 leading-[1.08]">
                Tell us what’s on your floor.
              </h2>
              <p className="mt-4 text-paper-400 max-w-lg mx-auto">
                Send a photo on WhatsApp or call the workshop — we'll advise you right away.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
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

export default Services;