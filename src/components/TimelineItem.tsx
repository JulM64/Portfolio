import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  date: string;
  title: string;
  institution: string;
  description: string;
  credentialLink?: string;
  index: number;
}

export function TimelineItem({ date, title, institution, description, credentialLink, index }: TimelineItemProps) {
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
        delay: index * 0.2,
      }
    );
  }, [index]);

  return (
    <div ref={itemRef} className="opacity-0 relative pl-16 pb-8 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-[23px] top-2 w-4 h-4 rounded-full bg-[#1A56DB] border-[3px] border-[#0F1629] z-10" />
      
      {/* Card */}
      <div className="bg-[#0B0E17] border border-[rgba(100,255,218,0.08)] rounded-lg p-6">
        <span className="font-mono-terminal text-sm text-[#64FFDA]">{date}</span>
        <h3 className="font-heading text-xl font-semibold text-white mt-2 mb-1">{title}</h3>
        <span className="text-[#1A56DB] font-medium text-sm">{institution}</span>
        <p className="text-[#8892B0] text-base mt-3 leading-relaxed">{description}</p>
        {credentialLink && (
          <a
            href={credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[#3B82F6] font-mono-terminal text-sm hover:text-[#64FFDA] transition-colors"
          >
            Verify at aws.amazon.com/verification →
          </a>
        )}
      </div>
    </div>
  );
}
