import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { EXPERIENCE } from '../data.js';
import TiltCard from '../components/TiltCard';

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start justify-between">
          
          {/* Left Title Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] xl:w-[40%] sticky top-32 flex-shrink-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Journey
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
              Professional <span className="text-gradient block mt-2">Experience</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Bridging engineering theory with industrial application through technical internships and practical quality analysis.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <div className="w-full lg:w-[50%] xl:w-[55%] space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <TiltCard key={index} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-primary-500/30 transition-all shadow-2xl overflow-hidden"
                >
                  {/* Visual Accent */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-500 to-accent-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-md bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-wider border border-primary-500/20">
                        Internship
                      </span>
                      <div className="h-px w-8 bg-white/10"></div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <Calendar size={12} /> {exp.date}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight group-hover:text-primary-400 transition-colors">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="text-xl font-bold text-gray-300 italic">{exp.company}</div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <MapPin size={14} className="text-primary-500" /> {exp.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {exp.points.map((point, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                        className="flex gap-4 items-start group/item"
                      >
                        <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20 group-hover/item:bg-primary-500 group-hover/item:border-primary-500 transition-all duration-300">
                          <CheckCircle2 size={12} className="text-primary-500 group-hover/item:text-white transition-colors" />
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed group-hover/item:text-gray-200 transition-colors">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-all"></div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
