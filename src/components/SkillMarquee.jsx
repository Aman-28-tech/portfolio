import React from 'react';
import { SKILLS } from '../data.js';

const SkillMarquee = () => {
  const allSkills = SKILLS.flatMap(group => group.items);
  
  return (
    <div className="w-full relative py-24 flex overflow-hidden border-y border-white/5 bg-white/[0.01]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
      
      <div className="flex animate-scroll gap-6 w-max px-6">
        {[...allSkills, ...allSkills, ...allSkills].map((skill, index) => (
          <div 
            key={index} 
            className="animate-wave px-10 py-5 glass rounded-[2rem] text-3xl font-black text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all whitespace-nowrap shadow-xl"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMarquee;
