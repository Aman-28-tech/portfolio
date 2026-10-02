import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LaptopShowcase from "./components/LaptopShowcase";
import { CaseStudies, ExperienceTimeline, Metrics, SkillMatrix, ProblemSolving } from "./components/Sections";
import { ResumeViewer, About, HowBuild, Contact, Footer } from "./components/Closing";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#060b11] text-[#edefF0]">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to work
      </a>

      {/* unified dark engineering canvas — static, extremely subtle */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {/* fine technical grid, masked to fade with depth */}
        <div className="bg-grid-technical absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_90%_65%_at_50%_0%,black_30%,transparent_78%)]" />
        {/* very soft blue atmospheric glow — top only, static */}
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(56,130,190,0.08),transparent_70%)]" />
        {/* faint bottom lift so footer never feels flat black */}
        <div className="absolute inset-x-0 bottom-0 h-[480px] bg-[radial-gradient(ellipse_60%_60%_at_50%_110%,rgba(56,130,190,0.05),transparent_70%)]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <LaptopShowcase />
        <CaseStudies />
        <HowBuild />
        <Metrics />
        <ExperienceTimeline />
        <SkillMatrix />
        <ProblemSolving />
        <ResumeViewer />
        <Contact />
      </main>
      <div className="relative z-10 bg-[#04080c]/60">
        <Footer />
      </div>
    </div>
  );
}
