import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Cloud, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoaded: boolean;
}

export function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingPhrases = [
    'Connecting to AWS Cloud Matrix...',
    'Initializing Multi-Tier VPC & IAM Stack...',
    'Mounting 3D Particle Constellation...',
    'Loading Oracle APEX & System Stacks...',
    'Systems Operational.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
    }, 350);

    return () => clearInterval(interval);
  }, [loadingPhrases.length]);

  useEffect(() => {
    if (isLoaded && screenRef.current) {
      gsap.to(screenRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          if (screenRef.current) {
            screenRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [isLoaded]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 bg-[#080B14] z-[9999] flex flex-col items-center justify-center p-4 selection:bg-none"
    >
      {/* Ambient Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative flex flex-col items-center text-center z-10 space-y-6">
        {/* Animated Cyber Core Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-0.5 animate-pulse shadow-[0_0_50px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Cloud className="w-10 h-10 text-cyan-400 animate-bounce" />
            </div>
          </div>
          <div className="absolute inset-0 -m-3 border border-cyan-500/20 rounded-3xl animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Name / Brand */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
            Mveng Mballa Julien Cedric
          </h2>
          <span className="font-mono-terminal text-xs text-cyan-400 uppercase tracking-[0.18em] block mt-1">
            AWS Solutions Architect Portfolio
          </span>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-64 space-y-2">
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 animate-pulse w-full" />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-mono-terminal text-slate-400">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="truncate">{loadingPhrases[loadingTextIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
