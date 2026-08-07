import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Code2, Sparkles, FileText } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenResumeModal }) => {
  const scrollProgress = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Training', href: '#training' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlight logic
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Scroll Indicator Bar */}
      <div className="w-full h-1 bg-slate-800/40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full px-4 lg:px-8 py-3.5 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-xl font-bold tracking-tight focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <span className="flex flex-col">
              <span className="text-slate-100 font-extrabold text-lg leading-tight flex items-center gap-1">
                Nivash Mukil
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </span>
              <span className="text-[11px] text-cyan-400 font-medium tracking-wide">
                Data Analyst & Python Dev
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700/50">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Actions (Theme Switcher & Contact Button) */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 hover:scale-105"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {onOpenResumeModal && (
              <button
                onClick={onOpenResumeModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-400 border border-slate-700/80 transition-all duration-200 hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </button>
            )}

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md transition-all duration-200 hover:shadow-cyan-500/25 hover:scale-105"
            >
              Hire Me
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-card border border-slate-700/60 flex flex-col gap-2 animate-in fade-in slide-in-from-top duration-200">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.href.substring(1)
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-400'
                }`}
              >
                {link.name}
              </a>
            ))}
            {onOpenResumeModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full text-center py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Download Resume (2 Options)
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
