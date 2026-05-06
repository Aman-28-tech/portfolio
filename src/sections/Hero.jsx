import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon as Github, LinkedinIcon as Linkedin, Mail } from '../components/Icons';
import { USER_INFO } from '../data.js';
import { Code2, Cpu, Database, ChevronRight, Sparkles } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const PREVIEWS = {
  ml: '/home/amandeep/.gemini/antigravity/brain/611c959e-9d1e-4f7c-a764-00670e8613d1/coagulopathy_cracker_preview_1777981045867.png',
  logsight: '/home/amandeep/.gemini/antigravity/brain/611c959e-9d1e-4f7c-a764-00670e8613d1/logsight_preview_1777981070277.png',
  cpp: '/home/amandeep/.gemini/antigravity/brain/611c959e-9d1e-4f7c-a764-00670e8613d1/cpp_server_preview_1777981087588.png'
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Interactive Spotlight Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.1), transparent 80%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left"
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Active for opportunities</span>
            </motion.div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
              <Code2 size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">Java | Data Structures & Algorithms</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.9] text-white">
            Hi, I'm <br />
            <motion.span 
              className="text-gradient inline-block"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              Amandeep
            </motion.span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold text-gray-300 mb-8 tracking-tight flex items-center gap-4">
            Full-Stack & Systems Engineer <div className="h-1 w-20 bg-primary-500 rounded-full" />
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-medium">
            Engineering scalable web architectures and high-performance low-level systems. Focused on building robust, data-driven solutions with clean, efficient code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <Magnetic>
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-black rounded-2xl font-black transition-all flex items-center gap-3 group text-xl"
              >
                PROJECT PORTFOLIO <ChevronRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </motion.a>
            </Magnetic>
            <div className="flex gap-6">
              {[
                { icon: <Github size={28} />, href: USER_INFO.socials.github },
                { icon: <Linkedin size={28} />, href: USER_INFO.socials.linkedin },
                { icon: <Mail size={28} />, href: `mailto:${USER_INFO.socials.email}` }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <motion.a 
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, color: '#fff' }}
                    className="text-gray-500 transition-colors p-2"
                  >
                    {social.icon}
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content - 3D Bento Grid */}
        <div className="grid grid-cols-2 gap-6 h-[650px] perspective-1000">
          <TiltCard className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-[3rem] p-10 flex flex-col justify-end relative overflow-hidden group border border-white/10 h-full shadow-2xl"
            >
              <img src={PREVIEWS.cpp} alt="C++ Preview" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="relative z-10 transform translate-z-20">
                <div className="p-4 bg-emerald-500/20 rounded-2xl w-fit mb-6 border border-emerald-500/30">
                  <Cpu className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Systems</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Low-Level Net</p>
              </div>
            </motion.div>
          </TiltCard>

          <TiltCard className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-[3rem] p-10 flex flex-col justify-end relative overflow-hidden group border border-white/10 h-full shadow-2xl"
            >
              <img src={PREVIEWS.logsight} alt="MERN Preview" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="relative z-10 transform translate-z-20">
                <div className="p-4 bg-primary-500/20 rounded-2xl w-fit mb-6 border border-primary-500/30">
                  <Database className="text-primary-400" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Full-Stack</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Real-time App</p>
              </div>
            </motion.div>
          </TiltCard>

          <TiltCard className="col-span-2 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-[3rem] p-12 flex items-center justify-between relative overflow-hidden group border border-white/10 h-full shadow-2xl"
            >
              <img src={PREVIEWS.ml} alt="ML Preview" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent"></div>
              <div className="relative z-10 flex items-center gap-12 transform translate-z-30">
                <div className="p-8 bg-accent-500/10 rounded-[2rem] text-accent-400 group-hover:rotate-[360deg] transition-transform duration-1000 border border-accent-500/20 shadow-xl">
                  <Code2 size={50} />
                </div>
                <div>
                  <h3 className="text-5xl font-black text-white mb-3 italic">Applied AI</h3>
                  <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed">Predictive modeling & predictive architectures for complex healthcare data.</p>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
