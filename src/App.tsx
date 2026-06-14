import { useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { CloudJourneySection } from '@/sections/CloudJourneySection';
import { AboutSection } from '@/sections/AboutSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { EducationSection } from '@/sections/EducationSection';
import { ContactSection } from '@/sections/ContactSection';
import { LoadingScreen } from '@/sections/LoadingScreen';
import { useLoadingGate } from '@/hooks/useLoadingGate';
import { useLenis } from '@/hooks/useLenis';

function App() {
  const { isLoaded, reportReady } = useLoadingGate(1500);
  useLenis();

  const handleSceneReady = useCallback(() => {
    reportReady();
  }, [reportReady]);

  return (
    <>
      <LoadingScreen isLoaded={isLoaded} />
      <Navbar />
      <main>
        <HeroSection onSceneReady={handleSceneReady} />
        <ProjectsSection />
        <CloudJourneySection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
