import { useState } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TrainingExperience } from './components/TrainingExperience';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { ToolsCarousel } from './components/ToolsCarousel';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative font-sans" style={{ background: '#07090E', color: '#F0F6FC' }}>

      {/* 3D Interactive WebGL Background */}
      <ThreeBackground />

      {/* Glowing Neon Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphism Navbar */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Section separator */}
        <div className="section-divider mx-auto max-w-7xl" />

        <About />

        <div className="section-divider mx-auto max-w-7xl" />

        <Skills />

        <div className="section-divider mx-auto max-w-7xl" />

        <Projects />

        <div className="section-divider mx-auto max-w-7xl" />

        <TrainingExperience />

        <div className="section-divider mx-auto max-w-7xl" />

        <Certifications />

        <div className="section-divider mx-auto max-w-7xl" />

        <Education />

        {/* Tools Carousel */}
        <ToolsCarousel />

        <div className="section-divider mx-auto max-w-7xl" />

        <Achievements />

        <div className="section-divider mx-auto max-w-7xl" />

        <Contact />
      </main>

      <Footer />

      {/* Dual Resume Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
