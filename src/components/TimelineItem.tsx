import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, Calendar, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  date: string;
  title: string;
  institution: string;
  description: string;
  highlights?: string[];
  credentialLink?: string;
  isVerified?: boolean;
  index: number;
}

export function TimelineItem({
  date,
  title,
  institution,
  description,
  highlights,
  credentialLink,
  isVerified,
  index,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.15,
      }
    );
  }, [index]);

  return (
    <div ref={itemRef} className="opacity-0 relative pl-10 md:pl-14 pb-10 last:pb-2 group">
      {/* Glowing Milestone Node */}
      <div className="absolute left-[13px] md:left-[17px] top-1.5 w-6 h-6 -translate-x-1/2 rounded-full bg-[#080B14] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,242,254,0.6)] group-hover:scale-125 transition-transform">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-[#0B0F1D]/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 p-6 md:p-7 shadow-xl hover:shadow-[0_0_35px_rgba(0,242,254,0.1)] transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 font-mono-terminal text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{date}</span>
          </div>

          {isVerified && (
            <div className="flex items-center gap-1 text-[11px] font-mono-terminal text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Credential</span>
            </div>
          )}
        </div>

        <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-4">
          <Building2 className="w-4 h-4 text-blue-400" />
          <span>{institution}</span>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
          {description}
        </p>

        {highlights && highlights.length > 0 && (
          <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-800/80">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-cyan-400 font-mono">▸</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {credentialLink && (
          <a
            href={credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono-terminal font-semibold text-blue-400 hover:text-cyan-300 bg-blue-950/30 hover:bg-cyan-950/40 border border-blue-500/30 hover:border-cyan-400/50 px-3.5 py-2 rounded-xl transition-all"
          >
            <span>Verify at Amazon Web Services</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
