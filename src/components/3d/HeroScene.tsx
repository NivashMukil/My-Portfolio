import { useState, useRef } from 'react';
import { BarChart3, Code2, Database } from 'lucide-react';

export const HeroScene = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'powerbi' | 'django'>('python');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-indigo-500/15 to-purple-500/15 rounded-3xl blur-3xl" />

      {/* Main 3D Monitor Card */}
      <div
        className="relative w-full max-w-md holographic transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Screen bezel */}
        <div
          className="glass-card-strong rounded-3xl border border-cyan-500/25 overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 40px rgba(56, 189, 248, 0.2)' }}
        >
          {/* Window Header / Tabs */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/90 bg-slate-950/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Interactive Workspace Tabs */}
            <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('python')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                  activeTab === 'python' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                eda_hr.py
              </button>
              <button
                onClick={() => setActiveTab('powerbi')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                  activeTab === 'powerbi' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                sales_kpi.pbix
              </button>
              <button
                onClick={() => setActiveTab('django')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                  activeTab === 'django' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                views.py
              </button>
            </div>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Screen Content Body */}
          <div className="p-5 bg-slate-950/95 font-mono text-[11px] min-h-[220px] flex flex-col justify-between">
            {activeTab === 'python' && (
              <div className="space-y-2">
                <div className="text-slate-500"># ── HR Employee Attrition Pipeline ──</div>
                <div><span className="text-purple-400">import</span> <span className="text-cyan-300">pandas</span> <span className="text-purple-400">as</span> <span className="text-cyan-300">pd</span></div>
                <div><span className="text-purple-400">import</span> <span className="text-cyan-300">seaborn</span> <span className="text-purple-400">as</span> <span className="text-cyan-300">sns</span></div>
                <div><span className="text-slate-300">df</span> = pd.<span className="text-amber-300">read_csv</span>(<span className="text-emerald-400">'hr_attrition.csv'</span>)</div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-2.5 text-[10px]">
                  <div className="text-cyan-400 font-semibold">Insight Output:</div>
                  <div className="text-slate-200">Overtime Attrition Risk = <span className="text-emerald-400 font-bold">3.2x Higher</span></div>
                  <div className="text-slate-400 text-[9px]">Records Analyzed: 1,470 | Missing values imputed</div>
                </div>
                {/* Visual Bar Chart */}
                <div className="pt-2 flex items-end gap-2 h-14">
                  {[65, 90, 45, 100, 75, 85, 60].map((val, idx) => (
                    <div key={idx} className="flex-1 rounded-t bg-slate-800 overflow-hidden relative" style={{ height: '100%' }}>
                      <div
                        className="w-full absolute bottom-0 rounded-t"
                        style={{
                          height: `${val}%`,
                          background: 'linear-gradient(180deg, #38BDF8, #6366F1)',
                          animation: `barGrow 1s ${idx * 0.1}s ease-out both`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'powerbi' && (
              <div className="space-y-2.5">
                <div className="text-amber-400 font-semibold text-xs flex items-center justify-between">
                  <span>Executive Retail Sales KPI</span>
                  <span className="text-[10px] text-slate-400">DAX Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900/90 border border-amber-500/20 p-2 rounded-xl text-center">
                    <div className="text-[9px] text-slate-400 uppercase">Total Revenue</div>
                    <div className="text-base font-bold text-amber-400">$1.42M</div>
                    <div className="text-[9px] text-emerald-400">+18.4% YoY</div>
                  </div>
                  <div className="bg-slate-900/90 border border-cyan-500/20 p-2 rounded-xl text-center">
                    <div className="text-[9px] text-slate-400 uppercase">Profit Margin</div>
                    <div className="text-base font-bold text-cyan-400">24.8%</div>
                    <div className="text-[9px] text-cyan-300">Target Achieved</div>
                  </div>
                </div>
                {/* Donut Chart representation */}
                <div className="flex items-center justify-around bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Technology: 42%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Furniture: 31%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> Office Supplies: 27%</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'django' && (
              <div className="space-y-2">
                <div className="text-indigo-400 font-semibold text-xs">Food App Django Backend</div>
                <div><span className="text-purple-400">from</span> django.db <span className="text-purple-400">import</span> models</div>
                <div><span className="text-purple-400">class</span> <span className="text-amber-300">FoodItem</span>(models.Model):</div>
                <div className="pl-4 text-slate-300">title = models.CharField(max_length=200)</div>
                <div className="pl-4 text-slate-300">price = models.DecimalField()</div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-[10px] text-emerald-300">
                  ✓ Auth Middleware & SQLite ORM Connected
                </div>
              </div>
            )}

            {/* Status Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Execution Status: 200 OK
              </span>
              <span className="text-cyan-400/80">Nivash Workstation v2.0</span>
            </div>
          </div>
        </div>

        {/* Floating Interactive 3D Badges */}
        <div
          className="absolute -top-5 -right-6 glass-card px-3.5 py-2 rounded-2xl border border-amber-500/30 shadow-xl"
          style={{ animation: 'float 5s ease-in-out infinite', transform: 'translateZ(30px)' }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <BarChart3 className="w-4 h-4" />
            <span>Power BI Specialist</span>
          </div>
        </div>

        <div
          className="absolute -bottom-6 -left-6 glass-card px-3.5 py-2 rounded-2xl border border-cyan-500/30 shadow-xl"
          style={{ animation: 'float 6s 1s ease-in-out infinite', transform: 'translateZ(35px)' }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Code2 className="w-4 h-4" />
            <span>Python & Django</span>
          </div>
        </div>

        <div
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 glass-card px-3 py-2 rounded-2xl border border-purple-500/30 shadow-xl"
          style={{ animation: 'float 7s 2s ease-in-out infinite', transform: 'translateZ(25px)' }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
            <Database className="w-4 h-4" />
            <span>SQL & Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
};
