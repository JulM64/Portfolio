import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { SkillCard } from '@/components/SkillCard';
import { Cloud, Network, Database, Terminal, Shield, RadioTower } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'Cloud AWS',
    skills: 'Lambda, API Gateway, DynamoDB, S3, Cognito, AWS CDK, Serverless',
    progress: 90,
    icon: <Cloud className="w-12 h-12 text-[#FF9900]" />,
  },
  {
    title: 'Network Administration',
    skills: 'VLAN, DHCP, DNS, NAT, Static & Dynamic Routing, Nginx',
    progress: 85,
    icon: <Network className="w-12 h-12 text-[#1A56DB]" />,
  },
  {
    title: 'Oracle APEX Development',
    skills: 'Dynamic UI, SQL/PL-SQL, Interactive Reporting, Dashboards, Data Visualization',
    progress: 88,
    icon: <Database className="w-12 h-12 text-[#F80000]" />,
  },
  {
    title: 'Linux & Systems',
    skills: 'Nginx Server, Docker Compose, System Administration, Shell Scripting',
    progress: 82,
    icon: <Terminal className="w-12 h-12 text-[#10B981]" />,
  },
  {
    title: 'Cloud Security',
    skills: 'VPC, IAM, WAF, GuardDuty, S3 Policies, Encryption',
    progress: 80,
    icon: <Shield className="w-12 h-12 text-[#F59E0B]" />,
  },
  {
    title: 'GSM / LTE Architecture',
    skills: 'Base Station Architecture, Telecom Protocols, IP Networks, Radio Access',
    progress: 75,
    icon: <RadioTower className="w-12 h-12 text-[#EC4899]" />,
  },
];

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section id="skills" className="w-full bg-[#0B0E17] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-[800px] mx-auto mb-16 md:mb-20 opacity-0">
          <SectionLabel text="TECHNICAL EXPERTISE" />
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight tracking-[-0.01em]">
            Skills &amp; Competencies
          </h2>
          <p className="text-lg text-[#B8C0D4] mt-4 leading-relaxed">
            A comprehensive toolkit spanning cloud architecture, network administration, and application
            development.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.title} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
