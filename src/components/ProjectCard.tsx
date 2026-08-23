import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import type { ProjectDetail } from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: ProjectDetail;
  index: number;
  onOpenModal: (project: ProjectDetail) => void;
}

export function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
        delay: (index % 2) * 0.15,
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="opacity-0 group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B0F1D]/90 border border-slate-800 hover:border-cyan-500/50 p-6 shadow-xl hover:shadow-[0_0_40px_rgba(0,242,254,0.15)] flex flex-col justify-between transition-all duration-300"
    >
      {/* Glow Sheen Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Project Thumbnail Frame */}
        <div className="relative overflow-hidden rounded-xl mb-5 aspect-[16/10] bg-slate-950 border border-slate-800/80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1D] via-transparent to-transparent opacity-80" />

          {/* Category / Badge Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono-terminal text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{project.badge}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono-terminal text-[11px] text-cyan-300/90 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="font-mono-terminal text-[11px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-2 text-xs font-mono-terminal font-semibold text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3.5 py-2 rounded-xl transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Deep Dive</span>
        </button>

        <div className="flex items-center gap-2">
          {project.link && project.link.includes('github.com') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {(project.demoUrl || (project.link && !project.link.includes('github.com'))) && (
            <a
              href={project.demoUrl || project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Web Application"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono-terminal text-xs font-semibold shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
