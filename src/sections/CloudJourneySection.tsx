import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate cloud texture procedurally
function createCloudTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.4)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const panels = [
  {
    title: 'Cloud Architecture',
    description: 'Designing scalable, serverless architectures that reduce costs and increase reliability',
    range: [0, 0.25],
  },
  {
    title: 'Security First',
    description: 'Implementing enterprise-grade security with IAM, VPC isolation, WAF, and GuardDuty',
    range: [0.25, 0.5],
  },
  {
    title: 'Automation',
    description: 'Streamlining deployments with infrastructure-as-code, CI/CD pipelines, and automated monitoring',
    range: [0.5, 0.75],
  },
  {
    title: 'Your Next Cloud Engineer',
    description: 'Ready to architect, secure, and optimize your cloud infrastructure',
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
    scene.fog = new THREE.FogExp2(0x0B1120, 0.0003);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 0, 150);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0B0E17, 1);
    container.appendChild(renderer.domElement);

    // Cloud planes
    const cloudTexture = createCloudTexture();
    const cloudGroup = new THREE.Group();

    const cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    // Create 50 cloud planes in clusters
    for (let cluster = 0; cluster < 10; cluster++) {
      const cx = (Math.random() - 0.5) * 160;
      const cy = (Math.random() - 0.5) * 80;
      const cz = -200 - cluster * 530;

      for (let j = 0; j < 5; j++) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(250, 250), cloudMat.clone());
        plane.position.set(
          cx + (Math.random() - 0.5) * 60,
          cy + (Math.random() - 0.5) * 40,
          cz + (Math.random() - 0.5) * 100
        );
        plane.rotation.z = Math.random() * Math.PI;
        plane.material.opacity = 0.2 + Math.random() * 0.3;
        cloudGroup.add(plane);
      }
    }

    scene.add(cloudGroup);

    // Background half-sphere
    const bgGeo = new THREE.SphereGeometry(500, 32, 32, 0, Math.PI);
    const bgMat = new THREE.MeshBasicMaterial({
      color: 0x0B1120,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const bgSphere = new THREE.Mesh(bgGeo, bgMat);
    bgSphere.rotation.x = Math.PI;
    scene.add(bgSphere);

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      bgSphere.rotation.y += 0.0002;
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

    // ScrollTrigger for camera
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Camera Z: 150 → -4500
        camera.position.z = 150 - progress * 4650;

        // Mouse parallax on camera X/Y
        const targetX = mouseRef.current.x * 60;
        const targetY = -mouseRef.current.y * 30;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;

        // Panel visibility
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          const [start, end] = panels[i].range;
          const fadeInStart = start;
          const fadeInEnd = start + 0.05;
          const fadeOutStart = end - 0.05;
          const fadeOutEnd = end;

          let opacity = 0;
          if (progress >= fadeInStart && progress <= fadeInEnd) {
            opacity = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
          } else if (progress > fadeInEnd && progress < fadeOutStart) {
            opacity = 1;
          } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
            opacity = 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          }
          panel.style.opacity = String(opacity);
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
    <section id="cloud-journey" ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-[100dvh] overflow-hidden"
        style={{ backgroundColor: '#0B0E17' }}
      >
        {/* Three.js Canvas */}
        <div ref={canvasContainerRef} className="absolute inset-0 z-[1]" />

        {/* Text Panels */}
        {panels.map((panel, i) => (
          <div
            key={panel.title}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full px-6 text-center z-[2] opacity-0"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight tracking-[-0.01em] mb-4">
              {panel.title}
            </h2>
            <p className="text-lg text-[#B8C0D4] leading-relaxed">{panel.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
