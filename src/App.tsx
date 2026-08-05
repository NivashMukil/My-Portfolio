import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { ParticleBackground } from './components/ParticleBackground';
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
  const { theme, toggleTheme } = useTheme();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className={`min-h-screen relative font-sans selection:bg-cyan-500 selection:text-white ${theme}`}>
      {/* Dynamic Starry Canvas Mesh */}
      <ParticleBackground isDark={theme === 'dark'} />

      {/* Glowing Desktop Cursor Follower */}
      <CustomCursor />

      {/* Sticky Glass Navbar */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenResumeModal={() => setIsResumeModalOpen(true)} 
      />

      {/* Main Page Layout */}
      <main className="relative z-10">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <TrainingExperience />
        <Certifications />
        <Education />
        <ToolsCarousel />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Dual Resume Selection & Preview Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
