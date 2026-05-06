import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '../data.js';

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Title Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
              Industry <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed font-medium">
              Bridging engineering theory with industrial application through technical internships and practical quality analysis.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <div className="lg:col-span-8 space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass-card rounded-[2.5rem] p-10 md:p-14 border border-white/5 hover:border-primary-500/30 transition-all shadow-2xl overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-primary-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">{exp.title}</h3>
                    <div className="text-xl font-bold text-primary-400">{exp.company}</div>
                  </div>
                  <div className="flex flex-col items-start md:items-end text-sm font-bold uppercase tracking-widest text-gray-500 gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} /> {exp.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} /> {exp.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {exp.points.map((point, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <CheckCircle2 size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
