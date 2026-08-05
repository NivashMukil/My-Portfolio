import React from 'react';
import { TOOLS_CAROUSEL } from '../data/portfolioData';
import { Terminal } from 'lucide-react';

export const ToolsCarousel: React.FC = () => {
  // Duplicate list to create seamless infinite loop effect
  const doubleTools = [...TOOLS_CAROUSEL, ...TOOLS_CAROUSEL];

  return (
    <section className="py-16 relative z-10 overflow-hidden border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Terminal className="w-3.5 h-3.5" /> Tech Ecosystem
        </div>
        <h3 className="text-xl font-bold text-white">Tools & Technologies Mastered</h3>
      </div>

      {/* Ticker marquee container */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 py-2">
          {doubleTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="glass-card px-6 py-3.5 rounded-2xl border border-slate-800 flex items-center gap-3 text-slate-200 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-all shrink-0 hover:scale-105"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
