import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  title: string;
  skills: string;
  progress: number;
  icon: React.ReactNode;
  index: number;
}

export function SkillCard({ title, skills, progress, icon, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
        delay: index * 0.1,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="opacity-0 bg-[#0F1629] border border-[rgba(100,255,218,0.08)] rounded-xl p-8 transition-all duration-300 hover:border-[rgba(100,255,218,0.25)] hover:shadow-[0_0_30px_rgba(26,86,219,0.1)] hover:-translate-y-1"
    >
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="font-heading text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="font-mono-terminal text-sm text-[#8892B0] mb-5 leading-relaxed">{skills}</p>
      <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #1A56DB, #64FFDA)',
          }}
        />
      </div>
    </div>
  );
}
