import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ProjectCard } from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Cloudly App',
    description:
      'Intelligent archiving application on AWS (Serverless) — React, S3, Lambda, Cognito, DynamoDB, AWS CDK',
    tags: ['AWS', 'Serverless', 'React'],
    image: '/assets/cloudly-app.jpg',
    link: 'https://github.com/JulM64/cloudly-app',
  },
  {
    title: 'Secure Cloud Deployment',
    description:
      'VPC + IAM architecture, S3 policies, WAF, GuardDuty — Full cloud security stack deployment',
    tags: ['AWS', 'Security', 'VPC'],
    image: '/assets/secure-cloud.jpg',
  },
  {
    title: 'Oracle APEX Dashboard',
    description:
      'Interactive user interface design and deployment, advanced reporting, analytical dashboards, automated reports at CRTV',
    tags: ['Oracle APEX', 'SQL', 'PL/SQL'],
    image: '/assets/oracle-dashboard.jpg',
  },
  {
    title: 'Network Infrastructure Design',
    description:
      'GSM/LTE base architecture, VLAN, DHCP, DNS, NAT, static & dynamic routing configuration',
    tags: ['Networking', 'GSM/LTE', 'Linux'],
    image: '/assets/network-infra.jpg',
  },
];

export function ProjectsSection() {
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
    <section id="projects" className="w-full bg-[#0B0E17] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-[800px] mx-auto mb-16 md:mb-20 opacity-0">
          <SectionLabel text="SELECTED WORK" />
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight tracking-[-0.01em]">
            Projects &amp; Realizations
          </h2>
          <p className="text-lg text-[#B8C0D4] mt-4 leading-relaxed">
            From cloud-native applications to secure network deployments, here are some of my most
            impactful technical projects.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
