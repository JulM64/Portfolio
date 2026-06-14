import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const terminalLines = [
  { text: '$ whoami', color: '#64FFDA' },
  { text: 'mveng-mballa-julien-cedric', color: '#FFFFFF' },
  { text: '$ echo $ROLE', color: '#64FFDA' },
  { text: 'AWS Cloud Architect | Network Admin | App Developer', color: '#FFFFFF' },
  { text: '$ cat contact.txt', color: '#64FFDA' },
  { text: 'Email: julienmveng6@gmail.com', color: '#B8C0D4' },
  { text: 'Phone: +237 6 96 31 12 80', color: '#B8C0D4' },
  { text: 'Location: Yaounde, Cameroon', color: '#B8C0D4' },
  { text: 'LinkedIn: linkedin.com/in/julien-mveng-962a8135b', color: '#3B82F6', isLink: true, href: 'https://www.linkedin.com/in/julien-mveng-962a8135b/' },
  { text: 'GitHub: github.com/JulM64', color: '#3B82F6', isLink: true, href: 'https://github.com/JulM64' },
  { text: "$ echo \"Let's build something amazing together.\"", color: '#64FFDA' },
  { text: "Let's build something amazing together.", color: '#FFFFFF' },
];

export function ContactSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    gsap.fromTo(
      terminalRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: terminalRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          onEnter: () => {
            // Start typewriter effect
            let line = 0;
            const interval = setInterval(() => {
              line++;
              setVisibleLines(line);
              if (line >= terminalLines.length) {
                clearInterval(interval);
                setTypingDone(true);
              }
            }, 300);
          },
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!buttonsRef.current || !typingDone) return;
    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      }
    );
  }, [typingDone]);

  return (
    <section id="contact" className="w-full bg-[#0B0E17] pt-24 md:pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-4 md:px-10">
        {/* Terminal Window */}
        <div
          ref={terminalRef}
          className="bg-[#0F1629] border border-[rgba(100,255,218,0.15)] rounded-xl overflow-hidden mb-16 opacity-0"
        >
          {/* Terminal Header */}
          <div className="bg-[rgba(100,255,218,0.05)] px-5 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="font-mono-terminal text-sm text-[#8892B0] ml-3">contact.sh</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono-terminal text-sm leading-relaxed min-h-[320px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="mb-1">
                {line.isLink && line.href ? (
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#64FFDA] transition-colors"
                    style={{ color: line.color }}
                  >
                    {line.text}
                  </a>
                ) : (
                  <span style={{ color: line.color }}>{line.text}</span>
                )}
              </div>
            ))}
            {typingDone && (
              <span className="inline-block w-2 h-4 bg-[#64FFDA] ml-0.5 animate-blink align-middle" />
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="text-center opacity-0">
          <a
            href="mailto:julienmveng6@gmail.com"
            className="inline-block bg-gradient-to-r from-[#1A56DB] to-[#1E40AF] text-white px-8 py-3.5 rounded-lg font-heading font-semibold text-base hover:shadow-[0_0_30px_rgba(26,86,219,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Send Email
          </a>
          <a
            href="/assets/cv_image.png"
            download="Mveng_Mballa_CV.png"
            className="inline-block ml-4 bg-transparent border border-[rgba(100,255,218,0.3)] text-[#64FFDA] px-8 py-3.5 rounded-lg font-heading font-semibold text-base hover:bg-[rgba(100,255,218,0.1)] hover:border-[#64FFDA] transition-all duration-300"
          >
            Download CV
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-[rgba(100,255,218,0.1)] text-center">
          <p className="font-mono-terminal text-xs text-[#8892B0]">
            © 2025 Mveng Mballa Julien Cedric. Built with React, Three.js &amp; passion.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <a
              href="https://www.linkedin.com/in/julien-mveng-962a8135b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/JulM64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:julienmveng6@gmail.com"
              className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
