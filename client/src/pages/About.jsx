import { Link } from 'react-router-dom';

const team = [
  { name: 'James Carter', role: 'Founder & Master Plumber', emoji: '👨‍🔧', exp: '20 years' },
  { name: 'Sarah Mitchell', role: 'Senior Plumber', emoji: '👩‍🔧', exp: '12 years' },
  { name: 'Tom Rodriguez', role: 'Gas Fitter & Plumber', emoji: '👨‍🔧', exp: '8 years' },
];

const timeline = [
  { year: '2009', event: 'PlumbPro founded by James Carter with a single van and a commitment to quality.' },
  { year: '2013', event: 'Expanded to a team of 5 licensed plumbers and opened our first office.' },
  { year: '2017', event: 'Launched 24/7 emergency services and received our Master Plumber accreditation.' },
  { year: '2021', event: 'Grew to 15+ team members and served over 2,000 satisfied customers.' },
  { year: '2024', event: 'Recognised as the #1 rated plumbing service in the region on Google.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* ─── HEADER ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Our Story</span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mt-3 mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">PlumbPro</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            For over 15 years, PlumbPro has been the trusted name for plumbing services in our community.
            We combine expert craftsmanship with outstanding customer service.
          </p>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Our Mission</span>
            <h2 className="text-4xl font-black text-white mt-2 mb-6">
              Plumbing Done Right, Every Time
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                At PlumbPro, our mission is simple: deliver exceptional plumbing services with integrity,
                expertise, and a smile. We believe every customer deserves reliable, honest service at a
                fair price.
              </p>
              <p>
                From a dripping tap to a complete bathroom renovation, we treat every job with the same
                level of care and professionalism. Our fully licensed and insured team uses the latest
                tools and techniques to ensure long-lasting results.
              </p>
              <p>
                We're proud to be a family-run business built on word-of-mouth and repeat customers — a
                testament to the quality of our work and our commitment to your satisfaction.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              {['Licensed & Insured', 'Family Owned', '5-Star Rated', '24/7 Available'].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium px-4 py-2 rounded-full"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-white/10 rounded-3xl p-10 text-center">
              <div className="text-8xl mb-4">🔧</div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { v: '15+', l: 'Years' }, { v: '2.4K+', l: 'Customers' },
                  { v: '5⭐', l: 'Rating' }, { v: '24/7', l: 'Support' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-800/60 rounded-xl p-4">
                    <div className="text-2xl font-black text-white">{v}</div>
                    <div className="text-slate-400 text-sm">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-16 bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">History</span>
            <h2 className="text-4xl font-black text-white mt-2">Our Journey</h2>
          </div>
          <div className="space-y-6">
            {timeline.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-cyan-400 font-black">{year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mt-1" />
                  {i < timeline.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-cyan-400/50 to-transparent mt-1 flex-1 min-h-8" />}
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-slate-300 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">The People</span>
          <h2 className="text-4xl font-black text-white mt-2">Meet Our Team</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Experienced, licensed, and passionate about delivering the best plumbing service in the industry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map(({ name, role, emoji, exp }) => (
            <div
              key={name}
              className="bg-slate-800/40 border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-6xl mb-4">{emoji}</div>
              <h3 className="text-white font-bold text-lg">{name}</h3>
              <p className="text-cyan-400 text-sm mt-1">{role}</p>
              <p className="text-slate-500 text-xs mt-2">{exp} experience</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-slate-400 mb-8">Get in touch today for a free quote on any plumbing job.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
