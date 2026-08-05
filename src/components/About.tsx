import React, { useState } from 'react';
import { UserCheck, GraduationCap, Award, Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/portfolioData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'training' | 'goal'>('all');

  const filteredTimeline = activeTab === 'all'
    ? TIMELINE_ITEMS
    : TIMELINE_ITEMS.filter(item => item.type === activeTab || (activeTab === 'education' && item.type === 'education'));

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            Discover My Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Nivash Mukil</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Bridging analytical data insights with modern Python full stack engineering.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Feature Card */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Computer Science Graduate & Data Enthusiast
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                I am a dedicated <strong className="text-cyan-300">B.Sc Computer Science graduate</strong> from Madurai Kamaraj University College. My passion lies at the intersection of data analytical storytelling and software engineering.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                Equipped with intensive hands-on training from <strong className="text-blue-400">PySpiders</strong>, I possess strong practical skills in <strong className="text-emerald-400">Python, SQL, Power BI, Pandas, and Django</strong>. I thrive on translating unstructured raw datasets into strategic business decisions and interactive dashboards.
              </p>
            </div>

            {/* Quick Interests Grid */}
            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Core Focus Areas:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Data Analytics</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Business Intelligence</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Power BI Dashboards</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Python Full Stack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Technical Proficiency</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Proficient in writing complex SQL relational queries, designing Star Schema data models in Power BI, and executing EDA using Pandas & Seaborn.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Data Pipelines & ETL</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Problem Solving Mindset</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Passionate about evaluating business requirements, discovering hidden revenue drivers or attrition risks, and delivering end-to-end full stack web platforms.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Value Driven Solutions</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all sm:col-span-2">
              <h4 className="text-lg font-bold text-white mb-3">Academic & Professional Foundation</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                My education at <strong className="text-white">Madurai Kamaraj University College</strong> provided deep understanding of core computer science fundamentals, object-oriented concepts, and algorithmic thinking. My specialization at <strong className="text-white">PySpiders</strong> shaped my hands-on mastery in modern Python, SQL databases, and BI dashboard engineering.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Python 3.x</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Oracle & MySQL</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Power BI DAX</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Django MVT</span>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white">Career & Education Timeline</h3>
              <p className="text-slate-400 text-xs sm:text-sm">Milestones along my journey from academic degree to professional analytics training</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(['all', 'education', 'training', 'goal'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {filteredTimeline.map(item => (
              <div key={item.id} className="relative group">
                {/* Glowing Bullet Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_#06B6D4]" />
                
                <div className="glass-card p-6 rounded-2xl border border-slate-800 group-hover:border-cyan-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.year}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {item.institution}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                      {item.skills.map(sk => (
                        <span key={sk} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-medium border border-slate-700/50">
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
