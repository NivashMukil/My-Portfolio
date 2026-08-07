import React from 'react';
import { BookOpen, CheckCircle, Database, FileCode, BarChart, Server, Layers, Cpu } from 'lucide-react';

export const TrainingExperience: React.FC = () => {
  const trainingTopics = [
    { name: 'Python Programming', desc: 'OOP, Data Structures, Exception Handling, File I/O', icon: FileCode },
    { name: 'SQL Databases', desc: 'Queries, Joins, Aggregations, Schema Design, Oracle SQL', icon: Database },
    { name: 'Data Analysis', desc: 'Exploratory Data Analysis (EDA), Cleaning, Outliers handling', icon: Layers },
    { name: 'Power BI Analytics', desc: 'Power Query ETL, DAX formulas, Interactive Dashboards', icon: BarChart },
    { name: 'Machine Learning Basics', desc: 'Supervised Learning, Regression models, Model evaluations', icon: Cpu },
    { name: 'Django Framework', desc: 'MVT architecture, ORM, Admin Portal, Authentication', icon: Server },
    { name: 'Database Connectivity', desc: 'Connecting Python/Django with SQLite, MySQL & Oracle', icon: Database },
    { name: 'REST API Development', desc: 'Building & consuming RESTful APIs, JSON endpoints', icon: FileCode }
  ];

  const experiencePoints = [
    'Hands-on Python script development & modular software design',
    'Relational SQL database operations, subqueries & optimization',
    'End-to-end Power BI report creation, DAX measures & KPI setup',
    'Data Cleaning, imputation, and transformation using Pandas',
    'Data Visualization with Seaborn heatmaps, box plots & Matplotlib',
    'Full stack web application development using Django & Bootstrap',
    'Frontend responsive UI layout design using HTML5, CSS3, JS',
    'Backend API logic design & ORM database connectivity'
  ];

  return (
    <section id="training" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Specialized Training & Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            PySpiders <span className="text-gradient">Training & Experience</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Intensive hands-on immersion program in Data Analysis & Python Full Stack Development.
          </p>
        </div>

        {/* Training Hero Card */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PySpiders Training Institute
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
                Data Analysis with Python Full Stack
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Completed an exhaustive curriculum focused on practical implementation. Rigorously trained in data wrangling, corporate database operations, business intelligence modeling, and full-stack software development.
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">✓ Hands-on Coding</span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">✓ Industry Real Projects</span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">✓ BI & Analytics Focus</span>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
              <h4 className="text-sm font-bold text-white mb-3">Key Competencies Covered</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Python Core & Data Science Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>SQL Relational Database Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Power BI Dashboard & DAX Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Django Web Application Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {trainingTopics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Training Experience Highlights */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 text-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            Training Experience Accomplishments
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiencePoints.map((pt, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
