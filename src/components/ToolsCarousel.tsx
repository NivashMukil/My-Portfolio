import { TOOLS_CAROUSEL } from '../data/portfolioData';
import { Code2, Database, BarChart3, Table, Calculator, LineChart, PieChart, Server, Zap, Layout, Palette, GitBranch, Sheet, Grid3X3 } from 'lucide-react';
import { GithubIcon } from './Icons';

const ICON_MAP: Record<string, React.ReactNode> = {
  FileCode: <Code2 className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  BarChart: <BarChart3 className="w-5 h-5" />,
  Sheet: <Sheet className="w-5 h-5" />,
  Table: <Table className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  PieChart: <PieChart className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Grid: <Grid3X3 className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Github: <GithubIcon className="w-5 h-5" />,
};

const COLORS = [
  '#38BDF8', '#818CF8', '#A855F7', '#34D399', '#FBBF24',
  '#F472B6', '#38BDF8', '#34D399', '#818CF8', '#FBBF24',
  '#38BDF8', '#A855F7', '#34D399', '#818CF8', '#38BDF8',
];

export const ToolsCarousel = () => {
  const items = [...TOOLS_CAROUSEL, ...TOOLS_CAROUSEL]; // duplicate for infinite scroll

  return (
    <section className="py-16 relative z-10 overflow-hidden">
      <div className="absolute inset-0 border-t border-b border-slate-800/40 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#07090E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#07090E] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Technologies I Work With</p>
      </div>

      <div className="animate-marquee gap-8 items-center">
        {items.map((tool, i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <div key={i} className="flex-shrink-0 flex items-center gap-2.5 glass-card px-5 py-3 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 group mx-2"
              style={{ minWidth: 'max-content' }}>
              <div className="group-hover:scale-110 transition-transform" style={{ color }}>
                {ICON_MAP[tool.icon] || <Code2 className="w-5 h-5" />}
              </div>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
