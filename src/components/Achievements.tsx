import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Trophy, FolderCheck, BarChart3, Code2, Binary, Sparkles } from 'lucide-react';

export const Achievements: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    FolderCheck,
    BarChart3,
    Code2,
    Binary,
    Sparkles
  };

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Impact Metrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-2">
            Quantifiable metrics highlighting hands-on project delivery and analytical capabilities.
          </p>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = iconMap[ach.icon] || Trophy;

            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center justify-between group"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                  <span className="text-gradient-cyan">{ach.value}</span>
                  <span className="text-cyan-400">{ach.suffix}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 mb-2">
                  {ach.label}
                </h4>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
