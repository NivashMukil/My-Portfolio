import { useState, useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import type { Skill } from '../types';

const CATEGORY_CONFIG: Record<string, { label: string; color: string; glow: string; border: string; bg: string; accent: string }> = {
  Programming: {
    label: 'Programming',
    color: 'text-cyan-400',
    glow: 'rgba(56,189,248,0.3)',
    border: 'border-cyan-500/25',
    bg: 'bg-cyan-500/8',
    accent: '#38BDF8',
  },
  'Data Analytics': {
    label: 'Data Analytics',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.3)',
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/8',
    accent: '#F59E0B',
  },
  Database: {
    label: 'Database',
    color: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.3)',
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-500/8',
    accent: '#34D399',
  },
  'Web Development': {
    label: 'Web Development',
    color: 'text-indigo-400',
    glow: 'rgba(99,102,241,0.3)',
    border: 'border-indigo-500/25',
    bg: 'bg-indigo-500/8',
    accent: '#818CF8',
  },
  Tools: {
    label: 'Tools',
    color: 'text-purple-400',
    glow: 'rgba(168,85,247,0.3)',
    border: 'border-purple-500/25',
    bg: 'bg-purple-500/8',
    accent: '#A855F7',
  },
};

const CATEGORIES = ['All', 'Programming', 'Data Analytics', 'Database', 'Web Development', 'Tools'];

interface SkillCardProps {
  skill: Skill;
  index: number;
  visible: boolean;
}

const SkillCard = ({ skill, index, visible }: SkillCardProps) => {
  const cfg = CATEGORY_CONFIG[skill.category] || CATEGORY_CONFIG.Tools;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{
        perspective: '800px',
        animation: visible ? `slideInUp 0.5s ${index * 0.05}s ease-out both` : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      <div
        className={`glass-card rounded-2xl p-5 border ${cfg.border} relative overflow-hidden cursor-default transition-all duration-300`}
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? '8px' : '0'})`,
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${cfg.glow}`
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center`}
            style={{ boxShadow: hovered ? `0 0 16px ${cfg.glow}` : 'none', transition: 'box-shadow 0.3s' }}>
            <Cpu className={`w-5 h-5 ${cfg.color}`} />
          </div>
          <span className={`text-xs font-bold ${cfg.color} font-mono-code`}>{skill.level}%</span>
        </div>

        {/* Skill name */}
        <h3 className="relative font-bold text-white text-sm mb-1 group-hover:text-white transition-colors">
          {skill.name}
        </h3>

        {/* Category badge */}
        <span className={`relative text-[10px] font-semibold ${cfg.color} uppercase tracking-wider`}>
          {skill.category}
        </span>

        {/* Description on hover */}
        <div className={`relative mt-3 overflow-hidden transition-all duration-300 ${hovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-[11px] text-slate-400 leading-relaxed">{skill.description}</p>
        </div>

        {/* Progress bar */}
        <div className="relative mt-3 skill-progress">
          <div
            className="skill-progress-fill"
            style={{
              width: visible ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${cfg.accent}, ${cfg.accent}88)`,
              boxShadow: `0 0 8px ${cfg.glow}`,
              transition: `width 1.5s ${index * 0.05}s ease`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="py-28 relative z-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-[500px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute right-1/4 bottom-1/3 w-[400px] h-[300px] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14" style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            My <span className="text-gradient-cyan">Skills</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
            A comprehensive toolkit built through intensive training and real-world project experience.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12"
          style={{ animation: visible ? 'slideInUp 0.7s 0.1s ease-out both' : 'none' }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const cfg = cat !== 'All' ? CATEGORY_CONFIG[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? `glass-card border ${cfg?.border || 'border-cyan-500/30'} ${cfg?.color || 'text-cyan-400'} shadow-lg`
                    : 'text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700'
                }`}
                style={isActive && cfg ? { boxShadow: `0 0 20px ${cfg.glow}` } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} visible={visible} />
          ))}
        </div>

        {/* Summary row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          style={{ animation: visible ? 'slideInUp 0.7s 0.4s ease-out both' : 'none' }}>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const count = SKILLS.filter(s => s.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`glass-card rounded-xl p-4 border ${cfg.border} text-center hover:scale-105 transition-all duration-300 group`}
                style={{ boxShadow: 'none' }}
              >
                <div className={`text-2xl font-black ${cfg.color} mb-1`}>{count}</div>
                <div className="text-[11px] text-slate-400 font-medium">{cfg.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
