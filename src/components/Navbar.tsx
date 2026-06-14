import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'cloud-journey', 'about', 'skills', 'education', 'contact'];
      const scrollY = window.scrollY + 200;

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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <a
          href="#"
          className="font-mono-terminal text-sm text-white tracking-[0.1em] hover:text-[#64FFDA] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          MVENG.JC
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`font-mono-terminal text-sm transition-colors relative ${
                activeSection === link.href.slice(1)
                  ? 'text-[#64FFDA]'
                  : 'text-[#B8C0D4] hover:text-[#64FFDA]'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#64FFDA]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
