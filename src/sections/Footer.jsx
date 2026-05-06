import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/Icons';
import { USER_INFO } from '../data.js';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gradient mb-2">{USER_INFO.name}</h3>
            <p className="text-gray-400">{USER_INFO.role}</p>
          </div>
          
          <div className="flex gap-6">
            <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href={USER_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${USER_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm border-t border-white/10 pt-8 mt-8">
          <p>
            &copy; {new Date().getFullYear()} {USER_INFO.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-accent-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
