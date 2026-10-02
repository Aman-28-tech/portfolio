import { useEffect, useState } from "react";
import { PROFILE, LEETCODE } from "../data/portfolio";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Resume", href: "#resume" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Lightweight scroll state: rAF-throttled, updates only on state change. */
  useEffect(() => {
    let raf = 0;
    let current = false;
    const update = () => {
      raf = 0;
      const isScrolled = window.scrollY > 24;
      if (isScrolled !== current) {
        current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
          className={`w-full max-w-6xl flex items-center justify-between gap-3 rounded-2xl border px-3 sm:px-5 transition-all duration-300 ${
            scrolled
              ? "bg-[#071016]/80 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.45)] py-2"
              : "bg-[#071016]/40 backdrop-blur-md border-transparent py-3"
          }`}
      >
        <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="Amandeep home">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-sky-400/40 bg-sky-400/10 font-mono2 text-sm font-semibold text-sky-200">
            A
          </span>
          <span className="font-display font-semibold tracking-tight text-white text-[15px]">Amandeep</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 text-[13.5px] text-[#aeb6c2]">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 transition-colors hover:text-white hover:bg-white/[0.06]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-[13px] font-mono2 text-[#9aa3b2] hover:text-white transition-colors"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-[13px] font-mono2 text-[#9aa3b2] hover:text-white transition-colors"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href={LEETCODE.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-[13px] font-mono2 text-[#9aa3b2] hover:text-white transition-colors"
            aria-label="LeetCode profile"
          >
            LeetCode
          </a>
          <a
            href="#contact"
            className="ml-1 rounded-xl bg-white px-4 py-2 text-[13.5px] font-semibold text-black transition hover:bg-sky-200 active:scale-[0.98]"
          >
            Let&apos;s Connect
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a
            href="#contact"
            className="rounded-xl bg-white px-3.5 py-2 text-[13px] font-semibold text-black"
          >
            Let&apos;s Connect
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-3 top-[68px] z-50 lg:hidden">
          <ul className="rounded-2xl border border-white/10 bg-[#0b1219]/95 backdrop-blur-xl p-2 shadow-2xl">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[14px] text-[#c7cdd6] hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 px-2 pb-2 pt-1">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-center font-mono2 text-[12px] text-sky-200">GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-center font-mono2 text-[12px] text-sky-200">LinkedIn</a>
              <a href={LEETCODE.url} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-center font-mono2 text-[12px] text-sky-200">LeetCode</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
