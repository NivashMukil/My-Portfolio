import { GraduationCap, School, Calendar, MapPin } from 'lucide-react';

export const Education = () => {
  const educationList = [
    {
      degree: 'Bachelor of Computer Science (B.Sc CS)',
      institution: 'Madurai Kamaraj University College',
      location: 'Madurai, Tamil Nadu',
      period: '2021 - 2024',
      description: 'Graduated with strong academic performance in Computer Science, covering Data Structures, Relational Database Management Systems (RDBMS), Operating Systems, Software Engineering, and C/C++ Programming.',
      highlights: ['Data Structures & Algorithms', 'Database Management (SQL)', 'Object Oriented Programming', 'Web Technologies'],
      color: '#38BDF8',
      glow: 'rgba(56,189,248,0.2)',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Computer Science Stream',
      location: 'Tamil Nadu, India',
      period: '2020 - 2021',
      description: 'Completed higher secondary schooling with core concentration in Mathematics, Computer Science, Physics, and Chemistry.',
      highlights: ['Computer Science Fundamentals', 'C++ Programming Basics', 'Higher Mathematics'],
      color: '#818CF8',
      glow: 'rgba(129,140,248,0.2)',
    },
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Foundation
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Education <span className="text-gradient-cyan">Background</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((edu, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 border hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              style={{ borderColor: `${edu.color}22` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: edu.glow }} />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)` }} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30`, boxShadow: `0 0 20px ${edu.glow}` }}>
                {i === 0 ? <GraduationCap className="w-6 h-6" style={{ color: edu.color }} /> : <School className="w-6 h-6" style={{ color: edu.color }} />}
              </div>

              <h3 className="font-bold text-white text-base mb-1">{edu.degree}</h3>
              <p className="text-sm mb-3" style={{ color: edu.color }}>{edu.institution}</p>

              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {edu.period}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {edu.location}</span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">{edu.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {edu.highlights.map(h => (
                  <span key={h} className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/60">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
