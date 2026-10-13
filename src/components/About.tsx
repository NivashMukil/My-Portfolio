import { useRef, useEffect, useState } from 'react';
import { GraduationCap, Zap, CheckCircle2, MapPin, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

const FOCUS_AREAS = [
  { label: 'Data Analytics & EDA', color: 'text-cyan-400', border: 'border-cyan-500/20', bg: 'bg-cyan-500/8' },
  { label: 'Business Intelligence', color: 'text-indigo-400', border: 'border-indigo-500/20', bg: 'bg-indigo-500/8' },
  { label: 'Power BI Dashboards', color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8' },
  { label: 'Python Full Stack', color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/8' },
  { label: 'SQL & Databases', color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/8' },
  { label: 'Machine Learning Basics', color: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/8' },
];

const HIGHLIGHTS = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'B.Sc Computer Science',
    sub: 'Madurai Kamaraj University College',
    desc: 'Strong foundation in Data Structures, DBMS, Software Engineering & OOP.',
    color: 'from-cyan-500/20 to-indigo-500/20',
    border: 'border-cyan-500/20',
    glow: 'rgba(56,189,248,0.15)',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'PySpiders Training',
    sub: 'Data Analysis & Python Full Stack',
    desc: 'Intensive professional program: Python, SQL, Power BI, Django, REST APIs & EDA.',
    color: 'from-indigo-500/20 to-purple-500/20',
    border: 'border-indigo-500/20',
    glow: 'rgba(99,102,241,0.15)',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: '5+ Real-World Projects',
    sub: 'End-to-End Data & Full Stack',
    desc: 'HR Attrition EDA, Power BI Dashboard, Django Food App, Titanic Analysis & more.',
    color: 'from-emerald-500/20 to-cyan-500/20',
    border: 'border-emerald-500/20',
    glow: 'rgba(52,211,153,0.15)',
  },
];

export const About = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="py-28 relative z-10">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-cyan-600/4 blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/4 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-20"
          style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Who I Am
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            About <span className="text-gradient-cyan">Nivash Mukil</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Bridging analytical data insights with modern Python full stack engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT: Main floating glass panel ── */}
          <div
            ref={panelRef}
            className="lg:col-span-5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div
              className="glass-card-strong rounded-3xl p-8 border border-cyan-500/15 relative overflow-hidden holographic"
              style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease',
                boxShadow: `0 20px 80px rgba(0,0,0,0.7), 0 0 40px ${tilt.x !== 0 ? 'rgba(56,189,248,0.1)' : 'transparent'}`,
              }}
            >
              {/* Corner glows */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl" />

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/25 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(56,189,248,0.15)' }}>
                  <GraduationCap className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    CS Graduate & Data Enthusiast
                  </h3>
                  <p className="text-sm text-cyan-400/80 mt-0.5">Python · SQL · Power BI · Django</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                I am a dedicated <span className="text-cyan-300 font-semibold">B.Sc Computer Science graduate</span> from Madurai Kamaraj University College. My passion lies at the intersection of <span className="text-indigo-300 font-semibold">data analytical storytelling</span> and software engineering.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm mb-6">
                Equipped with intensive hands-on training from <span className="text-blue-400 font-semibold">PySpiders Training Institute</span>, I possess strong practical skills in <span className="text-emerald-400 font-semibold">Python, SQL, Power BI, Pandas, and Django</span> — transforming unstructured datasets into strategic business intelligence and interactive dashboards.
              </p>

              {/* Info pills */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {PERSONAL_INFO.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {PERSONAL_INFO.email}
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3 pt-4 border-t border-slate-800/60">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
                  className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 flex-1 justify-center">
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
                  className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 flex-1 justify-center">
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Highlight cards + Focus areas ── */}
          <div className="lg:col-span-7 space-y-5">
            {/* Highlight cards */}
            {HIGHLIGHTS.map((h, i) => (
              <div key={i}
                className="glass-card rounded-2xl p-5 border hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
                style={{
                  borderColor: `var(--border-glass)`,
                  animation: visible ? `slideInRight 0.6s ${i * 0.15}s ease-out both` : 'none',
                }}>
                <div className={`absolute inset-0 bg-gradient-to-r ${h.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.color} border ${h.border} flex items-center justify-center flex-shrink-0 text-white`}
                    style={{ boxShadow: `0 0 15px ${h.glow}` }}>
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">{h.title}</h4>
                    <p className="text-xs text-slate-400 mb-1.5">{h.sub}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Focus areas grid */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800"
              style={{ animation: visible ? 'slideInUp 0.7s 0.5s ease-out both' : 'none' }}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Core Focus Areas
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FOCUS_AREAS.map((f, i) => (
                  <div key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl ${f.bg} border ${f.border} hover:scale-105 transition-transform duration-200`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${f.color.replace('text-', 'bg-')}`} />
                    <span className={`text-xs font-medium ${f.color}`}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
