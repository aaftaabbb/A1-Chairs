import { Link } from 'react-router-dom';
import { Phone, ArrowUpRight, MapPin, BadgeCheck } from 'lucide-react';
import { BUSINESS } from '../utils/constants';

const About = () => {
  return (
    <div className="bg-paper-100">
      {/* Header */}
      <div className="border-b border-paper-300 bg-paper-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-12">
          <span className="eyebrow"><span className="h-rule" /> About</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-900 leading-[1.02]">
            Workshop roots,<br />
            <em className="italic text-rust-700">craftsmanship first.</em>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* Story */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-ink-600 leading-relaxed text-lg font-display">
              A1 Chairs began as a single workbench in Vasai East. Today it's a
              full workshop where chairs are built from scratch and repaired by hand —
              run by <span className="text-ink-900 font-semibold">Jahir Ali</span> and a small,
              skilled team that treats every seat as if it were their own.
            </p>
            <p className="mt-6 text-ink-500 leading-relaxed">
              We manufacture office, executive, gaming, wooden and custom furniture, and we
              repair all of it too. The philosophy is simple: make it right, price it fairly,
              and finish when you promise. That's why offices, schools, cafés and homes
              across Palghar keep returning.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-paper-300 border border-paper-300 max-w-lg">
{[
                  { n: '5+', l: 'Years experience' },
                  { n: '300+', l: 'Chairs repaired' },
                  { n: '100%', l: 'Commitment' }
                ].map(s => (
                <div key={s.l} className="bg-paper-50 py-6 px-4 text-center">
                  <p className="stat-number !text-3xl">{s.n}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wider text-ink-400">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-paper-300 bg-paper-200 aspect-[4/5] flex items-center justify-center bg-gradient-to-br from-paper-200 to-paper-300">
              <svg width="170" height="170" viewBox="0 0 64 64" fill="none" stroke="#403529" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="16" y="26" width="32" height="26" rx="3" />
                <rect x="12" y="24" width="40" height="5" rx="2" />
                <line x1="26" y1="52" x2="22" y2="61" />
                <line x1="38" y1="52" x2="42" y2="61" />
                <line x1="21" y1="20" x2="19" y2="12" />
                <line x1="43" y1="20" x2="45" y2="12" />
              </svg>
              <div className="absolute bottom-6 left-6 right-6 bg-paper-50 px-5 py-4 shadow-lift">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-eyebrow text-ink-400">
                  <MapPin size={13} className="text-rust-600" /> Kaman · Vasai East · Palghar
                </p>
                <p className="mt-1.5 font-display text-ink-900">Est. in Vasai, Palghar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="eyebrow"><span className="h-rule" /> Why us</span>
              <h2 className="section-title mt-4">What stands<br />behind the name.</h2>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-paper-300 border border-paper-300">
              {[
                { t: 'Do it properly', d: 'No shortcuts on materials, joints or finishes.' },
                { t: 'Talk straight', d: 'If a repair isn’t worth it, we’ll tell you honestly.' },
                { t: 'Respect the clock', d: 'Quotes and timelines that we actually keep.' },
                { t: 'Every scale', d: 'From one café chair to a whole office fleet.' }
              ].map(v => (
                <div key={v.t} className="bg-paper-50 p-8">
                  <BadgeCheck size={20} className="text-rust-600" />
                  <h3 className="mt-4 font-display text-xl text-ink-900">{v.t}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact person */}
        <section className="mt-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="font-display italic text-2xl text-ink-300">"We're a small shop — you'll deal directly with the people doing the work."</span>
            <p className="mt-5 font-semibold text-ink-900">— Jahir Ali, A1 Chairs</p>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
              <a href={`tel:+91${BUSINESS.phone}`} className="btn-dark"><Phone size={16} /> {BUSINESS.phone}</a>
              <Link to="/contact" className="btn-outline">Contact Us <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;