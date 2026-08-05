import React from 'react';
import { GraduationCap, School, Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  const educationList = [
    {
      degree: 'Bachelor of Computer Science (B.Sc CS)',
      institution: 'Madurai Kamaraj University College',
      location: 'Madurai, Tamil Nadu',
      period: '2020 - 2023',
      description: 'Graduated with strong academic performance in Computer Science, covering Data Structures, Relational Database Management Systems (RDBMS), Operating Systems, Software Engineering, and C/C++ Programming.',
      highlights: ['Data Structures & Algorithms', 'Database Management (SQL)', 'Object Oriented Programming', 'Web Technologies']
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Computer Science Stream',
      location: 'Tamil Nadu, India',
      period: '2019 - 2020',
      description: 'Completed higher secondary schooling with core concentration in Mathematics, Computer Science, Physics, and Chemistry.',
      highlights: ['Computer Science Fundamentals', 'C++ Programming Basics', 'Higher Mathematics']
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Qualifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education <span className="text-gradient">Background</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Solid computer science academic foundations driving data-driven innovation.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {idx === 0 ? <GraduationCap className="w-6 h-6" /> : <School className="w-6 h-6" />}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-cyan-400 border border-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {edu.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-1">
                  <span>{edu.institution}</span>
                </p>
                <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {edu.location}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {edu.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Subjects & Focus:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {edu.highlights.map(h => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-medium border border-slate-700/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
