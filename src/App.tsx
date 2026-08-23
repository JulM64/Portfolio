import { useState, useCallback, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsSection, projectsData } from '@/sections/ProjectsSection';
import { CloudJourneySection } from '@/sections/CloudJourneySection';
import { AboutSection } from '@/sections/AboutSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { EducationSection } from '@/sections/EducationSection';
import { ContactSection } from '@/sections/ContactSection';
import { LoadingScreen } from '@/sections/LoadingScreen';
import { CommandPalette } from '@/components/CommandPalette';
import { ProjectModal, type ProjectDetail } from '@/components/ProjectModal';
import { CursorGlow } from '@/components/CursorGlow';
import { BackToTop } from '@/components/BackToTop';
import { useLoadingGate } from '@/hooks/useLoadingGate';
import { useLenis } from '@/hooks/useLenis';

function App() {
  const { isLoaded, reportReady } = useLoadingGate(1500);
  useLenis();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const handleSceneReady = useCallback(() => {
    reportReady();
  }, [reportReady]);

  const handleOpenProjectByName = useCallback((title: string) => {
    const found = projectsData.find((p) => p.title.toLowerCase() === title.toLowerCase());
    if (found) {
      setSelectedProject(found);
    }
  }, []);

  // Global keyboard shortcut for Command Palette (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080B14] text-[#B8C0D4] selection:bg-cyan-500/30 selection:text-white">
      {/* Interactive Cursor Light Trail */}
      <CursorGlow />

      {/* Initial Loading Screen */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* Floating Top Navigation */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <HeroSection
          onSceneReady={handleSceneReady}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <ProjectsSection onOpenModal={(proj) => setSelectedProject(proj)} />
        <CloudJourneySection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Floating Back to Top with Circular Scroll Progress */}
      <BackToTop />

      {/* Command Palette Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenProject={handleOpenProjectByName}
      />

      {/* Project Deep Dive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
