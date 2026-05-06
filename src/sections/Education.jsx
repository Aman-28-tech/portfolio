import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { EDUCATION } from '../data.js';

const Education = () => {
  const item = EDUCATION[0];

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Education
          </h2>
          <div className="h-1.5 w-24 bg-primary-500 mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-[3rem] p-12 md:p-16 relative overflow-hidden group border border-white/10 shadow-2xl max-w-4xl w-full"
          >
            {/* Corner Icon Decor */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
              <GraduationCap size={160} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 mb-10">
                <span className="text-xs font-black uppercase tracking-widest">{item.focus}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-primary-400 transition-colors">
                {item.degree}
              </h3>
              
              <div className="text-2xl font-bold text-gray-300 mb-10">{item.institution}</div>

              <div className="flex flex-wrap gap-10 mb-12 text-gray-500 font-bold text-sm uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-500" /> {item.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent-500" /> {item.location}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {item.points.map((point, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                    <div className="mt-1.5 p-1 bg-primary-500/20 rounded-full">
                      <BookOpen size={14} className="text-primary-400" />
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
