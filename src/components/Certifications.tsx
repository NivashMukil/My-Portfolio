import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

const CERT_COLORS = [
  { accent: '#FBBF24', glow: 'rgba(251,191,36,0.25)', border: 'border-yellow-500/25', bg: 'bg-yellow-500/8' },
  { accent: '#38BDF8', glow: 'rgba(56,189,248,0.25)', border: 'border-cyan-500/25', bg: 'bg-cyan-500/8' },
  { accent: '#34D399', glow: 'rgba(52,211,153,0.25)', border: 'border-emerald-500/25', bg: 'bg-emerald-500/8' },
  { accent: '#818CF8', glow: 'rgba(129,140,248,0.25)', border: 'border-indigo-500/25', bg: 'bg-indigo-500/8' },
  { accent: '#A855F7', glow: 'rgba(168,85,247,0.25)', border: 'border-purple-500/25', bg: 'bg-purple-500/8' },
];

export const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            Credentials
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Certifications & <span className="text-gradient-gold">Training</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Professional certifications earned through intensive hands-on training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, i) => {
            const cfg = CERT_COLORS[i % CERT_COLORS.length];
            return (
              <div
                key={cert.id}
                className="glass-card rounded-2xl p-6 border hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
                style={{
                  borderColor: `${cfg.accent}22`,
                  animation: visible ? `slideInUp 0.6s ${i * 0.1}s ease-out both` : 'none',
                }}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} />
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: cfg.glow }} />

                {/* Icon */}
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.accent}22, ${cfg.accent}11)`,
                    border: `1px solid ${cfg.accent}33`,
                    boxShadow: `0 0 20px ${cfg.glow}`,
                  }}>
                  <Award className="w-6 h-6" style={{ color: cfg.accent }} />
                </div>

                <div className="relative">
                  <h3 className="font-bold text-white text-sm mb-1 leading-snug">{cert.title}</h3>
                  <p className="text-xs mb-1" style={{ color: cfg.accent }}>{cert.issuer}</p>
                  <p className="text-xs text-slate-500 mb-4">{cert.date}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsCovered.map(s => (
                      <span key={s} className="text-[10px] font-medium px-2 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
