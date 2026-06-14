import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Cloud } from 'lucide-react';

interface LoadingScreenProps {
  isLoaded: boolean;
}

export function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && screenRef.current) {
      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.5,
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
      className="fixed inset-0 bg-[#0B0E17] z-[9999] flex flex-col items-center justify-center"
    >
      <Cloud className="w-12 h-12 text-[#1A56DB] animate-pulse mb-4" />
      <span className="font-mono-terminal text-sm text-[#1A56DB] tracking-wider animate-pulse">
        Initializing Cloud...
      </span>
    </div>
  );
}
