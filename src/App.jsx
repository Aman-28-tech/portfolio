import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Footer from './sections/Footer';
import SkillMarquee from './components/SkillMarquee';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0, 
          x: Math.random() * 100 + "%", 
          y: Math.random() * 100 + "%" 
        }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
          x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
        }}
        transition={{ 
          duration: 15 + Math.random() * 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]"
      />
    ))}
  </div>
);

function App() {
  return (
    <div className="relative w-full bg-[#0a0a0a] text-[#ededed] min-h-screen selection:bg-primary-500/30 selection:text-white overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />
      
      <FloatingElements />

      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]"></div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <Navbar />
        
          <main className="flex flex-col">
            <Hero />
            <SkillMarquee />
            <Experience />
            <Education />
            <Projects />
            <Skills />
          </main>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
