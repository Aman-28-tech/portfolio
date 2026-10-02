import { useEffect, useRef } from "react";

/* One shared IntersectionObserver for every reveal on the page —
   no per-element observers, no scroll listeners, no re-renders. */
let sharedObserver = null;
const pending = new Map();

function getSharedObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver.unobserve(entry.target);
          pending.delete(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );
  return sharedObserver;
}

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    const io = getSharedObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }
    pending.set(el, true);
    io.observe(el);
    return () => {
      io.unobserve(el);
      pending.delete(el);
    };
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, lede, align = "left" }) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3 justify-start" style={align === "center" ? { justifyContent: "center" } : undefined}>
          <span className="label-line inline-block h-px w-8 bg-sky-400/60" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-tight font-bold text-white">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={160}>
          <p className="mt-4 text-[15px] leading-relaxed text-[#9aa3b2] max-w-2xl">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function ArchitectureDiagram({ steps, accent = false }) {
  return (
    <div
      className="flex flex-wrap items-center gap-y-2"
      role="list"
      aria-label="Architecture flow"
    >
      {steps.map((s, i) => (
        <span key={s + i} role="listitem" className="flex items-center">
          <code
            className={`font-mono2 rounded-md border px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] uppercase whitespace-nowrap ${
              i === 0 || accent
                ? "border-sky-400/30 bg-sky-400/10 text-sky-200"
                : "border-white/10 bg-white/[0.03] text-[#aeb6c2]"
            }`}
          >
            {s}
          </code>
          {i < steps.length - 1 && (
            <svg width="26" height="10" viewBox="0 0 26 10" className="mx-1 shrink-0" aria-hidden="true">
              <line x1="0" y1="5" x2="22" y2="5" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2" className="flow-dash" />
              <path d="M20 2 L24 5 L20 8" fill="none" stroke="rgba(56,189,248,0.7)" strokeWidth="1.2" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
