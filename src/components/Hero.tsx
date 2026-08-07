import React, { useState, useEffect } from 'react';
import { Download, FolderGit2, Briefcase, Mail, BarChart3, Database, Code } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ResumeModal } from './ResumeModal';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotating typing effect logic
  useEffect(() => {
    const fullText = PERSONAL_INFO.titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTitleIndex(prev => (prev + 1) % PERSONAL_INFO.titles.length);
      } else {
        setCurrentText(
          fullText.substring(0, isDeleting ? currentText.length - 1 : currentText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenResume = () => {
    if (onOpenResumeModal) {
      onOpenResumeModal();
    } else {
      setIsResumeModalOpen(true);
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Radial Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span className="text-xs font-semibold text-slate-300">
                Open to Opportunities & Immediate Hiring
              </span>
            </div>

            <p className="text-slate-400 font-medium text-lg mb-1 flex items-center gap-2">
              Hi, I'm
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
              <span className="text-white">Nivash </span>
              <span className="text-gradient">Mukil</span>
            </h1>

            {/* Dynamic Typing Title */}
            <div className="h-12 sm:h-14 flex items-center mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-cyan-400">
                {currentText}
              </span>
              <span className="w-1 h-8 bg-cyan-400 ml-1 animate-pulse" />
            </div>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
              Computer Science graduate specializing in <strong className="text-cyan-300">Data Analytics</strong> and <strong className="text-blue-400">Python Full Stack Development</strong>. Passionate about transforming raw complex datasets into actionable business intelligence using <strong className="text-emerald-400">Python, SQL & Power BI</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              
              {/* Dual Resume Download Button */}
              <button
                onClick={handleOpenResume}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
                <span className="text-[10px] bg-slate-900/60 px-2 py-0.5 rounded-full font-bold text-cyan-300 border border-cyan-400/40 ml-1">
                  2 Options
                </span>
              </button>

              <a
                href="#projects"
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                View Projects
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Hire Me
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-sm flex items-center gap-2 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                Contact Me
              </a>
            </div>

            {/* Quick Social Links */}
            <div className="flex items-center gap-4 text-slate-400 pt-2 border-t border-slate-800/60 w-full">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Hero Graphic Illustration Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Glowing Ring Frame */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 rounded-3xl p-1 bg-gradient-to-tr from-blue-600 via-cyan-400 to-emerald-400 shadow-2xl animate-float">
              <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative p-6 flex flex-col justify-between border border-slate-800">
                {/* SVG Technical Dashboard & Code Graphic */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">nivash_portfolio.py</span>
                </div>

                {/* Simulated Code & Data Viz Artwork */}
                <div className="my-4 space-y-2.5 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Code className="w-4 h-4" />
                    <span>import pandas as pd</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Database className="w-4 h-4" />
                    <span>import powerbi_dax as dax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 my-2">
                    <div className="text-[11px] text-emerald-400 font-semibold mb-1">
                      # High Impact Business KPI
                    </div>
                    <div className="text-slate-200">
                      attrition_rate = df.groupby('Dept')['OverTime'].mean()
                    </div>
                  </div>
                  
                  {/* Simulated Sparkline / Bar visualization */}
                  <div className="pt-2 flex items-end gap-1.5 h-16 w-full justify-between px-2">
                    <div className="w-5 bg-blue-500/60 rounded-t h-8" />
                    <div className="w-5 bg-cyan-500/80 rounded-t h-12" />
                    <div className="w-5 bg-emerald-400 rounded-t h-16" />
                    <div className="w-5 bg-blue-400 rounded-t h-10" />
                    <div className="w-5 bg-cyan-400 rounded-t h-14" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <BarChart3 className="w-3.5 h-3.5" /> Data Analytics Ready
                  </span>
                  <span className="text-cyan-400">100% Verified</span>
                </div>
              </div>

              {/* Floating Badge 1: Power BI */}
              <div className="absolute -top-4 -right-4 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-100 shadow-xl border border-slate-700/80">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span>Power BI Specialist</span>
              </div>

              {/* Floating Badge 2: Python Full Stack */}
              <div className="absolute -bottom-5 -left-4 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-100 shadow-xl border border-slate-700/80">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Code className="w-4 h-4" />
                </div>
                <span>Python Full Stack</span>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Statistics Counter Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient-cyan mb-1">
              5+
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Projects Completed
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Python, Django & EDA</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
              10+
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Power BI Dashboards
            </div>
            <div className="text-[11px] text-slate-400 mt-1">DAX, Power Query & KPIs</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient-gold mb-1">
              3+
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Core Languages
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Python, SQL & JavaScript</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient-cyan mb-1">
              12+
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Technologies Learned
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Pandas, Django, MySQL...</div>
          </div>
        </div>

      </div>
      </section>

      {/* Interactive Dual Resume Modal (Fallback) */}
      {isResumeModalOpen && (
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      )}
    </>
  );
};
