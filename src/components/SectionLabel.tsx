interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)] mb-4 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span className="font-mono-terminal text-xs font-semibold tracking-[0.15em] uppercase text-cyan-300">
        {text}
      </span>
    </div>
  );
}
