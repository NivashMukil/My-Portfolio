import React from 'react';
import { ArrowUp, Mail, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative z-10 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center sm:items-start">
            <a href="#home" className="text-lg font-bold text-white flex items-center gap-1.5 mb-1">
              <span>Nivash Mukil</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </a>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Nivash Mukil. All rights reserved. Aspiring Data Analyst & Python Developer.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-400 text-slate-300 hover:text-blue-400 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back To Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-110 transition-transform ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
