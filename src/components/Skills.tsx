import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import type { Skill } from '../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Libraries', 'Frameworks', 'Analytics', 'Databases', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Proficiencies</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Interactive breakdown of programming languages, analytics tools, libraries, and frameworks.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Circular Progress Bars & Skill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill: Skill) => {
            // SVG Circular calculations
            const radius = 36;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (skill.level / 100) * circumference;

            return (
              <div
                key={skill.name}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col items-center text-center"
              >
                {/* Top Subtle Gradient */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* SVG Radial Circular Meter */}
                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                    {/* Background Track */}
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      className="stroke-slate-800"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    {/* Animated Progress Track */}
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      className="stroke-cyan-400 transition-all duration-1000 ease-out"
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  {/* Percentage label in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-white">
                      {skill.level}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                      Mastery
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700/60 mb-3">
                  {skill.category}
                </span>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
