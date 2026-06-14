import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  index: number;
}

export function ProjectCard({ title, description, tags, image, link, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.15,
      }
    );
  }, [index]);

  const content = (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-heading text-2xl font-semibold text-white mb-2 group-hover:text-[#64FFDA] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[#8892B0] text-base leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono-terminal text-xs text-[#64FFDA] bg-[rgba(100,255,218,0.1)] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (link) {
    return (
      <div ref={cardRef} className="opacity-0">
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="opacity-0">
      {content}
    </div>
  );
}
