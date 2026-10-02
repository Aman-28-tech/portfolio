import { useRef, useState } from "react";
import { PROFILE, BUILD_STEPS, LEETCODE } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function ResumeViewer() {
  const [zoom, setZoom] = useState(100);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(null);
  const src = `${PROFILE.resumeFile}#zoom=${zoom}&toolbar=1`;

  const fullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <section id="resume" aria-labelledby="resume-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading
        eyebrow="Resume"
        title={<span id="resume-title">Full resume, readable in place.</span>}
        lede="The complete engineering profile — readable without leaving the site."
      />
      <Reveal delay={100}>
        <div ref={frameRef} className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1219]">
          <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <div className="mr-auto flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] font-mono2 text-sm font-bold text-white" aria-hidden="true">A</span>
              <div>
                <p className="text-[13.5px] font-semibold text-white">Amandeep — Resume</p>
                <p className="font-mono2 text-[10px] text-[#7d8590]">Updated 2026 · 1 page · PDF</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5" role="group" aria-label="PDF controls">
              <button type="button" onClick={() => { setLoaded(false); setZoom((z) => Math.max(50, z - 25)); }} aria-label="Zoom out" className="h-9 min-w-9 rounded-lg border border-white/10 px-2 text-white transition hover:bg-white/[0.06]">−</button>
              <span className="w-14 text-center font-mono2 text-[11px] text-[#9aa3b2]" aria-live="polite">{zoom}%</span>
              <button type="button" onClick={() => { setLoaded(false); setZoom((z) => Math.min(200, z + 25)); }} aria-label="Zoom in" className="h-9 min-w-9 rounded-lg border border-white/10 px-2 text-white transition hover:bg-white/[0.06]">+</button>
              <button type="button" onClick={fullscreen} aria-label="Toggle fullscreen" className="hidden h-9 rounded-lg border border-white/10 px-3 font-mono2 text-[11px] text-white transition hover:bg-white/[0.06] sm:block">⛶ Full</button>
              <a href={PROFILE.resumeFile} target="_blank" rel="noreferrer" className="hidden h-9 items-center rounded-lg border border-white/10 px-3 font-mono2 text-[11px] text-white transition hover:bg-white/[0.06] sm:flex">Open ↗</a>
              <a href={PROFILE.resumeFile} download="Amandeep_Resume.pdf" className="flex h-9 items-center rounded-lg bg-white px-4 text-[12.5px] font-semibold text-black transition hover:bg-sky-200">Download</a>
            </div>
          </div>
          <div className="bg-[#04080c] p-2 sm:p-5">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white" aria-hidden="true">
                  <div className="h-8 w-2/3 animate-pulse rounded bg-neutral-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-100" />
                  <p className="mt-2 font-mono2 text-[10.5px] tracking-[0.14em] text-neutral-400">LOADING DOCUMENT…</p>
                </div>
              )}
              <iframe
                key={src}
                title="Amandeep resume PDF"
                src={src}
                onLoad={() => setLoaded(true)}
                className="h-[520px] w-full bg-white sm:h-[720px]"
                loading="lazy"
              />
            </div>
          </div>
          <p className="border-t border-white/[0.07] px-5 py-3 text-center text-[12px] text-[#7d8590]">
            View the complete engineering profile.{" "}
            <span className="font-mono2 text-[10.5px] text-[#5d6675]">
              Preview blocked? <a className="text-sky-300 underline underline-offset-2" href={PROFILE.resumeFile} target="_blank" rel="noreferrer">Open ↗</a> or <a className="text-sky-300 underline underline-offset-2" href={PROFILE.resumeFile} download>Download</a>.
            </span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function About() {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <div className="panel noise relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-12">
        <div className="bg-grid-technical absolute inset-0 opacity-40 mask-fade-b" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[300px_1fr]">
          <Reveal>
            <figure className="relative mx-auto w-full max-w-[300px]">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1219]" style={{ aspectRatio: "4 / 5" }}>
                {photoOk ? (
                  <img
                    src={PROFILE.portrait}
                    alt="Amandeep"
                    loading="lazy"
                    decoding="async"
                    onError={() => setPhotoOk(false)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-display text-6xl font-bold text-white/80" aria-hidden="true">A</span>
                )}
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono2 text-[10px] tracking-[0.16em] text-[#5d6675] uppercase">
                <span>Amandeep</span>
                <span>NIT Jalandhar · &apos;27</span>
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal><p className="eyebrow">About</p></Reveal>
            <Reveal delay={80}>
              <h2 id="about-title" className="font-display mt-4 max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                A little about how I build.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-5 max-w-2xl space-y-4 text-[14.5px] leading-relaxed text-[#aeb6c2]">
                <p>
                  I&apos;m Amandeep, an engineer working at the intersection of AI systems, backend platforms,
                  distributed infrastructure, and cloud architecture.
                </p>
                <p>
                  What I enjoy most is taking a complex technical problem — an incident that needs diagnosing,
                  a retrieval pipeline that hallucinates, a stateful migration that can&apos;t afford downtime —
                  and turning it into a working system with clear architecture, measurable behavior, and
                  observable internals.
                </p>
                <p>
                  That means agentic AI workflows with evaluation gates, retrieval systems with claim-level
                  verification, backend services with typed contracts, and control planes that treat safety
                  as a design constraint rather than a follow-up.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <dl className="mt-7 grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
                {[
                  ["Focus", "AI · Backend · Cloud"],
                  ["School", "NIT Jalandhar"],
                  ["Signal", "450+ LeetCode · 1700+"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#5d6675]">{k}</dt>
                    <dd className="mt-1 text-[13.5px] font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      {/* story transition into work */}
      <Reveal delay={100}>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">I learn by building.</p>
          <p className="mt-2 text-[14px] text-[#7d8590]">These are the systems where that thinking becomes concrete.</p>
          <a href="#work" className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-white transition hover:border-white/25" aria-label="Scroll to selected work">↓</a>
        </div>
      </Reveal>
    </section>
  );
}

export function HowBuild() {
  return (
    <section aria-labelledby="build-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading eyebrow="Philosophy" title={<span id="build-title">How I approach engineering.</span>} lede="Every project above is an experiment in systems engineering — same loop, different constraints." />
      <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
        {BUILD_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <li className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
              <p className="font-mono2 text-[11px] text-sky-300">{s.n}</p>
              <p className="font-display mt-2 text-[15px] font-bold text-white">{s.name}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#7d8590]">{s.desc}</p>
              {i < BUILD_STEPS.length - 1 && (
                <span className="absolute right-3 top-5 hidden text-sky-400/50 lg:block" aria-hidden="true">→</span>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={120}>
        <p className="mt-4 text-center font-mono2 text-[11px] tracking-[0.14em] text-[#5d6675] uppercase">
          Understand → Architect → Build → Test → Measure → Ship
        </p>
      </Reveal>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8 sm:pt-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b1219] px-6 py-14 text-center sm:px-12 sm:py-16">
        <div className="bg-grid-technical absolute inset-0 opacity-40 mask-fade-radial" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-white/20" aria-hidden="true" />
        <div className="relative">
          <Reveal><p className="eyebrow flex justify-center">Contact</p></Reveal>
          <Reveal delay={80}>
            <h2 id="contact-title" className="font-display mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Let&apos;s build something <span className="bg-gradient-to-r from-sky-200 to-sky-400 bg-clip-text text-transparent">difficult.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] text-[#9aa3b2]">Interested in AI systems, backend engineering, cloud infrastructure, or ambitious technical products?</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${PROFILE.email}`} className="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-sky-200 active:scale-[0.98]">Email me</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition hover:border-white/25">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition hover:border-white/25">GitHub</a>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <dl className="mx-auto mt-10 grid max-w-3xl gap-2 text-left sm:grid-cols-2">
              {[
                ["Email", PROFILE.email, `mailto:${PROFILE.email}`],
                ["Phone", PROFILE.phone, `tel:${PROFILE.phone.replace(/\s/g, "")}`],
                ["LinkedIn", PROFILE.linkedinLabel, PROFILE.linkedin],
                ["GitHub", PROFILE.githubLabel, PROFILE.github],
              ].map(([k, v, href]) => (
                <div key={k} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/30 px-4 py-3">
                  <dt className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-[#5d6675]">{k}</dt>
                  <dd><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="font-mono2 text-[11.5px] text-sky-200 hover:text-white">{v}</a></dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#04080c]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div>
          <p className="font-display text-[15px] font-bold text-white">Amandeep</p>
          <p className="mt-0.5 font-mono2 text-[10.5px] tracking-[0.14em] text-[#5d6675] uppercase">AI • Backend • Cloud · NIT Jalandhar · 2027</p>
        </div>
        <nav aria-label="Footer" className="flex gap-5 font-mono2 text-[12px] text-[#8b94a3]">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href={LEETCODE.url} target="_blank" rel="noreferrer" className="hover:text-white">LeetCode ↗</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-white">Email</a>
        </nav>
        <p className="font-mono2 text-[11px] text-[#5d6675]">© 2026 Amandeep · Built from architecture to implementation.</p>
      </div>
    </footer>
  );
}
