import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 py-10 border-t border-slate-800/60">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo & name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white font-display">NM</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Nivash Mukil</span>
              <p className="text-[11px] text-slate-500">Data Analyst · Python Developer</p>
            </div>
          </div>

          {/* Credit */}
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by Nivash · © {year}
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
              className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
              className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
