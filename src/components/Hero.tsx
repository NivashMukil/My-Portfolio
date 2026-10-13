import { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight, BarChart3, Database, Code2, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroScene } from './3d/HeroScene';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

const TITLES = [
  'Data Analyst',
  'Python Developer',
  'Power BI Developer',
  'SQL Enthusiast',
];

const STATS = [
  { val: '5+', label: 'Projects Completed', sub: 'Python, Django & EDA', icon: <Code2 className="w-4 h-4" /> },
  { val: '10+', label: 'Power BI Dashboards', sub: 'DAX, Power Query & KPIs', icon: <BarChart3 className="w-4 h-4" /> },
  { val: '3+', label: 'Core Languages', sub: 'Python, SQL & JavaScript', icon: <Cpu className="w-4 h-4" /> },
  { val: '12+', label: 'Technologies', sub: 'Pandas, Django, MySQL...', icon: <Database className="w-4 h-4" /> },
];

export const Hero = ({ onOpenResumeModal }: HeroProps) => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Typing effect
  useEffect(() => {
    const full = TITLES[titleIdx];
    const speed = deleting ? 35 : 75;
    const timer = setTimeout(() => {
      if (!deleting && typed === full) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && typed === '') {
        setDeleting(false);
        setTitleIdx(i => (i + 1) % TITLES.length);
      } else {
        setTyped(full.substring(0, deleting ? typed.length - 1 : typed.length + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typed, deleting, titleIdx]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/4 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN ─────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-start"
            style={{ animation: 'slideInLeft 0.8s ease-out both' }}>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/25 mb-8">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">
                Open to Opportunities · Immediate Joining
              </span>
            </div>

            {/* Greeting */}
            <p className="text-slate-400 font-medium text-lg mb-2">
              Hi, I'm
            </p>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.05]">
              <span className="text-white">Nivash </span>
              <span className="text-gradient-hero">Mukil</span>
            </h1>

            {/* Dynamic title */}
            <div className="h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 glow-text-cyan font-mono-code">
                {typed}
              </span>
              <span className="w-0.5 h-7 bg-cyan-400 ml-1 animate-[blink_1s_ease-in-out_infinite]" />
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
              Computer Science graduate passionate about transforming raw, complex datasets into{' '}
              <span className="text-cyan-300 font-semibold">actionable business intelligence</span>{' '}
              using{' '}
              <span className="text-indigo-400 font-semibold">Python, SQL & Power BI</span>, while building robust{' '}
              <span className="text-emerald-400 font-semibold">full-stack Django applications</span>.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={onOpenResumeModal}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              >
                <Download className="w-4 h-4" />
                Download Resume
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full border border-cyan-400/30">2 Options</span>
              </button>

              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200"
              >
                View Projects
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-ghost flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300"
              >
                Hire Me
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60 w-full">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Connect</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-cyan-500/30 hover:text-cyan-400 text-slate-400 text-sm font-medium transition-all duration-300 group"
              >
                <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-blue-500/30 hover:text-blue-400 text-slate-400 text-sm font-medium transition-all duration-300 group"
              >
                <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3D Workstation ── */}
          <div className="lg:col-span-5 h-[420px] lg:h-[480px] relative"
            style={{ animation: 'slideInRight 0.8s 0.2s ease-out both' }}>
            <HeroScene />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ animation: 'slideInUp 0.8s 0.5s ease-out both' }}>
          {STATS.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/30 hover:shadow-cyan-500/10 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-cyan-400 group-hover:scale-110 transition-transform">{s.icon}</div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gradient-cyan mb-1">{s.val}</div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-0.5">{s.label}</div>
              <div className="text-[11px] text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
      </div>
    </section>
  );
};
