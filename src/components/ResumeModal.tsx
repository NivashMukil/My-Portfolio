import React, { useState, useEffect } from 'react';
import { X, Download, Eye, FileText, Code2, BarChart3, CheckCircle2, ExternalLink, Sparkles, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeOption {
  id: 'fullstack' | 'dataanalyst';
  title: string;
  roleTag: string;
  badgeColor: string;
  gradientBg: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  pdfPath: string;
  filename: string;
  description: string;
  highlights: string[];
  skills: string[];
  projects: string[];
}

const RESUME_OPTIONS: ResumeOption[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Developer Resume',
    roleTag: 'Python & Full Stack Engineering',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    gradientBg: 'from-cyan-950/40 via-slate-900 to-blue-950/40',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    glowColor: 'shadow-cyan-500/10',
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    pdfPath: '/Nivash_Mukil_FullStack_Resume.pdf',
    filename: 'Nivash_Mukil_FullStack_Developer_Resume.pdf',
    description: 'Tailored for Python Full Stack, Web Application Development, Django Framework & REST API roles.',
    highlights: [
      'Food Web Application (Django & Bootstrap)',
      'Organic Grocery E-Commerce Platform (HTML5, CSS3, JS)',
      'Python REST APIs & Web Architecture'
    ],
    skills: ['Python', 'Django', 'FastAPI', 'REST API', 'JavaScript', 'HTML5/CSS3', 'SQL (MySQL/Oracle)'],
    projects: ['Food Web Application', 'Organic Grocery Website']
  },
  {
    id: 'dataanalyst',
    title: 'Data Analyst Resume',
    roleTag: 'Data Analytics & Business Intelligence',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    gradientBg: 'from-amber-950/30 via-slate-900 to-emerald-950/30',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    glowColor: 'shadow-amber-500/10',
    icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
    pdfPath: '/Nivash_Mukil_DataAnalyst_Resume.pdf',
    filename: 'Nivash_Mukil_Data_Analyst_Resume.pdf',
    description: 'Tailored for Data Analyst, Business Intelligence, Statistical EDA & Power BI Dashboard roles.',
    highlights: [
      'Titanic Survival Statistical EDA (13,000+ records)',
      'HR Attrition Analytics & Retention Model (49,000+ records)',
      'Data Analysis Expressions (DAX) & ETL Pipeline'
    ],
    skills: ['Python (Pandas, NumPy)', 'Power BI', 'SQL (MySQL, Oracle)', 'DAX', 'Seaborn & Matplotlib', 'ETL & EDA'],
    projects: ['Titanic Survival EDA', 'HR Attrition Analysis']
  }
];

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [previewPdf, setPreviewPdf] = useState<{ title: string; path: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B']
    });
  };

  const handleDownload = (option: ResumeOption) => {
    triggerConfetti();
    const link = document.createElement('a');
    link.href = option.pdfPath;
    link.download = option.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Download Resume
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Choose the domain-specific resume tailored to your recruitment requirements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {previewPdf ? (
            /* PDF Preview View */
            <div className="flex flex-col h-full min-h-[500px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 flex-wrap gap-2">
                <span className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Previewing: {previewPdf.title}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={previewPdf.path}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
                  </a>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                  >
                    Back to Resume Selection
                  </button>
                </div>
              </div>
              <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 min-h-[450px] flex flex-col">
                <object
                  data={`${previewPdf.path}#toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-full min-h-[480px] border-0 rounded-2xl"
                >
                  <iframe
                    src={`${previewPdf.path}#toolbar=0&navpanes=0`}
                    title={previewPdf.title}
                    className="w-full h-full min-h-[480px] border-0"
                  >
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-slate-300">
                      <p className="mb-4">Unable to display PDF preview directly.</p>
                      <a
                        href={previewPdf.path}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl text-xs font-semibold"
                      >
                        Open PDF in New Tab
                      </a>
                    </div>
                  </iframe>
                </object>
              </div>
            </div>
          ) : (
            /* Resume Options Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESUME_OPTIONS.map((option, index) => (
                <div
                  key={option.id}
                  className={`group relative rounded-2xl bg-gradient-to-b ${option.gradientBg} border ${option.borderColor} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${option.glowColor} flex flex-col justify-between`}
                >
                  {/* Top Header Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                          {option.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Resume {index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-white leading-tight">
                            {option.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${option.badgeColor}">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{option.roleTag}</span>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      {option.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Key Focus Highlights:
                      </span>
                      {option.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {option.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                    <button
                      onClick={() => handleDownload(option)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>

                    <button
                      onClick={() => setPreviewPdf({ title: option.title, path: option.pdfPath })}
                      className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-all hover:text-white"
                      title="Preview Resume"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Both resumes are verified & up to date (2026)</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
