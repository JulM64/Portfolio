import { useEffect, useState } from 'react';
import { Search, FileDown, Menu, X, Cloud, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Cloud Journey', href: '#cloud-journey' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['projects', 'cloud-journey', 'about', 'skills', 'education', 'contact'];
      const scrollY = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 px-4 md:px-8 bg-[#080B14]/80 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 px-4 md:px-10 bg-transparent'
        }`}
      >
        <div className="max-w-[1340px] mx-auto flex items-center justify-between gap-4">
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#080B14] rounded-[7px] flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-mono-terminal font-bold text-sm tracking-[0.12em] text-white group-hover:text-cyan-400 transition-colors">
                MVENG.JC
              </span>
            </a>

            {/* Live Availability Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono-terminal">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono-terminal transition-all relative ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              title="Search & Commands (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-all text-xs font-mono-terminal group"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Quick CV Download */}
            <a
              href="/assets/cv_image.png"
              download="Mveng_Mballa_CV.png"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold font-mono-terminal transition-all shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:scale-[1.02]"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-24 pb-8 px-6 bg-[#080B14]/95 backdrop-blur-2xl border-b border-slate-800 animate-in fade-in duration-200">
          <div className="space-y-3">
            <div className="px-4 py-2 mb-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono-terminal flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Opportunities</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-base font-mono-terminal text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 border border-transparent hover:border-cyan-500/30 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono-terminal text-sm"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Command Palette (⌘K)</span>
            </button>
            <a
              href="/assets/cv_image.png"
              download="Mveng_Mballa_CV.png"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono-terminal text-sm font-semibold shadow-[0_0_20px_rgba(0,242,254,0.3)]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
