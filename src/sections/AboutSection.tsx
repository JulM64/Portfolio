import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { Users, MessageCircle, Lightbulb, RefreshCw, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  { icon: Users, label: 'Teamwork' },
  { icon: MessageCircle, label: 'Communication' },
  { icon: Lightbulb, label: 'Creativity' },
  { icon: RefreshCw, label: 'Adaptability' },
  { icon: Handshake, label: 'Client Relations' },
];

export function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (statRef.current) {
      gsap.fromTo(
        statRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="w-full bg-[#0F1629] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column — Photo + Stats */}
          <div ref={photoRef} className="relative opacity-0">
            <img
              src="/assets/profile-photo.png"
              alt="Mveng Mballa Julien Cedric"
              className="w-full max-w-[400px] mx-auto lg:mx-0 rounded-xl object-cover aspect-[3/4]"
              style={{ boxShadow: '0 0 60px rgba(26,86,219,0.15)' }}
            />
            {/* Floating Stat Card */}
            <div
              ref={statRef}
              className="absolute -bottom-4 right-4 lg:right-0 bg-[#0B0E17] border border-[rgba(100,255,218,0.2)] rounded-lg px-5 py-4 opacity-0"
            >
              <span className="font-heading text-3xl font-bold text-[#64FFDA] block">3+</span>
              <span className="font-mono-terminal text-xs text-[#8892B0] uppercase tracking-wider">
                Years Experience
              </span>
            </div>
          </div>

          {/* Right Column — Text */}
          <div ref={textRef} className="opacity-0">
            <SectionLabel text="ABOUT ME" />
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight tracking-[-0.01em] mb-6">
              Bridging Code &amp; Infrastructure
            </h2>
            <div className="space-y-4 text-[#B8C0D4] leading-relaxed">
              <p>
                I'm Mveng Mballa Julien Cedric, an AWS-certified Computer Engineer with deep expertise
                in Oracle APEX application development, cloud security, and information system automation.
                I specialize in creating dynamic interfaces and automating complex systems.
              </p>
              <p>
                My journey spans from network administration (VLAN, DHCP, DNS, NAT) to full-stack cloud
                development, giving me a unique end-to-end perspective on building and securing digital
                infrastructure.
              </p>
              <p>
                I hold an AWS Solutions Architect – Associate certification and a Bachelor's degree in
                Telecommunications Engineering from UPAC Cameroon. I'm fluent in French (B2) and
                intermediate English.
              </p>
            </div>

            {/* Strengths List */}
            <div className="mt-8 space-y-0">
              {strengths.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 py-3 ${
                      i < strengths.length - 1 ? 'border-b border-[rgba(136,146,176,0.2)]' : ''
                    }`}
                  >
                    <Icon className="w-6 h-6 text-[#1A56DB] flex-shrink-0" />
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
