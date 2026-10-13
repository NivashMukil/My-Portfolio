import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
  theme?: string;
  toggleTheme?: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar = ({ onOpenResumeModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
              <span className="text-xs font-bold text-white font-display">NM</span>
            </div>
            <span className="font-display font-bold text-sm text-white hidden sm:block group-hover:text-cyan-400 transition-colors">
              Nivash<span className="text-cyan-400">.</span>dev
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20" />
                  )}
                  <span className="relative">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Resume CTA + Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResumeModal}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hidden sm:flex"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
            <button
              className="md:hidden p-2 rounded-lg glass-card text-slate-300 hover:text-white"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-4 right-4 glass-card-strong rounded-2xl p-6 flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                className="px-4 py-3 text-slate-200 font-medium rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/20"
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onOpenResumeModal(); }}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white mt-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>
      )}

      <div className="h-[1px] w-full fixed top-[60px] z-40 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
    </>
  );
};
