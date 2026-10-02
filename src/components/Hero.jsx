import { PROFILE, LEETCODE } from "../data/portfolio";
import { Reveal } from "./ui";

const NODES = [
  { id: "REQUEST", x: 8, y: 12, w: 78 },
  { id: "AGENT", x: 62, y: 6, w: 70, hot: true },
  { id: "RETRIEVAL", x: 8, y: 38, w: 86 },
  { id: "SERVICE", x: 60, y: 34, w: 76 },
  { id: "DATABASE", x: 8, y: 63, w: 84 },
  { id: "CLOUD", x: 60, y: 60, w: 68 },
  { id: "OBSERVABILITY", x: 26, y: 84, w: 118 },
];

const EDGES = [
  "M86,22 C120,22 110,40 140,44",
  "M94,48 C120,48 110,66 140,70",
  "M92,73 C120,73 120,50 140,44",
  "M140,16 C160,16 165,40 150,60",
  "M85,92 C120,92 150,88 175,72",
];

function EngineeringVisual() {
  return (
    <div
      className="panel noise relative overflow-hidden rounded-2xl bg-[#0b1219]"
      role="img"
      aria-label="Abstract software architecture visualization connecting request, agent, retrieval, service, database, cloud and observability"
    >
      <div className="bg-grid-technical absolute inset-0 opacity-70 mask-fade-b" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" aria-hidden="true" />

      <div className="relative flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono2 text-[10px] tracking-[0.18em] text-[#7d8590]">ARCH · REFERENCE DIAGRAM</p>
        <p className="flex items-center gap-1.5 font-mono2 text-[10px] text-sky-300/90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
          ILLUSTRATION
        </p>
      </div>

      <div className="relative px-4 pb-3 pt-4">
        <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full px-4" aria-hidden="true">
          {EDGES.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth="1" className="flow-dash" />
          ))}
        </svg>
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-4">
          {NODES.map((n) => (
            <div
              key={n.id}
              className={`rounded-lg border px-2.5 py-2 backdrop-blur-sm transition-colors ${
                n.hot
                  ? "border-sky-400/40 bg-sky-400/[0.09]"
                  : "border-white/10 bg-[#11151c]/90"
              }`}
              style={{ maxWidth: n.w }}
            >
              <p className="font-mono2 text-[9px] tracking-[0.16em] text-[#8b94a3]">{n.id}</p>
              <div className="mt-1.5 flex items-center gap-1" aria-hidden="true">
                <span className={`h-1 w-6 rounded-full ${n.hot ? "bg-sky-400" : "bg-white/15"}`} />
                <span className="h-1 w-3 rounded-full bg-white/10" />
                {n.hot && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sky-300" />}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-3">
          {[
            ["nodes", "7 · langgraph"],
            ["services", "9 · fastapi"],
            ["evals", "pr-gated"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/[0.03] px-2.5 py-2">
              <p className="font-mono2 text-[9px] uppercase tracking-[0.16em] text-[#6d7684]">{k}</p>
              <p className="font-mono2 mt-0.5 text-[12px] text-sky-200">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-32">
      <div className="bg-grid-technical mask-fade-radial absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute left-1/2 top-[-220px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-500/[0.05] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="eyebrow">Amandeep · AI Engineering • Backend • Cloud</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-5 text-[2.6rem] leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.2rem] font-bold">
              {PROFILE.headlineA}
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 bg-clip-text text-transparent">
                {PROFILE.headlineB}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-[#aeb6c2]">{PROFILE.sub}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono2 text-[11px] tracking-[0.14em] text-[#7d8590] uppercase">
              <span>NIT Jalandhar</span>
              <span aria-hidden="true" className="text-sky-400/70">·</span>
              <span>B.Tech</span>
              <span aria-hidden="true" className="text-sky-400/70">·</span>
              <span>2027</span>
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-sky-200 active:scale-[0.98]"
              >
                Explore my work
              </a>
              <a
                href="#resume"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.06] active:scale-[0.98]"
              >
                View resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-6 flex items-center gap-5 text-[13px] font-mono2">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-[#8b94a3] underline decoration-white/15 underline-offset-4 hover:text-sky-300">GitHub ↗</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-[#8b94a3] underline decoration-white/15 underline-offset-4 hover:text-sky-300">LinkedIn ↗</a>
              <a href={LEETCODE.url} target="_blank" rel="noreferrer" className="text-[#8b94a3] underline decoration-white/15 underline-offset-4 hover:text-sky-300">LeetCode ↗</a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="panel mt-8 max-w-md rounded-xl p-4 font-mono2 text-[12px] leading-relaxed" role="region" aria-label="Terminal introduction">
              <p><span className="text-sky-300">$</span> <span className="text-white">whoami</span></p>
              <p className="mt-1 text-[#c7cdd6]">Amandeep</p>
              <p className="text-[#7d8590]">AI / Backend / Cloud Engineer</p>
              <p className="mt-3"><span className="text-sky-300">$</span> <span className="text-white">build --production</span><span className="blink ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-sky-300" aria-hidden="true" /></p>
              <p className="text-[#7d8590]">AI systems · Distributed services · Cloud infrastructure</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="w-full">
          <EngineeringVisual />
          <p className="mt-3 text-center font-mono2 text-[10.5px] tracking-[0.18em] text-[#5d6675] uppercase">
            Abstract system map — illustration only
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-4 border-t border-white/[0.07] pt-6">
            <p className="font-mono2 text-[11px] tracking-[0.28em] text-[#7d8590]">SELECTED WORK</p>
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" aria-hidden="true" />
            <p className="hidden font-mono2 text-[11px] text-[#5d6675] sm:block">03 SYSTEMS · SCROLL TO INSPECT ↓</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
