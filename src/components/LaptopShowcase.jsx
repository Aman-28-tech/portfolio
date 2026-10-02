import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/portfolio";
import { ArchitectureDiagram, Reveal } from "./ui";
import { OpsAgentScreen, GraphRAGScreen, SkybridgeScreen } from "./screens";

const FALLBACK = {
  opsagent: OpsAgentScreen,
  graphrag: GraphRAGScreen,
  skybridge: SkybridgeScreen,
};

const AUTOPLAY_MS = 6000;

export default function LaptopShowcase() {
  const [pos, setPos] = useState({ p: 0, s: 0 });
  const [playing, setPlaying] = useState(
    () => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [failed, setFailed] = useState({});
  const [leaving, setLeaving] = useState(null); // exiting shot, retained briefly for a true crossfade
  const tabRefs = useRef([]);
  const touchX = useRef(null);
  const hoverRef = useRef(false);
  const inViewRef = useRef(true);
  const posRef = useRef(pos);
  const leaveTimer = useRef(null);
  const leaveToken = useRef(0);
  const stageWrapRef = useRef(null);
  const laptopRef = useRef(null);
  const screenRef = useRef(null);
  const tiltRaf = useRef(0);
  const tiltOK = useRef(false);

  const project = PROJECTS[pos.p];
  const slides = project.slides;
  const Fallback = FALLBACK[project.id];
  const chromeApp = project.chrome || project.name;
  const slide = slides[pos.s];
  const slideKey = `${pos.p}-${pos.s}`;

  const pause = useCallback(() => setPlaying(false), []);

  /* Single navigation funnel: every pos change flows through here. */
  const go = useCallback((np, ns) => {
    const cur = posRef.current;
    np = ((np % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    const n = PROJECTS[np].slides.length;
    ns = ((ns % n) + n) % n;
    if (cur.p === np && cur.s === ns) return;
    const out = PROJECTS[cur.p].slides[cur.s];
    if (out) {
      setLeaving({ src: out.src, alt: `${PROJECTS[cur.p].name} — ${out.caption}` });
      clearTimeout(leaveTimer.current);
      const token = ++leaveToken.current;
      leaveTimer.current = setTimeout(() => {
        if (leaveToken.current === token) setLeaving(null);
      }, 450);
    }
    posRef.current = { p: np, s: ns };
    setPos({ p: np, s: ns });
  }, []);

  const next = useCallback(() => {
    const { p, s } = posRef.current;
    const n = PROJECTS[p].slides.length;
    if (s + 1 < n) go(p, s + 1);
    else go(p + 1, 0);
  }, [go]);

  const prev = useCallback(() => {
    const { p, s } = posRef.current;
    if (s > 0) go(p, s - 1);
    else {
      const pp = (p - 1 + PROJECTS.length) % PROJECTS.length;
      go(pp, PROJECTS[pp].slides.length - 1);
    }
  }, [go]);

  const selectProject = useCallback((i) => {
    pause();
    go(i, 0);
  }, [go, pause]);

  /* One slideshow controller: steady cadence, created only while playing. */
  const goRef = useRef(go);
  useEffect(() => { goRef.current = go; });
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (document.hidden || hoverRef.current || !inViewRef.current) return;
      const { p, s } = posRef.current;
      const n = PROJECTS[p].slides.length;
      if (s + 1 < n) goRef.current(p, s + 1);
      else goRef.current(p + 1, 0);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [playing]);

  /* Visibility awareness: no CPU spent while the showcase is offscreen. */
  useEffect(() => {
    const el = stageWrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => {
    clearTimeout(leaveTimer.current);
    cancelAnimationFrame(tiltRaf.current);
  }, []);

  /* Subtle hover depth: transform-only, desktop fine-pointer only, never layout. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tiltOK.current = fine && !reduced;
  }, []);

  const onTiltMove = (e) => {
    if (!tiltOK.current || !laptopRef.current) return;
    if (tiltRaf.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRaf.current = requestAnimationFrame(() => {
      tiltRaf.current = 0;
      const el = laptopRef.current;
      const scr = screenRef.current;
      if (!el) return;
      el.style.transition = "transform 0.15s ease-out";
      el.style.transform = `perspective(1400px) rotateX(${(-py * 1.5).toFixed(2)}deg) rotateY(${(px * 1.5).toFixed(2)}deg) translateY(-2px)`;
      if (scr) scr.style.setProperty("--rx", `${Math.round((px + 0.5) * 100)}%`);
    });
  };

  const onTiltLeave = () => {
    hoverRef.current = false;
    if (tiltRaf.current) { cancelAnimationFrame(tiltRaf.current); tiltRaf.current = 0; }
    const el = laptopRef.current;
    const scr = screenRef.current;
    if (el && tiltOK.current) {
      el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
    if (scr) scr.style.setProperty("--rx", "30%");
  };

  const onStageKey = (e) => {
    if (e.target !== e.currentTarget) return; // never hijack controls or scrolling
    if (e.key === "ArrowRight") { e.preventDefault(); pause(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); pause(); prev(); }
    else if (e.key === " ") { e.preventDefault(); setPlaying((v) => !v); }
  };

  const onTabKey = (e, i) => {
    let n = null;
    if (e.key === "ArrowRight") n = (i + 1) % PROJECTS.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + PROJECTS.length) % PROJECTS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = PROJECTS.length - 1;
    if (n !== null) {
      e.preventDefault();
      selectProject(n);
      tabRefs.current[n]?.focus();
    }
  };

  const markFailed = (src) => setFailed((f) => ({ ...f, [src]: true }));
  const [loaded, setLoaded] = useState({});
  const markLoaded = (src) => setLoaded((l) => (l[src] ? l : { ...l, [src]: true }));
  const screenFailed = failed[slides[pos.s]?.src];

  // flat list position for dots (every screenshot across projects)
  const allSlides = PROJECTS.flatMap((p, pi) => p.slides.map((_, si) => ({ p: pi, s: si })));
  const globalIndex = PROJECTS.slice(0, pos.p).reduce((a, p) => a + p.slides.length, 0) + pos.s;

  return (
    <section id="work" aria-labelledby="work-title" className="relative mx-auto max-w-6xl px-5 pt-20 sm:px-8">
      <Reveal>
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title" className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.05]">
          The systems, running.
        </h2>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#9aa3b2]">
          Real screenshots from the repositories — presented as a product demo. The slideshow plays on its own;
          touch it and it&apos;s yours to drive.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div
          ref={stageWrapRef}
          className="relative mt-8"
          onMouseEnter={() => { hoverRef.current = true; }}
          onMouseLeave={onTiltLeave}
          onMouseMove={onTiltMove}
        >
          {/* subtle ambient separation so the laptop sits inside the dark canvas */}
          <div className="absolute -inset-x-6 -top-10 bottom-16 rounded-[40px] bg-sky-500/[0.05] blur-[90px]" aria-hidden="true" />

          {/* technical micro-detail strip — always matches the active project */}
          <div className="relative mx-auto mb-4 flex max-w-[820px] items-center justify-between px-8 font-mono2 text-[10px] tracking-[0.18em] text-[#5d6675] sm:px-12" aria-live="polite">
            <p key={`meta-${pos.p}`} className="chrome-fade flex items-center gap-2">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
              PROJECT {project.index} · {project.status}
            </p>
            <p className="hidden sm:block">SCREEN {String(pos.s + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")} · DEMO</p>
          </div>

          <button type="button" onClick={() => { pause(); prev(); }} aria-label="Previous slide"
            className="absolute left-0 top-[42%] z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-600 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-105 hover:bg-sky-50 hover:text-slate-900 active:scale-95 sm:-left-2 lg:-left-14 lg:h-12 lg:w-12">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 4L6 9l5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={() => { pause(); next(); }} aria-label="Next slide"
            className="absolute right-0 top-[42%] z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-600 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-105 hover:bg-sky-50 hover:text-slate-900 active:scale-95 sm:-right-2 lg:-right-14 lg:h-12 lg:w-12">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M7 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* ===== LAPTOP — shell stays stable, only screen content animates ===== */}
          <div ref={laptopRef} className="laptop-rise relative mx-auto w-full max-w-[820px] px-8 will-change-transform sm:px-12">
            {/* lid */}
            <div className="relative rounded-[20px] bg-[#0b0e13] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:rounded-[22px] sm:p-[12px]">
              {/* camera notch */}
              <div className="absolute left-1/2 top-[10px] z-20 h-[7px] w-[110px] -translate-x-1/2 rounded-b-[8px] bg-[#0b0e13] sm:top-[12px]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/10" aria-hidden="true" />

              <div className="relative overflow-hidden rounded-[12px] bg-black sm:rounded-[13px]">
                {/* browser chrome — project-aware, crossfades with the slide */}
                <div className="relative flex items-center bg-[#e9edf2] px-4 py-2.5">
                  <span className="flex shrink-0 items-center gap-[7px]" aria-hidden="true">
                    <i className="block h-[11px] w-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
                    <i className="block h-[11px] w-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
                    <i className="block h-[11px] w-[11px] rounded-full bg-[#28c840] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
                  </span>
                  <p key={slideKey} className="chrome-fade mx-auto truncate text-[13px] font-medium tracking-wide text-[#64748b]">
                    {chromeApp} — {slide?.title || ""}
                  </p>
                  <span className="flex w-[52px] shrink-0 items-center justify-end gap-1.5 font-mono2 text-[9px] tracking-[0.12em] text-[#94a3b8]" aria-hidden="true">
                    <i className="pulse-dot block h-1.5 w-1.5 rounded-full bg-sky-400" />
                    DEMO
                  </span>
                </div>

                {/* screen viewport — fixed 16:10 display; screenshots fit inside it only */}
                <div
                  ref={screenRef}
                  className="relative aspect-[16/10] w-full touch-pan-y overflow-hidden bg-[#080b14] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400"
                  role="group"
                  tabIndex={0}
                  aria-roledescription="slideshow"
                  aria-label={`${project.name} screenshots, slide ${pos.s + 1} of ${slides.length}. Arrow keys navigate, space toggles autoplay.`}
                  onKeyDown={onStageKey}
                  onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                  onTouchEnd={(e) => {
                    if (touchX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchX.current;
                    touchX.current = null;
                    if (Math.abs(dx) > 48) { pause(); if (dx < 0) next(); else prev(); }
                  }}
                  onClick={() => pause()}
                >
                  {screenFailed || !slides[pos.s] ? (
                    <div className="absolute inset-0"><Fallback /></div>
                  ) : (
                    <>
                      {!loaded[slides[pos.s].src] && (
                        <div className="absolute inset-0 grid place-items-center bg-[#080b14]" aria-hidden="true">
                          <p className="font-mono2 animate-pulse text-[10px] tracking-[0.22em] text-slate-500">LOADING VIEW…</p>
                        </div>
                      )}
                      {leaving && !failed[leaving.src] && leaving.src !== slides[pos.s].src && (
                        <img
                          key={"out-" + leaving.src}
                          src={leaving.src}
                          alt=""
                          aria-hidden
                          decoding="async"
                          draggable={false}
                          onError={() => markFailed(leaving.src)}
                          className="leave-fade absolute inset-0 z-10 h-full w-full object-contain object-center"
                        />
                      )}
                      {[pos.s, (pos.s + 1) % slides.length].map((i, k) =>
                        failed[slides[i].src] ? null : (
                          <img
                            key={slides[i].src}
                            src={slides[i].src}
                            alt={k === 0 ? `${project.name} — ${slides[i].caption}` : ""}
                            aria-hidden={k !== 0}
                            loading={k === 0 ? "eager" : "lazy"}
                            fetchPriority={k === 0 ? "high" : "auto"}
                            decoding="async"
                            draggable={false}
                            onLoad={() => markLoaded(slides[i].src)}
                            onError={() => markFailed(slides[i].src)}
                            className={`absolute inset-0 h-full w-full select-none object-contain object-center ${
                              k === 0 ? (loaded[slides[i].src] ? "enter-fade" : "opacity-0") : "opacity-0"
                            }`}
                          />
                        )
                      )}
                    </>
                  )}
                  {/* extremely subtle screen reflection — follows hover, never hurts readability */}
                  <div className="screen-glare pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* base — slim silver deck */}
            <div className="relative mx-auto -mt-px w-[108%] -translate-x-[3.7%]" aria-hidden="true">
              <div className="relative h-[13px] rounded-b-[14px] rounded-t-[3px] bg-gradient-to-b from-[#f8fafc] via-[#cbd5e1] to-[#94a3b8] shadow-[0_20px_45px_rgba(0,0,0,0.45)] sm:h-[15px]">
                <div className="absolute inset-x-8 top-0 h-px bg-white/90" />
                <div className="absolute left-1/2 top-0 h-[6px] w-[12%] -translate-x-1/2 rounded-b-[8px] bg-[#7d8aa0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />
                <div className="absolute bottom-[4px] left-[5%] h-[2px] w-[5%] rounded-full bg-[#334155]/70" />
                <div className="absolute bottom-[4px] right-[5%] h-[2px] w-[5%] rounded-full bg-[#334155]/70" />
              </div>
              <div className="mx-auto mt-2 h-[14px] w-[88%] rounded-[50%] bg-black/70 blur-[14px]" />
            </div>

            {/* dots — active dot smoothly expands */}
            <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="All slides">
              {allSlides.map((t, g) => (
                <button
                  key={g}
                  role="tab"
                  aria-selected={g === globalIndex}
                  aria-label={`Go to ${PROJECTS[t.p].name} slide ${t.s + 1}`}
                  onClick={() => go(t.p, t.s)}
                  className={`h-[8px] rounded-full transition-[width,background-color] duration-300 ease-out active:scale-95 ${
                    g === globalIndex ? "w-7 bg-sky-400" : "w-[8px] bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* slide indicator — PROJECT 05/05 TITLE, updates with the active screenshot */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <p key={slideKey} className="chrome-fade font-mono2 text-center text-[11px] tracking-[0.08em] text-[#9aa3b2]" aria-live="polite">
                <span className="font-semibold text-white">{project.name}</span>
                <span className="tnum mx-2 text-white/30">{String(pos.s + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}</span>
                <span className="text-sky-200/90">{(slide?.title || "").toUpperCase()}</span>
              </p>
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-pressed={playing}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono2 text-[10px] tracking-[0.12em] text-white transition-all duration-200 hover:-translate-y-px hover:border-white/25 active:translate-y-0"
              >
                {playing ? "PAUSE" : "PLAY"}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[12px] text-[#5d6675]">{slide?.caption}</p>
          </div>
        </div>
      </Reveal>

      {/* project selector — 01/02/03, selected is obvious */}
      <Reveal delay={80}>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-2 sm:grid-cols-3" role="tablist" aria-label="Projects">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              aria-selected={i === pos.p}
              tabIndex={i === pos.p ? 0 : -1}
              onClick={() => selectProject(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`group rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                i === pos.p
                  ? "border-sky-400/30 bg-white/[0.05] shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                  : "border-white/[0.07] bg-transparent hover:border-white/15 hover:bg-white/[0.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
              }`}
            >
              <p className="flex items-baseline gap-2">
                <span className={`font-mono2 text-[10px] tracking-[0.18em] transition-colors ${i === pos.p ? "text-sky-300" : "text-[#5d6675] group-hover:text-[#8b94a3]"}`}>{p.index}</span>
                <span className={`font-display text-[14px] font-bold tracking-tight ${i === pos.p ? "text-white" : "text-[#aeb6c2]"}`}>{p.name}</span>
                {i === pos.p && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />}
              </p>
              <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#7d8590]">{p.tagline}</p>
            </button>
          ))}
        </div>
      </Reveal>

      {/* project information — coordinated fade per project */}
      <div key={project.id} className="info-enter mx-auto mt-6 grid max-w-4xl gap-5 lg:grid-cols-[1fr_300px]">
        <div className="panel rounded-2xl p-6 sm:p-7">
          <p className="font-mono2 text-[10.5px] tracking-[0.2em] text-[#7d8590]">PROJECT {project.index} · {project.status}</p>
          <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-white">{project.name}</h3>
          <p className="mt-1 text-[13.5px] font-medium text-[#aeb6c2]">{project.tagline}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#c7cdd6]">{project.overview}</p>

          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Themes and technologies">
            {[...project.tags, ...project.stack.slice(0, 6)].map((t) => (
              <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono2 text-[10.5px] text-[#9aa3b2]">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#cases" className="rounded-xl bg-white px-5 py-2.5 text-[13.5px] font-semibold text-black transition-all duration-200 hover:-translate-y-px hover:bg-sky-200 active:translate-y-0 active:scale-[0.98]">
              View Case Study ↓
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:border-white/25 hover:bg-white/[0.05] active:translate-y-0">
              GitHub ↗
            </a>
          </div>

          <div className="mt-6 grid gap-5 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
            <div>
              <p className="mono-label mb-2 text-sky-300/90">Architecture</p>
              <p className="text-[13px] leading-relaxed text-[#aeb6c2]">{project.architecture}</p>
            </div>
            <div>
              <p className="mono-label mb-2 text-sky-300/90">Engineering</p>
              <p className="text-[13px] leading-relaxed text-[#aeb6c2]">{project.engineering}</p>
            </div>
          </div>

          <div className="mt-5 border-l-2 border-emerald-400/50 pl-4">
            <p className="mono-label mb-1 text-emerald-300/90">Result</p>
            <p className="text-[13.5px] leading-relaxed text-[#dfe3e8]">{project.results}</p>
          </div>
          {project.disclaimer && (
            <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/[0.05] px-3 py-2 font-mono2 text-[11px] leading-relaxed text-amber-200/90">
              <span className="mr-2 rounded bg-amber-300/15 px-1.5 py-0.5 text-[9.5px] tracking-[0.1em]">LOCAL VALIDATION</span>
              {project.disclaimer}
            </p>
          )}

          <div className="mt-6 border-t border-white/[0.07] pt-5">
            <ArchitectureDiagram steps={project.pipeline} />
          </div>
        </div>

        <aside className="panel-deep h-fit rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24" aria-label={`${project.name} metrics`}>
          <p className="mono-label text-[#7d8590]">Measured output</p>
          <dl className="mt-4 space-y-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                <dt className="text-[11.5px] text-[#7d8590]">{m.label}</dt>
                <dd className="font-display tnum mt-0.5 text-[1.55rem] font-bold leading-none tracking-tight text-white">{m.value}</dd>
              </div>
            ))}
          </dl>
          {project.quality.length > 0 && (
            <p className="mt-4 border-t border-white/[0.06] pt-3 text-[12px] text-[#9aa3b2]">
              <span className="mono-label block text-[#5d6675]">Gated on</span>
              <span className="mt-1 block text-sky-200/90">{project.quality.join(" · ")}</span>
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
