import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { SkillCard, type SkillItem } from '@/components/SkillCard';
import { 
  Cloud, 
  Shield, 
  Database, 
  Terminal, 
  RadioTower, 
  Search,
  Server,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillsList: SkillItem[] = [
  // Cloud
  {
    title: 'AWS Serverless Architecture',
    category: 'Cloud',
    skills: 'AWS Lambda, API Gateway, Amazon DynamoDB, Amazon S3, AWS Cognito, EventBridge',
    tags: ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Cognito', 'Serverless'],
    progress: 92,
    icon: <Cloud className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: 'Infrastructure as Code (IaC)',
    category: 'Cloud',
    skills: 'AWS CDK (TypeScript / Python), AWS CloudFormation, automated stack provisioning & drift detection',
    tags: ['AWS CDK', 'CloudFormation', 'TypeScript', 'IaC', 'CI/CD'],
    progress: 88,
    icon: <Layers className="w-6 h-6 text-blue-400" />,
  },
  // Security & Networking
  {
    title: 'Cloud Security & Governance',
    category: 'Security',
    skills: 'IAM Policy Least-Privilege, AWS WAF, Amazon GuardDuty, AWS KMS Encryption, CloudTrail Auditing',
    tags: ['IAM', 'WAF', 'GuardDuty', 'KMS', 'CloudTrail', 'Zero-Trust'],
    progress: 90,
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Network Administration',
    category: 'Security',
    skills: 'Multi-AZ VPC Architecture, Subnet Masking, Route Tables, Internet & NAT Gateways, Security Groups, NACLs',
    tags: ['VPC', 'Subnets', 'NAT', 'Routing', 'DNS', 'DHCP'],
    progress: 88,
    icon: <Server className="w-6 h-6 text-purple-400" />,
  },
  // Application & DBs
  {
    title: 'Oracle APEX Enterprise Dev',
    category: 'Development',
    skills: 'Interactive User Interfaces, Dynamic Actions, Advanced Interactive Grids, Automated Reporting & Charts',
    tags: ['Oracle APEX', 'SQL', 'PL/SQL', 'BI Dashboards', 'Reports'],
    progress: 94,
    icon: <Database className="w-6 h-6 text-amber-400" />,
  },
  {
    title: 'Full-Stack Web & APIs',
    category: 'Development',
    skills: 'React, TypeScript, Tailwind CSS, RESTful API Integration, Node.js, Modern UI/UX Design',
    tags: ['React', 'TypeScript', 'Tailwind', 'REST APIs', 'Node.js'],
    progress: 85,
    icon: <Terminal className="w-6 h-6 text-cyan-300" />,
  },
  // Systems & Telecom
  {
    title: 'Linux Systems & DevOps',
    category: 'Systems',
    skills: 'Nginx Reverse Proxy, Docker Compose, Linux System Administration (Ubuntu/CentOS), Bash Scripting',
    tags: ['Linux SysAdmin', 'Nginx', 'Docker', 'Bash', 'SSL/TLS'],
    progress: 86,
    icon: <Terminal className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'GSM / LTE & Telecom Networks',
    category: 'Systems',
    skills: 'Base Station Architecture (BTS/eNodeB), Telecom Protocols, IP Packet Core, Radio Frequency & Access Modeling',
    tags: ['GSM/LTE', 'Telecom IP', 'Base Stations', 'Radio Access', 'Protocols'],
    progress: 82,
    icon: <RadioTower className="w-6 h-6 text-pink-400" />,
  },
];

const categories = ['All', 'Cloud', 'Security', 'Development', 'Systems'];

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredSkills = skillsList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="w-full bg-[#080B14] py-24 md:py-32 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-[800px] mx-auto mb-12 md:mb-16 opacity-0">
          <SectionLabel text="TECHNICAL COMPETENCIES" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]">
            Technical Skills &amp; Arsenal
          </h2>
          <p className="text-base md:text-lg text-slate-300 mt-4 leading-relaxed max-w-[660px] mx-auto">
            A comprehensive, verified toolkit spanning AWS cloud architecture, network security, Oracle APEX enterprise systems, and telecom infrastructure.
          </p>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search skills (e.g. Lambda, VPC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 text-white font-mono-terminal text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono-terminal transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono-terminal text-sm">
            No technical skills match "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.title} {...skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
