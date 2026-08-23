import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  Users, 
  MessageSquare, 
  Lightbulb, 
  RefreshCw, 
  Handshake, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Languages, 
  Award,
  FileDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const softSkills = [
  { icon: Users, label: 'Team Leadership & Collaboration', desc: 'Cross-functional engineering and agile teamwork' },
  { icon: MessageSquare, label: 'Technical Communication', desc: 'Clear documentation, stakeholder sync, bilingual delivery' },
  { icon: Lightbulb, label: 'Creative Architecture & Problem Solving', desc: 'Optimizing costs and system resilience with out-of-the-box thinking' },
  { icon: RefreshCw, label: 'Continuous Adaptability', desc: 'Rapid mastery of evolving cloud ecosystems and telecom standards' },
  { icon: Handshake, label: 'Client Success & Enterprise Focus', desc: 'Aligning infrastructure and applications with business ROI' },
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bentoRef.current) return;
    gsap.fromTo(
      bentoRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} id="about" className="w-full bg-[#080B14] py-24 md:py-32 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <SectionLabel text="ENGINEER PROFILE & BACKGROUND" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]">
            About Me &amp; Engineering Philosophy
          </h2>
          <p className="text-base md:text-lg text-slate-300 mt-4 leading-relaxed">
            Bridging low-level network infrastructure, enterprise Oracle applications, and modern serverless cloud architecture.
          </p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Bento Tile 1: Photo & Identity (Col Span 1 md / Col Span 1 lg) */}
          <div className="lg:col-span-1 md:col-span-1 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-800">
              <img
                src="/assets/profile-photo.png"
                alt="Mveng Mballa Julien Cedric"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1D] via-transparent to-transparent opacity-60" />
              
              {/* Location Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080B14]/90 backdrop-blur-md border border-slate-700 text-xs font-mono-terminal text-slate-300">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Yaoundé, CM &amp; Remote</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-white mb-1">
                Julien Cedric
              </h3>
              <p className="font-mono-terminal text-xs text-cyan-400 mb-4">
                AWS Solutions Architect
              </p>

              <a
                href="/assets/cv_image.png"
                download="Mveng_Mballa_CV.png"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono-terminal text-xs font-semibold border border-slate-700 transition-all"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Bento Tile 2: AWS Certified Badge Card (Col Span 2 md / Col Span 2 lg) */}
          <div className="lg:col-span-2 md:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0B0F1D]/90 to-blue-950/40 backdrop-blur-xl border border-blue-500/30 hover:border-cyan-400/50 p-7 shadow-xl hover:shadow-[0_0_40px_rgba(0,242,254,0.15)] flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 font-mono-terminal text-xs font-semibold">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>AWS CERTIFICATION</span>
                </div>
                <a
                  href="https://aws.amazon.com/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono-terminal text-cyan-300 hover:text-white transition-colors"
                >
                  <span>Verify Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                AWS Certified Solutions Architect – Associate
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Specialized in architecting secure, cost-optimized, resilient, and high-performance serverless architectures on AWS. Comprehensive mastery of multi-tier VPC topologies, IAM governance, asynchronous event processing, and disaster recovery.
              </p>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono-terminal text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Zero-Trust IAM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Multi-AZ VPCs</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Serverless CDK</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono-terminal text-slate-400">
              <span>Issued by Amazon Web Services</span>
              <span className="text-emerald-400 font-semibold">● Active Credential</span>
            </div>
          </div>

          {/* Bento Tile 3: Key Metrics & Languages (Col Span 1 md / Col Span 1 lg) */}
          <div className="lg:col-span-1 md:col-span-3 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 space-y-4">
            <div>
              <span className="font-mono-terminal text-xs text-slate-500 uppercase tracking-wider block mb-2">
                Fast Metrics
              </span>
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <span className="font-heading text-3xl font-bold text-cyan-400 block">3+</span>
                  <span className="font-mono-terminal text-xs text-slate-400">Years Experience</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <span className="font-heading text-3xl font-bold text-blue-400 block">100%</span>
                  <span className="font-mono-terminal text-xs text-slate-400">Cloud-Native Focus</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-mono-terminal text-slate-400 mb-2">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>Languages</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-terminal text-slate-300">
                <span>French: <strong className="text-white">Native / B2</strong></span>
                <span>English: <strong className="text-white">Fluent</strong></span>
              </div>
            </div>
          </div>

          {/* Bento Tile 4: Engineering Philosophy & Bio (Col Span 2 lg / Col Span 3 md) */}
          <div className="lg:col-span-2 md:col-span-3 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 p-7 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono-terminal text-xs text-cyan-400 uppercase tracking-widest block mb-3">
                Core Engineering Philosophy
              </span>
              <blockquote className="font-heading text-xl md:text-2xl font-bold text-white leading-snug mb-4">
                "Architect for resilience, automate relentlessly, and secure by design."
              </blockquote>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                My career combines telecommunications engineering fundamentals with modern cloud architectures and enterprise database systems. Whether developing real-time analytical dashboards in Oracle APEX or engineering multi-tier serverless cloud infrastructure on AWS, my focus is always on building high-reliability, maintainable systems that scale effortlessly.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-3 text-xs font-mono-terminal text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Bachelor of Engineering Sciences in Telecommunications (UPAC)</span>
            </div>
          </div>

          {/* Bento Tile 5: Strengths & Soft Skills (Col Span 2 lg / Col Span 3 md) */}
          <div className="lg:col-span-2 md:col-span-3 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 p-7 shadow-xl transition-all duration-300">
            <span className="font-mono-terminal text-xs text-cyan-400 uppercase tracking-widest block mb-4">
              Collaborative &amp; Professional Strengths
            </span>

            <div className="space-y-3">
              {softSkills.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
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
