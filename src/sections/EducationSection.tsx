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
    institution: 'Adacorp (Online)',
    description:
      'Specialization in cloud architectures, AWS security, VPC, IAM, serverless solutions, and cloud engineering best practices.',
    credentialLink: 'https://aws.amazon.com/verification',
  },
  {
    date: '2017 – 2020',
    title: 'Bachelor of Engineering Sciences – Telecom Engineering',
    institution: 'UPAC Cameroon',
    description:
      'Advanced training in computer networks, telecommunications, IP protocols, digital systems, electronics, transmission, and telecom infrastructure.',
  },
  {
    date: '2017',
    title: 'Baccalauréat D (Scientific Baccalaureate)',
    institution: 'Institut Polyvalent du Succès, Cameroon',
    description:
      'Strong scientific foundation (mathematics, physics, life sciences) oriented toward engineering.',
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
    <section id="education" className="w-full bg-[#0F1629] py-24 md:py-32">
      <div className="max-w-[900px] mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 opacity-0">
          <SectionLabel text="QUALIFICATIONS" />
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight tracking-[-0.01em]">
            Certifications &amp; Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-[30px] top-0 bottom-0 w-[2px]"
            style={{
              background: 'linear-gradient(180deg, #1A56DB, #64FFDA)',
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
