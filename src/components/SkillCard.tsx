import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SkillItem {
  title: string;
  category: string;
  skills: string;
  tags: string[];
  progress: number;
  icon: React.ReactNode;
}

interface SkillCardProps extends SkillItem {
  index: number;
}

export function SkillCard({ title, skills, tags, progress, icon, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: (index % 3) * 0.1,
      }
    );

    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${progress}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: (index % 3) * 0.1 + 0.3,
        }
      );
    }
  }, [index, progress]);

  return (
    <div
      ref={cardRef}
      className="opacity-0 group rounded-2xl bg-[#0B0F1D]/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 p-6 transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,242,254,0.12)] hover:-translate-y-1.5 flex flex-col justify-between"
    >
      <div>
        {/* Header with Icon and Proficiency Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 group-hover:scale-105 transition-all">
            {icon}
          </div>
          <div className="flex items-center gap-1.5 font-mono-terminal text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            <span>{progress}%</span>
            <span className="text-[10px] text-slate-500">PRO</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="font-mono-terminal text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
          {skills}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono-terminal text-[10px] text-slate-300 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div>
        <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(0,242,254,0.5)]"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
