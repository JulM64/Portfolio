import { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, ShieldCheck, CheckCircle2, Cpu } from 'lucide-react';

export interface ProjectDetail {
  title: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  architecturePoints: string[];
  keyHighlights: string[];
  tags: string[];
  image: string;
  link?: string;
  demoUrl?: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[800px] my-auto bg-[#0B0F1D] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,242,254,0.18)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image / Banner */}
        <div className="relative h-60 md:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1D] via-[#0B0F1D]/40 to-transparent" />
          
          {/* Badge & Category */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono-terminal text-xs uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                {project.badge}
              </span>
              <span className="font-mono-terminal text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-cyan-400 font-medium text-base mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-slate-300 leading-relaxed text-base">
            {project.description}
          </p>

          {/* Architecture Highlights */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold font-heading text-base">
              <Layers className="w-5 h-5" />
              <span>Architectural Implementation</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {project.architecturePoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold font-heading text-base">
              <ShieldCheck className="w-5 h-5" />
              <span>Key Outcomes & Impact</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <span className="font-mono-terminal text-xs text-slate-400 block mb-2 uppercase tracking-wider">
              Technologies &amp; Services
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-terminal text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.link && project.link.includes('github.com') && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all border border-slate-700 hover:border-slate-500"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {(project.demoUrl || (project.link && !project.link.includes('github.com'))) && (
              <a
                href={project.demoUrl || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Web Application</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
