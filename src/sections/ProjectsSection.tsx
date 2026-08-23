import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ProjectCard } from '@/components/ProjectCard';
import type { ProjectDetail } from '@/components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export const projectsData: ProjectDetail[] = [
  {
    title: 'Cloudly App',
    category: 'AWS & Serverless',
    badge: 'Serverless Archiving',
    tagline: 'Intelligent Cloud Archiving & Management Platform on AWS',
    description:
      'A cloud-native intelligent document archiving platform built on AWS serverless architecture. Integrates fine-grained access control with AWS Cognito, scalable object storage with S3 lifecycle policies, serverless compute via AWS Lambda, and sub-millisecond metadata querying with Amazon DynamoDB. Entire infrastructure automated via AWS CDK.',
    architecturePoints: [
      'Authentication & Token Verification using AWS Cognito User Pools & Identity Pools',
      'Event-Driven File Processing & Thumbnail Generation powered by S3 triggers and AWS Lambda',
      'High-throughput document metadata indexing using Amazon DynamoDB with Global Secondary Indexes',
      'Infrastructure as Code (IaC) modular deployment implemented with AWS CDK (TypeScript)',
    ],
    keyHighlights: [
      '100% Serverless Zero-Server Maintenance',
      'Automated S3 Glacier Tiering Lifecycle',
      'End-to-End IAM Least-Privilege Role Isolation',
      'Ultra-low Latency Metadata Queries (<10ms)',
    ],
    tags: ['AWS Lambda', 'Amazon S3', 'DynamoDB', 'AWS Cognito', 'AWS CDK', 'React', 'TypeScript'],
    image: '/assets/cloudly-app.jpg',
    link: 'https://github.com/JulM64/cloudly-app',
  },
  {
    title: 'Secure Cloud Deployment',
    category: 'Cloud Security',
    badge: 'Zero-Trust Architecture',
    tagline: 'Multi-Tier Enterprise VPC Isolation, WAF & Threat Detection Stack',
    description:
      'Enterprise-grade security infrastructure deployment on AWS featuring multi-tier VPC network isolation with public, private, and database subnets. Includes AWS WAF rulesets for web traffic protection, Amazon GuardDuty automated anomaly detection, AWS KMS encryption keys at rest and in transit, and custom S3 bucket policies.',
    architecturePoints: [
      'Dual-AZ VPC design with NAT Gateways, Internet Gateways, and isolated Database Subnets',
      'AWS WAF WebACL deployment with rate-limiting, SQLi, and XSS protection rulesets',
      'Continuous intelligent threat monitoring using Amazon GuardDuty & AWS CloudTrail',
      'Customer Managed Keys (CMK) via AWS KMS with automatic annual key rotation',
    ],
    keyHighlights: [
      'Zero-Trust Network Segmentation & Subnet Routing',
      'Real-time Threat Alerts via Amazon SNS',
      'Strict S3 Bucket Policies & Object Lock Enforcement',
      'CIS AWS Benchmark Compliance Hardening',
    ],
    tags: ['AWS VPC', 'AWS IAM', 'AWS WAF', 'GuardDuty', 'AWS KMS', 'CloudTrail', 'Security'],
    image: '/assets/secure-cloud.jpg',
  },
  {
    title: 'Oracle APEX Dashboard',
    category: 'Oracle APEX & DB',
    badge: 'Enterprise Reporting',
    tagline: 'Interactive Analytical Dashboards & Automated Business Intelligence at CRTV',
    description:
      'Comprehensive enterprise management and reporting portal engineered in Oracle APEX with Oracle Database and PL/SQL. Delivers dynamic interactive reporting, multi-level analytical KPI dashboards, automated report generation, and role-based data visualization for executive decision-makers.',
    architecturePoints: [
      'Advanced PL/SQL stored procedures, packages, and triggers for real-time aggregation',
      'Interactive Grids & Charts with customized CSS/JavaScript dynamic actions',
      'Automated scheduled report distribution via Oracle APEX Mail and DBMS_SCHEDULER',
      'Granular role-based authorization schemes and audit trail logging',
    ],
    keyHighlights: [
      'Real-time Executive Decision Dashboards',
      'Complex SQL / PL-SQL Query Optimization',
      'Automated Daily/Weekly Analytical Exports',
      'High User Adoption across Enterprise Departments',
    ],
    tags: ['Oracle APEX', 'Oracle DB', 'SQL', 'PL/SQL', 'Data Analytics', 'BI Reporting', 'JavaScript'],
    image: '/assets/oracle-dashboard.jpg',
  },
  {
    title: 'Network Infrastructure Design',
    category: 'Networking & Telecom',
    badge: 'GSM / LTE & Systems',
    tagline: 'Telecom Base Station Architecture, Routing Protocols & Linux Server Stacks',
    description:
      'Complete computer network and telecommunications architecture design covering GSM/LTE base stations, IP packet core routing, VLAN segmentation, DHCP/DNS services, NAT configurations, static and dynamic routing (OSPF, BGP basics), and hardened Linux Nginx reverse proxy servers.',
    architecturePoints: [
      'VLAN segmentation and inter-VLAN routing for network security and broadcast isolation',
      'Linux Server deployment with Nginx reverse proxy, SSL/TLS termination, and firewall configuration',
      'GSM/LTE base station radio access network (RAN) and IP transport architecture simulation',
      'DHCP, DNS, and NAT service provisioning with failover redundancy',
    ],
    keyHighlights: [
      'High-Reliability Network Redundancy & Failover',
      'Telecom Radio & IP Network Protocol Modeling',
      'Linux Server Hardening & Containerization',
      'Comprehensive Packet Analysis & Traffic Optimization',
    ],
    tags: ['GSM/LTE', 'Networking', 'VLAN', 'Routing', 'Linux SysAdmin', 'Nginx', 'Docker'],
    image: '/assets/network-infra.jpg',
  },
];

const categories = ['All', 'AWS & Serverless', 'Cloud Security', 'Oracle APEX & DB', 'Networking & Telecom'];

interface ProjectsSectionProps {
  onOpenModal: (project: ProjectDetail) => void;
}

export function ProjectsSection({ onOpenModal }: ProjectsSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredProjects = projectsData.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <section id="projects" className="w-full bg-[#080B14] py-24 md:py-32 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-[800px] mx-auto mb-12 md:mb-16 opacity-0">
          <SectionLabel text="FEATURED WORK & ARCHITECTURE" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]">
            Projects &amp; Cloud Realizations
          </h2>
          <p className="text-base md:text-lg text-slate-300 mt-4 leading-relaxed max-w-[660px] mx-auto">
            From serverless cloud applications and enterprise zero-trust security to Oracle APEX analytical dashboards and telecom networks.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono-terminal transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
