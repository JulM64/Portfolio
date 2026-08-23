import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  MessageCircle,
  FileDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const mailto = `mailto:julienmveng6@gmail.com?subject=${encodeURIComponent(
      formState.subject || 'Portfolio Inquiry from ' + formState.name
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailto;
    setFormStatus('sent');
  };

  return (
    <section ref={containerRef} id="contact" className="w-full bg-[#080B14] pt-24 md:pt-32 pb-16 relative">
      {/* Background ambient glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <SectionLabel text="GET IN TOUCH &amp; CONNECT" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]">
            Let's Architect Together
          </h2>
          <p className="text-base md:text-lg text-slate-300 mt-4 leading-relaxed max-w-[640px] mx-auto">
            Whether you need AWS cloud architecture, Oracle APEX dynamic applications, or network infrastructure automation — I'm ready to collaborate.
          </p>
        </div>

        {/* Two Column Layout: Interactive Terminal + Glass Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Interactive Terminal CLI (Col Span 6 lg) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="font-mono-terminal text-xs uppercase text-cyan-400 font-semibold tracking-wider">
                Live Interactive CLI
              </span>
              <span className="text-[11px] font-mono-terminal text-slate-500">
                Type commands or click quick buttons
              </span>
            </div>

            <InteractiveTerminal />

            {/* Direct Connect Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#0B0F1D]/80 border border-slate-800 flex items-center justify-between gap-2 group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono-terminal text-[11px] text-slate-500 block">Direct Email</span>
                    <span className="font-mono-terminal text-xs text-white truncate block">julienmveng6@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('julienmveng6@gmail.com', 'email')}
                  title="Copy Email"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors shrink-0"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-[#0B0F1D]/80 border border-slate-800 flex items-center justify-between gap-2 group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono-terminal text-[11px] text-slate-500 block">Phone &amp; WhatsApp</span>
                    <span className="font-mono-terminal text-xs text-white truncate block">+237 6 96 31 12 80</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+237696311280', 'phone')}
                  title="Copy Phone"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors shrink-0"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (Col Span 6 lg) */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0B0F1D]/85 backdrop-blur-2xl border border-slate-800 p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-mono-terminal text-slate-400 mt-0.5">
                  Direct transmission to Julien Cedric
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono-terminal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>&lt;24h Response</span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-terminal text-xs text-slate-400 mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 text-white font-sans text-sm placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono-terminal text-xs text-slate-400 mb-1.5 uppercase">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 text-white font-sans text-sm placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-terminal text-xs text-slate-400 mb-1.5 uppercase">
                  Subject / Project Type
                </label>
                <input
                  type="text"
                  placeholder="AWS Architecture / Oracle APEX / Consulting..."
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 text-white font-sans text-sm placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono-terminal text-xs text-slate-400 mb-1.5 uppercase">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project scope, infrastructure requirements, or opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 text-white font-sans text-sm placeholder:text-slate-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-heading font-semibold text-sm shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <a
                  href="/assets/cv_image.png"
                  download="Mveng_Mballa_CV.png"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-mono-terminal text-xs font-semibold border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
              </div>

              {formStatus === 'sent' && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono-terminal flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Opening default email client... Thank you!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-heading font-bold text-white text-base">
              Mveng Mballa Julien Cedric
            </p>
            <p className="font-mono-terminal text-xs text-slate-500 mt-1">
              AWS Certified Solutions Architect • Network Administrator • Application Developer
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/julien-mveng-962a8135b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/JulM64"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:julienmveng6@gmail.com"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/237696311280"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <p className="font-mono-terminal text-[11px] text-slate-600">
            © {new Date().getFullYear()} Julien Cedric. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
