import React from 'react';
import { Award, CheckCircle, BarChart2, FileCode, Database, LineChart, Brain } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import type { Certification } from '../types';

export const Certifications: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    BarChart2,
    FileCode,
    Database,
    LineChart,
    Brain
  };

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Verified Qualifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient-gold">Certifications</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Verified credentials in Power BI, Python, SQL, Data Analysis, and Machine Learning.
          </p>
        </div>

        {/* Horizontal Sleek Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert: Certification) => {
            const IconComponent = iconMap[cert.icon] || Award;

            return (
              <div
                key={cert.id}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group text-left relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background Accent Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.badgeColor} opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-400 border border-slate-700/80">
                      {cert.date}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Skills & Topics Validated:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCovered.map(sk => (
                        <span
                          key={sk}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/70 text-slate-300 text-[11px] font-medium border border-slate-700/50 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3 text-amber-400" />
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    ✓ Verified Certificate
                  </span>
                  <span className="text-cyan-400">Credential ID: PYSP-2024</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
