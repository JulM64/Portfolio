import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple noise function for cloud generation
function noise(x: number, y: number, z: number): number {
  const sin = Math.sin;
  return (
    sin(x * 0.5 + z * 0.3) * sin(y * 0.4 + z * 0.2) * 0.5 +
    sin(x * 1.2 + y * 0.8) * 0.25 +
    sin(z * 0.7 + x * 0.9) * 0.25
  );
}

function generateCloudPoints(centerX: number, centerY: number, centerZ: number, count: number): Float32Array {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const w = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(w) * 25;

    const bx = centerX + r * Math.sin(phi) * Math.cos(theta);
    const by = centerY + r * Math.sin(phi) * Math.sin(theta);
    const bz = centerZ + r * Math.cos(phi);

    const n = noise(bx * 0.1, by * 0.1, bz * 0.1);
    const displacement = 1 + n * 0.4;

    points[i * 3] = centerX + (bx - centerX) * displacement;
    points[i * 3 + 1] = centerY + (by - centerY) * displacement;
    points[i * 3 + 2] = centerZ + (bz - centerZ) * displacement;
  }
  return points;
}

function createCloudGeometry(position: [number, number, number], count: number, color: string): THREE.Points {
  const points = generateCloudPoints(position[0], position[1], position[2], count);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.8,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const cloud = new THREE.Points(geometry, material);
  return cloud;
}

interface HeroSectionProps {
  onSceneReady: () => void;
}

export function HeroSection({ onSceneReady }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cameraOffsetRef = useRef({ x: 0, y: 0 });

  const initScene = useCallback(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B0E17, 0.002);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.set(0, 0, 200);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0B0E17, 1);
    container.appendChild(renderer.domElement);

    // Cloud clusters
    const cloudColors = ['#3B82F6', '#1A56DB', '#1E40AF', '#60A5FA', '#3B82F6'];
    const cloudPositions: [number, number, number][] = [
      [-150, -20, -100],
      [-50, -10, -150],
      [0, 0, -200],
      [50, 10, -150],
      [150, -20, -100],
    ];
    const cloudCounts = [400, 350, 500, 350, 400];

    const clouds: THREE.Points[] = [];
    cloudPositions.forEach((pos, i) => {
      const cloud = createCloudGeometry(pos, cloudCounts[i], cloudColors[i]);
      scene.add(cloud);
      clouds.push(cloud);
    });

    // Particles
    const particleCount = 500;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 600;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 100;
      particleSpeeds[i] = 0.01 + Math.random() * 0.03;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x64FFDA,
      size: 0.5,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Ambient light (for any mesh)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Camera parallax
      const targetX = mouseRef.current.x * 30;
      const targetY = -mouseRef.current.y * 30;
      cameraOffsetRef.current.x += (targetX - cameraOffsetRef.current.x) * 0.05;
      cameraOffsetRef.current.y += (targetY - cameraOffsetRef.current.y) * 0.05;
      camera.position.x = cameraOffsetRef.current.x;
      camera.position.y = cameraOffsetRef.current.y;
      camera.lookAt(0, 0, 0);

      // Rotate clouds
      clouds.forEach((cloud, i) => {
        cloud.rotation.y += 0.0003 * (i % 2 === 0 ? 1 : -1);
      });

      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 200) {
          positions[i * 3 + 1] = -200;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    onSceneReady();

    // Cleanup
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

    // Hero text fade on scroll
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200',
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

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: '#0B0E17' }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-[1]"
      />

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(11,14,23,0.6) 100%)',
        }}
      />

      {/* Hero Text Content */}
      <div
        ref={heroTextRef}
        className="relative z-[3] flex flex-col items-center justify-center min-h-[100dvh] px-4 pointer-events-none"
      >
        <div className="text-center max-w-[680px] pt-[5vh]">
          <span className="inline-block font-mono-terminal text-xs font-medium tracking-[0.15em] uppercase text-[#1A56DB] mb-6">
            AWS CERTIFIED CLOUD ARCHITECT
          </span>
          <h1 className="font-heading text-6xl md:text-7xl lg:text-[72px] font-bold text-white leading-[1.1] tracking-[-0.02em]">
            Mveng Mballa
          </h1>
          <h1 className="font-heading text-6xl md:text-7xl lg:text-[72px] font-bold text-white leading-[1.1] tracking-[-0.02em] -mt-2">
            Julien Cedric
          </h1>
          <p className="text-lg md:text-xl text-[#B8C0D4] mt-6">
            Cloud Engineer | Network Administrator | Application Developer
          </p>
          <p className="text-base text-[#8892B0] max-w-[600px] mx-auto mt-4 text-center leading-relaxed">
            AWS-certified IT engineer specializing in Oracle APEX application development, cloud security,
            and system automation. I build dynamic interfaces and automate information systems for
            next-generation infrastructure.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono-terminal text-xs text-[#8892B0] tracking-wider">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#1A56DB] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
