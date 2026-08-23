import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { TimelineItem } from '@/components/TimelineItem';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    date: 'Oct 2024 – Feb 2025',
    title: 'AWS Solutions Architect – Associate',
    institution: 'Adacorp / Amazon Web Services (Online)',
    description:
      'Rigorous specialization in designing secure, highly available, fault-tolerant, and cost-efficient cloud architectures on AWS. Deep coverage of VPC networking, IAM security governance, serverless ecosystems, asynchronous event processing, and AWS CDK automation.',
    highlights: [
      'Multi-tier VPC isolation & Security Group / NACL rules',
      'AWS Lambda, API Gateway, S3, DynamoDB Serverless Architecture',
      'AWS KMS encryption, AWS WAF, and Amazon GuardDuty implementation',
      'High-availability multi-AZ deployment & disaster recovery strategies',
    ],
    credentialLink: 'https://aws.amazon.com/verification',
    isVerified: true,
  },
  {
    date: '2017 – 2020',
    title: 'Bachelor of Engineering Sciences – Telecom Engineering',
    institution: 'UPAC Cameroon (Université Protestante d\'Afrique Centrale)',
    description:
      'Comprehensive engineering degree covering telecommunications infrastructure, computer networking, IP protocols (TCP/IP, routing, switching), electronics, digital transmission systems, and signal processing fundamentals.',
    highlights: [
      'Advanced computer networks, VLAN, DHCP, DNS, and IP routing',
      'GSM, LTE, and radio access network (RAN) architecture modeling',
      'Transmission media, fiber optics, and digital communication systems',
      'Graduated with strong analytical and engineering foundation',
    ],
    isVerified: true,
  },
  {
    date: '2017',
    title: 'Scientific Baccalaureate (Baccalauréat Série D)',
    institution: 'Institut Polyvalent du Succès, Cameroon',
    description:
      'Rigorous scientific curriculum emphasizing advanced mathematics, physics, chemistry, and life sciences oriented toward engineering studies.',
    highlights: [
      'Advanced Mathematics & Calculus',
      'Physics, Electronics & Classical Mechanics',
      'Scientific Methodology & Problem Solving',
    ],
    isVerified: true,
  },
];

export function EducationSection() {
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
    <section id="education" className="w-full bg-[#080B14] py-24 md:py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <SectionLabel text="VERIFIED QUALIFICATIONS & EDUCATION" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]">
            Certifications &amp; Academic Background
          </h2>
          <p className="text-base md:text-lg text-slate-300 mt-4 leading-relaxed max-w-[600px] mx-auto">
            Official cloud architecture certifications and formal engineering degrees forming a strong foundation in modern technology.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Vertical Line */}
          <div
            className="absolute left-[13px] md:left-[17px] top-4 bottom-4 w-[2px] -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, #00F2FE 0%, #3B82F6 50%, #10B981 100%)',
              boxShadow: '0 0 15px rgba(0,242,254,0.4)',
            }}
          />

          {/* Timeline Items */}
          {timelineItems.map((item, i) => (
            <TimelineItem key={item.title} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
