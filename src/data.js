import { 
  Code2, 
  Database, 
  Terminal, 
  Layout, 
  Server, 
  Cpu, 
  BrainCircuit,
  Globe
} from "lucide-react";

export const USER_INFO = {
  name: "Amandeep",
  role: "Full-Stack & Systems Developer",
  email: "amandeepkl758@gmail.com",
  phone: "+91 9988506106",
  socials: {
    github: "https://github.com/Aman-28-tech",
    linkedin: "https://www.linkedin.com/in/aman-deep-151aba335/",
    leetcode: "https://leetcode.com/u/montykl007/"
  },
  about: "A systems-focused developer with a passion for full-stack engineering and applied machine learning. I specialize in building scalable web applications, real-time systems, and efficient low-level architectures."
};

export const STATS = [
  { value: "270+", label: "LeetCode Problems" },
  { value: "1500+", label: "Contest Rating" },
  { value: "5+", label: "Major Projects" },
  { value: "100+", label: "Days Coding Streak" }
];

export const EXPERIENCE = [
  {
    title: "Quality Inspection Intern — Data Analysis",
    company: "Spinks Softech Pvt. Ltd.",
    date: "Jun 2025 – Jul 2025",
    location: "On-site, Manesar",
    points: [
      "Analyzed manufacturing inspection datasets to identify recurring defect patterns and process inconsistencies.",
      "Organized and cleaned raw operational data into structured datasets using Excel for efficient tracking and reporting.",
      "Performed data-driven analysis to derive actionable insights supporting quality optimization and workflow improvements.",
      "Collaborated with inspection teams to improve process visibility and reduce inconsistencies in manual quality checks."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in Industrial & Production Engineering",
    institution: "National Institute of Technology, Jalandhar",
    date: "Aug 2023 - Aug 2027",
    location: "Jalandhar, India",
    focus: "Formal Education",
    points: [
      "Core coursework in Data Structures & Algorithms, Object-Oriented Programming, and DBMS.",
      "Active competitive programmer with strong problem-solving fundamentals."
    ]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Coagulopathy Cracker",
    description: "An end-to-end machine learning pipeline for preoperative bleeding risk prediction using 5M synthetic patient records.",
    tags: ["LightGBM", "SHAP", "Qwen LLM", "Python"],
    github: "https://github.com/Aman-28-tech/Coagulopathy-Cracker-Bleeding-Risk-Predictor.git",
    live: null
  },
  {
    id: 2,
    title: "LogSight",
    description: "A real-time log monitoring system using MERN stack and Socket.io for live ingestion, anomaly detection, and SaaS subscription.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/Aman-28-tech",
    live: "https://log-sight-saa-s.vercel.app/"
  },
  {
    id: 3,
    title: "Resumind",
    description: "An AI-powered resume analysis platform to evaluate resumes against job descriptions using external AI APIs and Puter.js.",
    tags: ["React", "AI APIs", "React Router", "Vercel"],
    github: "https://github.com/Aman-28-tech",
    live: "https://ai-resume-analyzer-two-lilac.vercel.app"
  },
  {
    id: 4,
    title: "C++ HTTP Web Server",
    description: "A custom HTTP web server from scratch using C++ and Linux socket programming, featuring a multi-threaded architecture.",
    tags: ["C++", "Linux Sockets", "Multi-threading"],
    github: "https://github.com/Aman-28-tech/CPP-Http-web-server-Single-thread-for-Linux.git",
    live: null
  },
  {
    id: 5,
    title: "Wanderlust",
    description: "A full-stack rental platform using MVC architecture for listing properties with a review & rating system.",
    tags: ["Node.js", "MongoDB", "Express", "MVC"],
    github: "https://github.com/Aman-28-tech",
    live: "https://wanderlust-n5vu.vercel.app"
  }
];

export const SKILLS = [
  { category: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"], icon: Layout },
  { category: "Backend", items: ["Node.js", "Express.js", "C++ Sockets"], icon: Server },
  { category: "Languages", items: ["C++", "JavaScript", "Python", "Java"], icon: Code2 },
  { category: "Database", items: ["MongoDB", "SQL"], icon: Database },
  { category: "Machine Learning", items: ["LightGBM", "Feature Engineering", "SHAP"], icon: BrainCircuit },
  { category: "Tools & Systems", items: ["Linux", "Git", "Vercel", "REST APIs"], icon: Terminal }
];
