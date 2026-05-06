import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Layers, Cpu, Database, Activity } from 'lucide-react';
import { GithubIcon as Github } from '../components/Icons';
import { PROJECTS } from '../data.js';
import TiltCard from '../components/TiltCard';

const CoreProjectCard = ({ project, index }) => {
  const structures = {
    1: { // Coagulopathy Cracker
      architecture: "Pipeline: Data Ingestion → Feature Engineering → LightGBM → SHAP → Qwen LLM",
      files: "├── models/lightgbm_model.py\n├── processing/feature_eng.py\n├── analysis/shap_explainer.py\n└── api/llm_report.py",
      stat: "5M+ Synthetic Records",
      color: "from-blue-500/20 to-transparent"
    },
    2: { // LogSight
      architecture: "Real-time: Socket Stream → Node.js Processor → MongoDB → React Dashboard",
      files: "├── sockets/ingest_stream.js\n├── workers/anomaly_det.js\n└── web/dashboard_live.jsx",
      stat: "Real-time Ingestion",
      color: "from-purple-500/20 to-transparent"
    },
    4: { // C++ HTTP Web Server
      architecture: "Multi-threaded: Socket Init → Listener → Thread Pool → Request Handler",
      files: "├── src/server.cpp\n├── include/thread_pool.h\n└── src/http_parser.cpp",
      stat: "<100ms Latency",
      color: "from-emerald-500/20 to-transparent"
    }
  };

  const struct = structures[project.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 lg:col-span-3 h-full block"
    >
      <TiltCard className="h-full block w-full perspective-1000">
        <div className="group relative glass-card rounded-[2.5rem] overflow-hidden flex flex-col border border-white/10 hover:border-primary-500/50 transition-all duration-700 shadow-2xl h-full w-full">
          <div className={`absolute inset-0 bg-gradient-to-br ${struct.color} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>
          
          <div className="relative z-10 p-10 md:p-14 flex flex-col h-full transform translate-z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-white/5 rounded-3xl text-primary-400 border border-white/10 shadow-xl">
              {project.id === 1 ? <Activity size={32} /> : project.id === 4 ? <Cpu size={32} /> : <Layers size={32} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Core Engineering Project</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                {project.title}
              </h3>
            </div>
          </div>
          
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="p-4 glass rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                <Github size={24} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="p-4 glass bg-primary-500/20 text-primary-400 rounded-2xl hover:bg-primary-500 hover:text-white transition-all border border-primary-500/30">
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow">
          <div className="flex flex-col justify-center">
            <p className="text-gray-300 text-xl leading-relaxed mb-8 font-medium">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-primary-300 font-black uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <div className="p-6 bg-primary-500/5 rounded-2xl border border-primary-500/20">
              <div className="text-xs font-black text-primary-400 uppercase tracking-widest mb-2">Performance Metric</div>
              <div className="text-2xl font-black text-white">{struct.stat}</div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="glass bg-black/60 p-8 rounded-[2rem] border border-white/10">
              <div className="flex items-center gap-3 mb-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                <div className="p-2 bg-primary-500/20 rounded-lg"><Activity size={14} className="text-primary-400" /></div> Systems Architecture
              </div>
              <div className="text-base text-gray-200 font-mono leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 mb-8">
                {struct.architecture}
              </div>
              
              <div className="flex items-center gap-3 mb-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                <div className="p-2 bg-accent-500/20 rounded-lg"><Database size={14} className="text-accent-400" /></div> Structural Overview
              </div>
              <pre className="text-xs text-gray-500 font-mono leading-relaxed p-4 bg-black/20 rounded-xl border border-white/5">
                {struct.files}
              </pre>
            </div>
          </div>
        </div>
      </div>
      </div>
      </TiltCard>
    </motion.div>
  );
};

const SimpleProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="block h-full w-full"
  >
    <TiltCard className="h-full block w-full perspective-1000">
      <div className="group relative glass-card rounded-[2rem] p-8 flex flex-col h-full border border-white/5 hover:border-primary-500/30 transition-all duration-500 w-full">
        <div className="flex justify-between items-start mb-6 transform translate-z-20">
      <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-primary-400 transition-colors">
        <Code2 size={24} />
      </div>
      <div className="flex gap-2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-white transition-colors">
            <Github size={20} />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="p-2 text-primary-500 hover:text-primary-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">{project.title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tags.map(tag => (
        <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 uppercase font-bold tracking-wider">{tag}</span>
      ))}
    </div>
      </div>
    </TiltCard>
  </motion.div>
);

const Projects = () => {
  const coreIds = [1, 2, 4];
  const coreProjects = PROJECTS.filter(p => coreIds.includes(p.id));
  const otherProjects = PROJECTS.filter(p => !coreIds.includes(p.id));

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
            Core <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed font-medium">
            A selection of production-grade systems focused on low-level performance, scalability, and complex data processing.
          </p>
        </motion.div>

        {/* Core Section */}
        <div className="flex flex-col gap-12 mb-32">
          {coreProjects.map((project, index) => (
            <CoreProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Extended Ecosystem</h2>
            <div className="flex-grow h-px bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherProjects.map((project, index) => (
              <SimpleProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {/* LeetCode Special Card */}
            <motion.a
              href="https://leetcode.com/u/montykl007/"
              target="_blank"
              rel="noreferrer"
              className="md:col-span-2 glass-card rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between group hover:border-primary-500/30 transition-all duration-500 overflow-hidden relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-white/5 rounded-3xl text-accent-500 shadow-2xl"><Activity size={48} /></div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Technical Problem Solving</h3>
                  <p className="text-gray-400 text-lg max-w-md font-medium">Extensive experience in algorithmic optimization with 270+ problems solved in **Java**.</p>
                </div>
              </div>
              <div className="relative z-10 text-center md:text-right mt-6 md:mt-0">
                <div className="text-5xl font-black text-primary-400 mb-1">1500+</div>
                <div className="text-gray-600 uppercase font-black text-xs tracking-widest">Global Rating</div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
