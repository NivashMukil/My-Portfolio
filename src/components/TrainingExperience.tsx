import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Zap, Code2, Target } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/portfolioData';

const TYPE_CONFIG = {
  education: { color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', glow: 'rgba(56,189,248,0.6)', icon: <GraduationCap className="w-4 h-4" /> },
  training: { color: 'text-indigo-400', bg: 'bg-indigo-500/15', border: 'border-indigo-500/30', glow: 'rgba(99,102,241,0.6)', icon: <Zap className="w-4 h-4" /> },
  project: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', glow: 'rgba(52,211,153,0.6)', icon: <Code2 className="w-4 h-4" /> },
  goal: { color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.6)', icon: <Target className="w-4 h-4" /> },
};

export const TrainingExperience = () => {
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
    <section id="experience" ref={sectionRef} className="py-28 relative z-10">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/5 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            My Journey
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Education & <span className="text-gradient-purple">Experience</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
            A chronological path of academic growth, professional training and real-world project development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central glowing laser line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(56,189,248,0.8), rgba(168,85,247,0.8), rgba(56,189,248,0.4))',
              boxShadow: '0 0 12px rgba(56,189,248,0.5)',
              animation: visible ? 'neonPulse 3s ease-in-out infinite' : 'none',
            }} />

          <div className="space-y-12">
            {TIMELINE_ITEMS.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type];
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  style={{ animation: visible ? `${isLeft ? 'slideInLeft' : 'slideInRight'} 0.7s ${i * 0.15}s ease-out both` : 'none' }}
                >
                  {/* Card */}
                  <div className={`w-[45%] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div
                      className="glass-card rounded-2xl p-5 border hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
                      style={{
                        borderColor: 'rgba(56,189,248,0.12)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* Glow on hover */}
                      <div className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} />

                      <div className={`relative ${!isLeft ? 'text-left' : 'text-right'}`}>
                        {/* Year badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl ${cfg.bg} border ${cfg.border} text-[11px] font-bold mb-3 ${cfg.color}`}>
                          {item.year}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                        <p className={`text-xs mb-3 ${cfg.color}`}>{item.institution}</p>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.description}</p>

                        {/* Skills */}
                        {item.skills && (
                          <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                            {item.skills.map(s => (
                              <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/60">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-xl ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center ${cfg.color}`}
                      style={{
                        boxShadow: `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}50`,
                        animation: visible ? 'neonPulse 3s ease-in-out infinite' : 'none',
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      {cfg.icon}
                    </div>
                    {/* Ripple rings */}
                    <div className="absolute inset-0 rounded-xl border opacity-30"
                      style={{ borderColor: cfg.glow, animation: 'ripple 2s ease-out infinite', animationDelay: `${i * 0.3}s` }} />
                  </div>

                  {/* Spacer */}
                  <div className="w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile timeline (stacked) */}
      <style>{`
        @media (max-width: 640px) {
          #experience .relative.flex.items-center {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          #experience .relative.flex.items-center > div:first-child,
          #experience .relative.flex.items-center > div:last-child {
            width: 100% !important;
            padding-left: 3rem !important;
            padding-right: 0 !important;
            text-align: left !important;
          }
          #experience .absolute.left-1\\/2.-translate-x-1\\/2.z-10 {
            position: absolute;
            left: 0 !important;
            transform: translateX(0) !important;
            top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};
