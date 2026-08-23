import { useEffect, useState, useRef } from 'react';
import { 
  Search, 
  FolderGit2, 
  User, 
  Wrench, 
  GraduationCap, 
  Mail, 
  FileDown, 
  ExternalLink, 
  Copy, 
  Check, 
  Cloud,
  X
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Social';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (title: string) => void;
}

export function CommandPalette({ isOpen, onClose, onOpenProject }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-hero',
      title: 'Home / Hero Horizon',
      category: 'Navigation',
      icon: Cloud,
      action: () => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects & Work',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-journey',
      title: 'Cloud Architecture Journey',
      category: 'Navigation',
      icon: Cloud,
      action: () => scrollTo('cloud-journey'),
    },
    {
      id: 'nav-about',
      title: 'About Me & Engineering Philosophy',
      category: 'Navigation',
      icon: User,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Competencies',
      category: 'Navigation',
      icon: Wrench,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-education',
      title: 'Certifications & Education',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => scrollTo('education'),
    },
    {
      id: 'nav-contact',
      title: 'Contact & Terminal Playground',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('contact'),
    },
    // Projects
    {
      id: 'proj-cloudly',
      title: 'Project: Cloudly App (AWS Serverless Archiving)',
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        onClose();
        if (onOpenProject) onOpenProject('Cloudly App');
        else scrollTo('projects');
      },
    },
    {
      id: 'proj-secure',
      title: 'Project: Secure Cloud Deployment (VPC + WAF + GuardDuty)',
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        onClose();
        if (onOpenProject) onOpenProject('Secure Cloud Deployment');
        else scrollTo('projects');
      },
    },
    {
      id: 'proj-apex',
      title: 'Project: Oracle APEX Dashboard & CRTV System',
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        onClose();
        if (onOpenProject) onOpenProject('Oracle APEX Dashboard');
        else scrollTo('projects');
      },
    },
    {
      id: 'proj-network',
      title: 'Project: Network Infrastructure & Telecom Design',
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        onClose();
        if (onOpenProject) onOpenProject('Network Infrastructure Design');
        else scrollTo('projects');
      },
    },
    // Actions
    {
      id: 'act-cv',
      title: 'Download Curriculum Vitae (CV)',
      category: 'Actions',
      icon: FileDown,
      action: () => {
        const link = document.createElement('a');
        link.href = '/assets/cv_image.png';
        link.download = 'Mveng_Mballa_CV.png';
        link.click();
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      title: copied === 'email' ? 'Email Copied!' : 'Copy Email Address (julienmveng6@gmail.com)',
      category: 'Actions',
      icon: copied === 'email' ? Check : Copy,
      action: () => copyToClipboard('julienmveng6@gmail.com', 'email'),
    },
    {
      id: 'act-copy-phone',
      title: copied === 'phone' ? 'Phone Copied!' : 'Copy Phone Number (+237 6 96 31 12 80)',
      category: 'Actions',
      icon: copied === 'phone' ? Check : Copy,
      action: () => copyToClipboard('+237696311280', 'phone'),
    },
    // Social / External
    {
      id: 'ext-aws',
      title: 'Verify AWS Solutions Architect Credential',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        window.open('https://aws.amazon.com/verification', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-github',
      title: 'View GitHub Profile (JulM64)',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        window.open('https://github.com/JulM64', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'View LinkedIn Profile (Julien Mveng)',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        window.open('https://www.linkedin.com/in/julien-mveng-962a8135b/', '_blank');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by caller or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
        } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
          e.preventDefault();
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[620px] rounded-2xl bg-[#0B0F1D]/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-900/40">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-white font-sans text-base placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono-terminal text-sm">
              No matching commands or projects found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.1)]'
                      : 'text-slate-300 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/80 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="font-mono-terminal text-[11px] uppercase tracking-wider text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-[11px] font-mono-terminal text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Enter</kbd> Select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
