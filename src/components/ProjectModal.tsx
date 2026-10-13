import { useEffect } from 'react';
import { X, ExternalLink, ChevronRight, Code2, Target, BookOpen, Zap, Star, GitFork, Calendar } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';
import { formatUpdatedDate } from '../services/githubService';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, { accent: string; glow: string; border: string; bg: string }> = {
  'Data Analytics': { accent: '#38BDF8', glow: 'rgba(56,189,248,0.2)', border: 'border-cyan-500/25', bg: 'bg-cyan-500/8' },
  'Power BI': { accent: '#FBBF24', glow: 'rgba(251,191,36,0.2)', border: 'border-yellow-500/25', bg: 'bg-yellow-500/8' },
  'Python Full Stack': { accent: '#818CF8', glow: 'rgba(129,140,248,0.2)', border: 'border-indigo-500/25', bg: 'bg-indigo-500/8' },
};

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project || !isOpen) return null;

  const cfg = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['Data Analytics'];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.25s ease-out both' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative glass-card-strong rounded-3xl border max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        style={{
          borderColor: cfg.accent + '33',
          boxShadow: `0 30px 100px rgba(0,0,0,0.8), 0 0 60px ${cfg.glow}`,
          animation: 'slideInUp 0.35s ease-out both',
        }}
      >
        {/* Header image */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900" />
          {/* Top bar overlay */}
          <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between">
            <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl glass-card border ${cfg.border} ${cfg.bg}`}
              style={{ color: cfg.accent }}>
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 glass-card border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500/40 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Title overlay */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-4">
            <h2 className="text-2xl font-black text-white mb-1">{project.title}</h2>
            <p className="text-sm text-slate-400">{project.subtitle}</p>
            {project.updatedAt && (
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatUpdatedDate(project.updatedAt)}
                </span>
                {project.stars !== undefined && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400/20" />
                    {project.stars} stars
                  </span>
                )}
                {project.forks !== undefined && (
                  <span className="flex items-center gap-1 text-cyan-300">
                    <GitFork className="w-3.5 h-3.5" />
                    {project.forks} forks
                  </span>
                )}
              </div>
            )}
          </div>
          {/* Glow edge */}
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${cfg.glow}, transparent)` }} />
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Technologies */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" style={{ color: cfg.accent }} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(t => (
                <span key={t} className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${cfg.bg} border ${cfg.border}`}
                  style={{ color: cfg.accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <div key={i} className={`flex items-start gap-2 p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: cfg.accent }} />
                  <span className="text-xs text-slate-300 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives & Learnings side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                Objectives
              </h4>
              <div className="space-y-2">
                {project.objectives.map((o, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">▸</span>
                    {o}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                Key Learnings
              </h4>
              <div className="space-y-2">
                {project.learnings.map((l, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code snippet */}
          {project.codeSnippet && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5" style={{ color: cfg.accent }} />
                {project.codeSnippet.title}
              </h4>
              <div className="code-block p-4 rounded-xl overflow-x-auto">
                <pre className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono-code">
                  {project.codeSnippet.code}
                </pre>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((h, i) => (
              <span key={i} className="text-[11px] font-medium px-3 py-1.5 rounded-full glass-card border border-slate-700 text-slate-300">
                ✦ {h}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 flex items-center gap-3 border-t border-slate-800/60 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 flex-1 justify-center"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-1 justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          <button
            onClick={onClose}
            className="btn-ghost p-2.5 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
