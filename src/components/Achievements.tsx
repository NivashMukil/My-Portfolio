import { useEffect, useRef, useState } from 'react';
import { Code2, BarChart3, FolderCheck, Binary, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

const ICON_MAP: Record<string, React.ReactNode> = {
  FolderCheck: <FolderCheck className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Binary: <Binary className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

const COLORS = ['#38BDF8', '#FBBF24', '#818CF8', '#34D399', '#A855F7'];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setCount(target);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
}

const AchievementCard = ({ achievement, index, visible }: { achievement: typeof ACHIEVEMENTS[0]; index: number; visible: boolean }) => {
  const count = useCountUp(achievement.value, 1600, visible);
  const color = COLORS[index % COLORS.length];

  return (
    <div
      className="glass-card rounded-2xl p-6 border border-slate-800 hover:scale-[1.03] transition-all duration-300 group text-center relative overflow-hidden"
      style={{
        animation: visible ? `slideInUp 0.6s ${index * 0.1}s ease-out both` : 'none',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ background: `radial-gradient(circle at top center, ${color}08, transparent)` }} />

      <div className="relative">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color,
            boxShadow: `0 0 20px ${color}20`,
          }}>
          {ICON_MAP[achievement.icon] || <Sparkles className="w-6 h-6" />}
        </div>

        {/* Count */}
        <div className="text-4xl sm:text-5xl font-black mb-1"
          style={{ color, textShadow: `0 0 20px ${color}50` }}>
          {count}{achievement.suffix}
        </div>

        <h3 className="font-bold text-white text-sm mb-1">{achievement.label}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{achievement.description}</p>
      </div>
    </div>
  );
};

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14" style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Impact Numbers
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            By The <span className="text-gradient-purple">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={i} achievement={a} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};
