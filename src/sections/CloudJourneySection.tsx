import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, ShieldCheck, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function createCloudTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(0, 242, 254, 0.7)');
  gradient.addColorStop(0.2, 'rgba(59, 130, 246, 0.4)');
  gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.15)');
  gradient.addColorStop(1, 'rgba(8, 11, 20, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const panels = [
  {
    step: 'STAGE 01',
    title: 'Cloud Architecture & Serverless',
    icon: Cloud,
    description:
      'Designing highly resilient, auto-scaling serverless backends on AWS. Eliminating server management overhead while maximizing uptime and minimizing operational cost.',
    highlights: ['AWS Lambda & API Gateway', 'DynamoDB & S3 Lifecycle Archiving', 'Modular Infrastructure with AWS CDK'],
    range: [0, 0.25],
  },
  {
    step: 'STAGE 02',
    title: 'Security & Zero-Trust Governance',
    icon: ShieldCheck,
    description:
      'Enforcing enterprise-grade multi-tier network isolation, strict least-privilege IAM policies, AWS WAF rate-limiting, and automated anomaly detection.',
    highlights: ['Multi-tier VPC Isolation & Subnet Routing', 'Amazon GuardDuty Threat Intelligence', 'AWS KMS Encryption Key Lifecycle'],
    range: [0.25, 0.5],
  },
  {
    step: 'STAGE 03',
    title: 'DevOps & Infrastructure as Code',
    icon: Cpu,
    description:
      'Streamlining deployments with reproducible TypeScript AWS CDK stacks, automated CI/CD pipelines, and proactive Amazon CloudWatch observability.',
    highlights: ['Declarative IaC with AWS CDK', 'Continuous Integration & Safe Rollouts', 'Real-time Telemetry & CloudWatch Alarms'],
    range: [0.5, 0.75],
  },
  {
    step: 'STAGE 04',
    title: 'Enterprise & System Automation',
    icon: Sparkles,
    description:
      'Bridging code with real-world business operations through Oracle APEX dynamic reporting, Linux server administration, and robust telecom networks.',
    highlights: ['Oracle APEX & PL/SQL BI Dashboards', 'Hardened Linux & Nginx Reverse Proxies', 'End-to-End Enterprise Automation'],
    range: [0.75, 1.0],
  },
];

export function CloudJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initScene = useCallback(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080B14, 0.00035);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 0, 150);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080B14, 1);
    container.appendChild(renderer.domElement);

    // Cloud planes
    const cloudTexture = createCloudTexture();
    const cloudGroup = new THREE.Group();

    const cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    // Create cloud planes along Z axis
    for (let cluster = 0; cluster < 12; cluster++) {
      const cx = (Math.random() - 0.5) * 180;
      const cy = (Math.random() - 0.5) * 90;
      const cz = -200 - cluster * 480;

      for (let j = 0; j < 5; j++) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(280, 280), cloudMat.clone());
        plane.position.set(
          cx + (Math.random() - 0.5) * 70,
          cy + (Math.random() - 0.5) * 45,
          cz + (Math.random() - 0.5) * 110
        );
        plane.rotation.z = Math.random() * Math.PI;
        plane.material.opacity = 0.25 + Math.random() * 0.35;
        cloudGroup.add(plane);
      }
    }

    scene.add(cloudGroup);

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cloudGroup.rotation.z += 0.00015;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Camera Z flythrough
        camera.position.z = 150 - progress * 4800;

        // Mouse Parallax
        const targetX = mouseRef.current.x * 50;
        const targetY = -mouseRef.current.y * 30;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;

        // Stage Panels Opacity Calculation
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          const [start, end] = panels[i].range;
          const fadeInStart = start;
          const fadeInEnd = start + 0.06;
          const fadeOutStart = end - 0.06;
          const fadeOutEnd = end;

          let opacity = 0;
          let scale = 0.95;
          let translateY = 20;

          if (progress >= fadeInStart && progress <= fadeInEnd) {
            const factor = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
            opacity = factor;
            scale = 0.95 + factor * 0.05;
            translateY = 20 * (1 - factor);
          } else if (progress > fadeInEnd && progress < fadeOutStart) {
            opacity = 1;
            scale = 1;
            translateY = 0;
          } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
            const factor = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            opacity = 1 - factor;
            scale = 1 - factor * 0.05;
            translateY = -20 * factor;
          }

          panel.style.opacity = String(opacity);
          panel.style.transform = `translate(-50%, -50%) scale(${scale}) translateY(${translateY}px)`;
          panel.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
        });
      },
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scrollTrigger.kill();
      renderer.dispose();
      scene.clear();
      cloudTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return () => cleanup?.();
  }, [initScene]);

  return (
    <section id="cloud-journey" ref={sectionRef} className="relative w-full" style={{ height: '320vh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#080B14]"
      >
        {/* Three.js Canvas */}
        <div ref={canvasContainerRef} className="absolute inset-0 z-[1]" />

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 z-[2] cyber-grid opacity-20 pointer-events-none" />

        {/* Top Header Tracker */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[3] text-center pointer-events-none px-4">
          <span className="font-mono-terminal text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Interactive Cloud Architecture Horizon
          </span>
        </div>

        {/* Storytelling Cards */}
        {panels.map((panel, i) => {
          const Icon = panel.icon;
          return (
            <div
              key={panel.title}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[660px] w-[90%] px-6 md:px-8 py-8 md:py-10 rounded-3xl bg-[#0B0F1D]/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(0,242,254,0.18)] text-center z-[4] opacity-0 transition-transform duration-200"
            >
              {/* Step Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono-terminal text-xs font-semibold mb-4">
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{panel.step}</span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
                {panel.title}
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                {panel.description}
              </p>

              {/* Highlights Pill Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {panel.highlights.map((hl) => (
                  <div
                    key={hl}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono-terminal text-slate-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] font-mono-terminal text-[11px] text-slate-500 tracking-wider">
          SCROLL TO NAVIGATE ARCHITECTURAL STAGES
        </div>
      </div>
    </section>
  );
}
