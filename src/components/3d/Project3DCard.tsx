import { useState, useRef } from 'react';
import { ExternalLink, ChevronRight, BarChart3, Code2, Database, Star, GitFork, Calendar, Sparkles } from 'lucide-react';
import { GithubIcon } from '../Icons';
import type { Project } from '../../types';
import { formatUpdatedDate } from '../../services/githubService';

const CATEGORY_COLORS: Record<string, { badge: string; glow: string; accent: string; icon: React.ReactNode }> = {
  'Data Analytics': {
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    glow: 'rgba(56,189,248,0.25)',
    accent: '#38BDF8',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  'Power BI': {
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    glow: 'rgba(245,158,11,0.25)',
    accent: '#F59E0B',
    icon: <Database className="w-4 h-4" />,
  },
  'Python Full Stack': {
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
    glow: 'rgba(99,102,241,0.25)',
    accent: '#818CF8',
    icon: <Code2 className="w-4 h-4" />,
  },
};

// Mini visual visualization per project
const ProjectAnalyticsPreview = ({ project }: { project: Project }) => {
  if (project.id === 'hr-attrition-analysis') {
    return (
      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-cyan-500/20 text-[10px] font-mono space-y-1.5">
        <div className="flex items-center justify-between text-cyan-400">
          <span>EDA: OverTime vs Attrition</span>
          <span className="text-rose-400 font-bold">Risk 3.2x</span>
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 75, 90, 50, 85, 95, 60].map((h, i) => (
            <div key={i} className="flex-1 bg-slate-800 rounded-t overflow-hidden h-full relative">
              <div
                className="w-full absolute bottom-0 rounded-t"
                style={{
                  height: `${h}%`,
                  background: i % 2 === 0 ? 'linear-gradient(180deg, #38BDF8, #0284C7)' : 'linear-gradient(180deg, #F43F5E, #BE123C)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.id === 'titanic-survival-analysis') {
    return (
      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-indigo-500/20 text-[10px] font-mono space-y-1.5">
        <div className="flex items-center justify-between text-indigo-300">
          <span>Demographics: 1st Class Female</span>
          <span className="text-emerald-400 font-bold">96% Survival</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-center">
            <div className="text-slate-500 text-[9px]">Age Imputed</div>
            <div className="text-cyan-400 font-bold text-xs">By Title</div>
          </div>
          <div className="flex-1 bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-center">
            <div className="text-slate-500 text-[9px]">Dataset</div>
            <div className="text-emerald-400 font-bold text-xs">891 Passengers</div>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'sales-dashboard') {
    return (
      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/20 text-[10px] font-mono space-y-1.5">
        <div className="flex items-center justify-between text-amber-400">
          <span>Power BI DAX Metrics</span>
          <span className="text-emerald-400">+18.4% YoY</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-slate-900 p-1 rounded text-center border border-amber-500/10">
            <span className="text-slate-400 text-[8px]">Sales:</span> <span className="text-amber-300 font-bold">$1.42M</span>
          </div>
          <div className="bg-slate-900 p-1 rounded text-center border border-cyan-500/10">
            <span className="text-slate-400 text-[8px]">Profit:</span> <span className="text-cyan-300 font-bold">24.8%</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'food-web-application') {
    return (
      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-indigo-500/20 text-[10px] font-mono space-y-1">
        <div className="flex items-center justify-between text-indigo-300">
          <span>Django MVT Architecture</span>
          <span className="text-emerald-400">Auth & Cart</span>
        </div>
        <div className="bg-slate-900 p-1 rounded border border-slate-800 text-[9px] text-slate-400">
          Models: Category → FoodItem → OrderItem
        </div>
      </div>
    );
  }

  if (project.id === 'organic-grocery-website') {
    return (
      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20 text-[10px] font-mono space-y-1">
        <div className="flex items-center justify-between text-emerald-400">
          <span>Responsive Eco E-Commerce</span>
          <span className="text-cyan-300">Live Timer</span>
        </div>
        <div className="bg-slate-900 p-1 rounded border border-slate-800 text-[9px] text-slate-400 text-center">
          HTML5 + CSS3 + Vanilla JavaScript Countdown
        </div>
      </div>
    );
  }

  // Dynamic GitHub Repository visual preview
  return (
    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[10px] font-mono space-y-1.5">
      <div className="flex items-center justify-between text-slate-300">
        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold truncate max-w-[170px]">
          <GithubIcon className="w-3 h-3 flex-shrink-0" />
          {project.repoName || project.title}
        </span>
        <span className="text-slate-400 text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
          {project.language || project.technologies[0] || 'Code'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
        <div className="bg-slate-900/90 border border-slate-800 p-1 rounded flex items-center justify-center gap-1.5 text-amber-300">
          <Star className="w-3 h-3 fill-amber-400/20" />
          <span className="font-bold text-xs">{project.stars ?? 0}</span>
          <span className="text-[8px] text-slate-500 uppercase">stars</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-1 rounded flex items-center justify-center gap-1.5 text-cyan-300">
          <GitFork className="w-3 h-3" />
          <span className="font-bold text-xs">{project.forks ?? 0}</span>
          <span className="text-[8px] text-slate-500 uppercase">forks</span>
        </div>
      </div>
    </div>
  );
};

interface Project3DCardProps {
  project: Project;
  index: number;
  visible: boolean;
  onOpen: (p: Project) => void;
}

export const Project3DCard = ({ project, index, visible, onOpen }: Project3DCardProps) => {
  const cfg = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['Data Analytics'];
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="group"
      style={{
        perspective: '1200px',
        animation: visible ? `slideInUp 0.6s ${index * 0.1}s ease-out both` : 'none',
      }}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      <div
        className="glass-card rounded-3xl overflow-hidden border border-slate-800 relative flex flex-col h-full"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? '12px' : '0'})`,
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${cfg.glow}`
            : '0 4px 24px rgba(0,0,0,0.5)',
        }}
      >
        {/* Image / Visual area */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/95" />

          {/* Holographic scan line */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-8 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
              style={{ animation: hovered ? 'scanLine 2s linear infinite' : 'none' }} />
          </div>

          {/* Category badge */}
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card border ${cfg.badge} text-[11px] font-semibold backdrop-blur-md`}>
            {cfg.icon}
            {project.category}
          </div>

          {/* Top right status badge */}
          {project.isFeatured ? (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl glass-card border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Featured
            </div>
          ) : (
            <div className="absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-xl glass-card border border-slate-700/60 bg-slate-900/70 text-slate-300 text-[10px] font-semibold backdrop-blur-md">
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="w-3 h-3 fill-amber-400/20" />
                {project.stars ?? 0}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-cyan-300">
                <GitFork className="w-3 h-3" />
                {project.forks ?? 0}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-300 transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 mb-2">{project.subtitle}</p>

          {/* Last updated & GitHub stats row */}
          {project.updatedAt && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>Updated {formatUpdatedDate(project.updatedAt)}</span>
              {project.stars !== undefined && project.isFeatured && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400/20" /> {project.stars}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400 flex items-center gap-0.5">
                    <GitFork className="w-2.5 h-2.5" /> {project.forks}
                  </span>
                </>
              )}
            </div>
          )}

          <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Mini Visual Preview */}
          <div className="mb-4">
            <ProjectAnalyticsPreview project={project} />
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map(tech => (
              <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-600">
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights reveal */}
          <div className={`overflow-hidden transition-all duration-300 ${hovered ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
            <div className="space-y-1">
              {project.highlights.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                  <ChevronRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-800/60">
            <button
              onClick={() => onOpen(project)}
              className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white flex-1 justify-center"
              style={{ background: `linear-gradient(135deg, ${cfg.accent}33, ${cfg.accent}66)`, border: `1px solid ${cfg.accent}44` }}
            >
              {project.isFeatured ? 'Explore Showcase' : 'View Details'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost p-2 rounded-xl text-slate-400 hover:text-white"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost p-2 rounded-xl text-slate-400 hover:text-white"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
