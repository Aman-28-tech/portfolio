import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, Trophy, TerminalSquare } from 'lucide-react';
import { SKILLS, STATS } from '../data.js';

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter">TECHNICAL <span className="text-gradient">ARSENAL</span></h2>
          <p className="text-gray-400 text-lg">Metrics that matter & tools I master.</p>
        </motion.div>

        {/* Stats Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.a 
            href="https://leetcode.com/u/montykl007/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 glass-card p-10 rounded-3xl relative overflow-hidden group hover:border-primary-500/30 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 text-primary-500 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
              <Code2 size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-accent-400" size={24} />
                <h3 className="text-xl font-bold text-white">LeetCode Profile</h3>
              </div>
              <div className="text-6xl font-black text-gradient mt-6 mb-2">{STATS[0].value}</div>
              <p className="text-gray-400 text-lg font-medium">{STATS[0].label} solved</p>
              
              <div className="mt-8 flex gap-8">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-white">{STATS[1].value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{STATS[1].label}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-white">{STATS[3].value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{STATS[3].label}</div>
                </div>
              </div>
            </div>
          </motion.a>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 glass-card p-8 rounded-3xl flex flex-col justify-center items-center text-center group shadow-xl"
          >
            <Flame className="text-orange-500 mb-6 group-hover:scale-125 transition-transform duration-500" size={48} />
            <div className="text-4xl font-black text-white mb-2">{STATS[2].value}</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{STATS[2].label}</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 glass-card p-8 rounded-3xl flex flex-col justify-center items-center text-center bg-primary-500/10 border-primary-500/30 shadow-xl"
          >
            <TerminalSquare className="text-primary-400 mb-6" size={48} />
            <div className="text-xl font-black text-white mb-4 tracking-tight">GitHub Portfolio</div>
            <a href="https://github.com/Aman-28-tech" target="_blank" rel="noreferrer" className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full text-sm font-black transition-all hover:scale-105 uppercase">
              Browse Projects
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
