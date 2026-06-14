interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="inline-block font-mono-terminal text-xs font-medium tracking-[0.15em] uppercase text-[#1A56DB] mb-4">
      {text}
    </span>
  );
}
