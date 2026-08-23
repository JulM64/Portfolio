import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileDown, ShieldCheck, Sparkles, Terminal, Cloud, Server, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3D Noise function for procedural nebula cloud distribution
function noise(x: number, y: number, z: number): number {
  const sin = Math.sin;
  return (
    sin(x * 0.5 + z * 0.3) * sin(y * 0.4 + z * 0.2) * 0.5 +
    sin(x * 1.2 + y * 0.8) * 0.25 +
    sin(z * 0.7 + x * 0.9) * 0.25
  );
}

function generateNebulaPoints(centerX: number, centerY: number, centerZ: number, count: number): Float32Array {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const w = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(w) * 32;

    const bx = centerX + r * Math.sin(phi) * Math.cos(theta);
    const by = centerY + r * Math.sin(phi) * Math.sin(theta);
    const bz = centerZ + r * Math.cos(phi);

    const n = noise(bx * 0.08, by * 0.08, bz * 0.08);
    const displacement = 1 + n * 0.45;

    points[i * 3] = centerX + (bx - centerX) * displacement;
    points[i * 3 + 1] = centerY + (by - centerY) * displacement;
    points[i * 3 + 2] = centerZ + (bz - centerZ) * displacement;
  }
  return points;
}

function createCloudCluster(position: [number, number, number], count: number, color: string, size = 1.0): THREE.Points {
  const points = generateNebulaPoints(position[0], position[1], position[2], count);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: size,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

interface HeroSectionProps {
  onSceneReady: () => void;
  onOpenCommandPalette?: () => void;
}

export function HeroSection({ onSceneReady, onOpenCommandPalette }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const cameraOffsetRef = useRef({ x: 0, y: 0 });

  const initScene = useCallback(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080B14, 0.0018);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1200);
    camera.position.set(0, 0, 210);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080B14, 1);
    container.appendChild(renderer.domElement);

    // Nebula Clusters (Electric Cyan, AWS Blue, Deep Royal)
    const clusterConfigs: { pos: [number, number, number]; count: number; color: string; size: number }[] = [
      { pos: [-160, -30, -120], count: 500, color: '#00F2FE', size: 1.2 },
      { pos: [-60, 20, -160], count: 450, color: '#3B82F6', size: 1.0 },
      { pos: [0, -10, -210], count: 650, color: '#64FFDA', size: 1.3 },
      { pos: [70, 25, -150], count: 450, color: '#2563EB', size: 1.1 },
      { pos: [170, -25, -110], count: 500, color: '#00F2FE', size: 1.2 },
      { pos: [0, 60, -180], count: 350, color: '#38BDF8', size: 0.9 },
    ];

    const clusters: THREE.Points[] = [];
    clusterConfigs.forEach((cfg) => {
      const cluster = createCloudCluster(cfg.pos, cfg.count, cfg.color, cfg.size);
      scene.add(cluster);
      clusters.push(cluster);
    });

    // Orbiting Cyber Ring / Halo
    const ringRadius = 90;
    const ringCount = 300;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 6;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      ringPositions[i * 3 + 2] = Math.sin(angle) * ringRadius + (Math.random() - 0.5) * 6;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      color: 0x00F2FE,
      size: 1.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Points(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.18;
    scene.add(ring);

    // Starfield Particle Constellation
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 700;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 500 - 80;
      particleSpeeds[i] = 0.015 + Math.random() * 0.035;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x64FFDA,
      size: 0.7,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax camera
      cameraOffsetRef.current.x = mouseRef.current.x * 25;
      cameraOffsetRef.current.y = -mouseRef.current.y * 20;
      camera.position.x += (cameraOffsetRef.current.x - camera.position.x) * 0.05;
      camera.position.y += (cameraOffsetRef.current.y - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate clusters & rings
      clusters.forEach((cl, i) => {
        cl.rotation.y += 0.0004 * (i % 2 === 0 ? 1 : -1);
        cl.rotation.x = Math.sin(elapsedTime * 0.2 + i) * 0.04;
      });

      ring.rotation.y += 0.001;

      // Drift starfield
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 250) {
          positions[i * 3 + 1] = -250;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Window Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    onSceneReady();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSceneReady]);

  useEffect(() => {
    const cleanup = initScene();

    if (heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400',
          scrub: true,
        },
      });
    }

    return () => {
      cleanup?.();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [initScene]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#080B14] flex items-center justify-center pt-24 pb-16"
    >
      {/* 3D Canvas Background */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-[1]" />

      {/* Cyber Grid Background Texture */}
      <div className="absolute inset-0 z-[2] cyber-grid opacity-30 pointer-events-none" />

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,11,20,0.85) 100%)',
        }}
      />

      {/* Floating Holographic Stat Cards (Desktop) */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-[4] space-y-4 pointer-events-none">
        <div className="animate-float p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,242,254,0.12)] flex items-center gap-3 w-56">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-heading text-lg font-bold text-white">100%</span>
            <span className="font-mono-terminal text-[11px] text-slate-400 uppercase tracking-wider">Serverless Focus</span>
          </div>
        </div>

        <div className="animate-float-delayed p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)] flex items-center gap-3 w-56">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-heading text-lg font-bold text-white">Zero-Trust</span>
            <span className="font-mono-terminal text-[11px] text-slate-400 uppercase tracking-wider">Security Architecture</span>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 z-[4] space-y-4 pointer-events-none">
        <div className="animate-float-delayed p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] flex items-center gap-3 w-56">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-heading text-lg font-bold text-white">3+ Years</span>
            <span className="font-mono-terminal text-[11px] text-slate-400 uppercase tracking-wider">Engineering Exp</span>
          </div>
        </div>

        <div className="animate-float p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex items-center gap-3 w-56">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-heading text-lg font-bold text-white">Oracle APEX</span>
            <span className="font-mono-terminal text-[11px] text-slate-400 uppercase tracking-wider">Enterprise &amp; BI</span>
          </div>
        </div>
      </div>

      {/* Hero Content Container */}
      <div
        ref={heroContentRef}
        className="relative z-[3] max-w-[900px] mx-auto px-4 text-center flex flex-col items-center justify-center"
      >
        {/* Radar Pulse Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,242,254,0.2)] mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="font-mono-terminal text-xs font-semibold tracking-[0.14em] uppercase text-cyan-300">
            AWS CERTIFIED SOLUTIONS ARCHITECT
          </span>
        </div>

        {/* Hero Name Title */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-3">
          Mveng Mballa <br />
          <span className="text-gradient-iridescent">Julien Cedric</span>
        </h1>

        {/* Roles Subtitle */}
        <p className="text-lg md:text-xl font-medium text-cyan-300/90 mt-2 font-mono-terminal tracking-wide">
          Cloud Architect <span className="text-slate-600">|</span> Network Administrator <span className="text-slate-600">|</span> Application Developer
        </p>

        {/* Description Bio */}
        <p className="text-base sm:text-lg text-slate-300 max-w-[660px] mx-auto mt-6 leading-relaxed">
          AWS-certified IT engineer specializing in <strong className="text-white">scalable cloud architecture</strong>, <strong className="text-white">Oracle APEX enterprise development</strong>, and <strong className="text-white">systems automation</strong>. I build dynamic interfaces and resilient infrastructure for modern operations.
        </p>

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:bg-[length:200%_auto] text-white font-heading font-semibold text-base shadow-[0_0_35px_rgba(0,242,254,0.35)] hover:shadow-[0_0_50px_rgba(0,242,254,0.55)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400 font-heading font-semibold text-base backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Interactive Terminal</span>
          </button>

          <a
            href="/assets/cv_image.png"
            download="Mveng_Mballa_CV.png"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-heading font-semibold text-base backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Quick Command Palette hint */}
        <div className="mt-8">
          <button
            onClick={onOpenCommandPalette}
            className="inline-flex items-center gap-2 text-xs font-mono-terminal text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Ctrl + K</kbd> anytime to open Command Search</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        onClick={() => scrollToSection('projects')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span className="font-mono-terminal text-[11px] text-slate-400 tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
