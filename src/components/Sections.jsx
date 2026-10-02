import { useState } from "react";
import { PROJECTS, EXPERIENCE, METRICS_EDITORIAL, STACK, LEETCODE } from "../data/portfolio";
import { ArchitectureDiagram, Reveal, SectionHeading } from "./ui";

const CASE_DETAIL = {
  opsagent: {
    problem: "Production alerts (OOM, pod crashes, 5xx) need correlation across telemetry, metrics, and Git history — manually slow and error-prone.",
    implementation: "7-node LangGraph workflow on Llama 3.3 70B; RabbitMQ alert pipeline; 9 FastAPI services; 4 scoped MCP servers (K8s, Prometheus, GitHub, Jira); short-lived JWT auth; Prometheus/Grafana + Langfuse tracing.",
    challenges: "Keeping agent output deterministic and auditable; scoping tool access per MCP server; preventing noisy auto-tickets.",
    validation: "LLM evaluation CI gates PRs — 0.968 aggregate (Faithfulness, Answer Relevancy, Context Precision); 44 unit tests; 10 mock incident scenarios.",
  },
  graphrag: {
    problem: "Research Q&A hallucinates when retrieval is shallow and unverified.",
    implementation: "Knowledge Graph traversal + Qdrant vector search + BM25, fused with RRF, reranked with Cross-Encoder; 3-variant query expansion; multi-provider LLM (Llama 3.3 70B, GPT-4o, Claude); Dockerized FastAPI + Streamlit.",
    challenges: "Fusing sparse + dense + graph signals without drowning precision; claim-level grounding that survives paraphrase.",
    validation: "913 chunks → 325 nodes / 1,661 edges; 92% verified, 0.82 mean confidence, 73% keyword hit, 62% benchmark pass; 2–5s answers.",
  },
  skybridge: {
    problem: "Stateful cloud migration needs safe, auditable cutover — not just data copy.",
    implementation: "Go control plane + Temporal workflows; 9-stage state machine (compat → drift → policy → approval → canary → quiesce → transfer → reconcile → audit); WAL → Debezium → Redpanda → CDC Applier with dedup, forward-only checkpoints, RPO lag gating.",
    challenges: "Exactly-once CAS ownership transfer, split-brain prevention, fail-closed canary evaluation under lag.",
    validation: "354 automated tests, 12-scenario failure matrix, 14 Terraform modules. Local validation complete • Real-cloud execution deferred in v1.",
  },
};

const CASE_EVIDENCE = {
  opsagent: { src: "/shots/opsagent/7.Tracing.png", caption: "Langfuse tracing — every diagnosis step is observable" },
  graphrag: { src: "/shots/graphrag/4.eval_dashboard_table.png", caption: "Evaluation table — per-query verification detail" },
  skybridge: { src: "/shots/skybridge/evidence.png", caption: "Evidence view — auditable migration record" },
};

export function CaseStudies() {
  const [open, setOpen] = useState("opsagent");
  const labels = ["Problem", "Implementation", "Engineering challenges"];
  return (
    <section id="cases" aria-labelledby="cases-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading
        eyebrow="Case studies"
        title={<span id="cases-title">How each system was actually built.</span>}
        lede="Problem → architecture → implementation → validation. The laptop shows the product; this is the engineering behind it."
      />
      <div className="mt-8 space-y-3">
        {PROJECTS.map((p, idx) => {
          const d = CASE_DETAIL[p.id];
          const isOpen = open === p.id;
          return (
            <Reveal key={p.id} delay={idx * 60}>
              <article className={`overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${isOpen ? "border-white/20 bg-white/[0.03] shadow-[0_12px_32px_rgba(0,0,0,0.35)]" : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.14] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]"}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : p.id)}
                  aria-expanded={isOpen}
                  aria-controls={`case-${p.id}`}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <span className="font-mono2 text-[11px] tracking-[0.18em] text-[#7d8590]">{p.index}</span>
                  <span className="flex-1">
                    <span className="font-display block text-lg font-bold tracking-tight text-white">{p.name}</span>
                    <span className="mt-0.5 block text-[13px] text-[#7d8590]">{p.tagline}</span>
                  </span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${isOpen ? "border-white/25 text-white" : "border-white/10 text-[#9aa3b2]"}`} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div id={`case-${p.id}`} className="border-t border-white/[0.07] p-5 sm:p-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                      <ol className="divide-y divide-white/[0.06]">
                        {[d.problem, d.implementation, d.challenges].map((text, li) => (
                          <li key={labels[li]} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                            <span className="font-mono2 mt-0.5 shrink-0 text-[10.5px] tracking-[0.14em] text-sky-300/90">0{li + 1}</span>
                            <div>
                              <p className="mono-label text-[#aeb6c2]">{labels[li]}</p>
                              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#8b94a3]">{text}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <div>
                        <div className="border-l-2 border-emerald-400/50 pl-4">
                          <p className="mono-label text-emerald-300/90">Validation · Results</p>
                          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#dfe3e8]">{d.validation}</p>
                        </div>
                        <div className="mt-5">
                          <ArchitectureDiagram steps={p.pipeline} />
                        </div>
                        {CASE_EVIDENCE[p.id] && (
                          <figure className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
                            <img
                              src={CASE_EVIDENCE[p.id].src}
                              alt={`${p.name} — ${CASE_EVIDENCE[p.id].caption}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full object-cover object-top"
                            />
                            <figcaption className="border-t border-white/[0.07] bg-black/30 px-3 py-2 font-mono2 text-[10px] tracking-[0.06em] text-[#7d8590]">
                              {CASE_EVIDENCE[p.id].caption} · <a href={p.github} target="_blank" rel="noreferrer" className="text-sky-300 underline underline-offset-2">source ↗</a>
                            </figcaption>
                          </figure>
                        )}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 8).map((t) => (
                            <span key={t} className="rounded-md border border-white/[0.08] px-2 py-1 font-mono2 text-[10.5px] text-[#9aa3b2]">{t}</span>
                          ))}
                        </div>
                        <a href={p.github} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-lg border border-white/10 px-4 py-2 text-[13px] font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.05]">GitHub ↗</a>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading eyebrow="Experience" title={<span id="exp-title">Where I&apos;ve built.</span>} lede="From product engineering to building systems from the ground up." />
      <ol className="relative mt-10 space-y-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-white/10">
        {EXPERIENCE.map((e, i) => {
          const primary = i === 0;
          return (
          <Reveal key={e.org} delay={i * 80}>
            <li className="relative pl-10">
              <span className="absolute left-0 top-2 grid h-4 w-4 place-items-center" aria-hidden="true">
                <span className={`h-2 w-2 rounded-full ${primary ? "bg-sky-400" : "bg-white/25"}`} />
              </span>
              <article className={`rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] sm:p-7 ${primary ? "panel" : "border-white/[0.07] bg-white/[0.015]"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2.5">
                    <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#7d8590]">{e.index}</span>
                    {primary && (
                      <span className="rounded-full border border-sky-400/25 bg-sky-400/[0.08] px-2.5 py-0.5 font-mono2 text-[9.5px] tracking-[0.12em] text-sky-200">PRIMARY ROLE</span>
                    )}
                  </p>
                  <p className="font-mono2 text-[11px] text-[#7d8590]">{e.date}</p>
                </div>
                <h3 className={`${primary ? "text-xl sm:text-[1.35rem]" : "text-lg"} font-display mt-2 font-bold tracking-tight text-white`}>{e.role}</h3>
                <p className="mt-1 text-[13.5px] text-[#aeb6c2]">{e.org} · {e.orgNote} · {e.place}</p>
                <ul className={`${primary ? "mt-4 space-y-2.5" : "mt-3 space-y-2"}`}>
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#aeb6c2]">
                      <span className="mt-[8px] h-px w-3 shrink-0 bg-sky-400/50" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {primary && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                    {e.stack.map((s) => (
                      <span key={s} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono2 text-[10.5px] text-[#aeb6c2]">{s}</span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

export function Metrics() {
  return (
    <section aria-labelledby="metrics-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading eyebrow="Evidence" title={<span id="metrics-title">Built. Tested. Measured.</span>} lede="Measured where it matters — every number traces back to the systems above." />
      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3 lg:grid-cols-6">
        {METRICS_EDITORIAL.map((m, i) => (
          <Reveal key={m.label} delay={i * 60} className="bg-[#0b1219]">
            <div className="h-full p-5">
              <dd className="font-display tnum text-[1.9rem] font-bold leading-none tracking-tight text-white">{m.value}</dd>
              <dt className="mt-2 text-[12px] leading-snug text-[#7d8590]">{m.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function SkillMatrix() {
  const [tab, setTab] = useState(1);
  const active = STACK[tab];
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading eyebrow="Stack" title={<span id="stack-title">Technology matrix.</span>} lede="No percentage bars — just the tools used to ship the systems above." />
      <Reveal delay={100}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015]">
          <div className="flex gap-1 overflow-x-auto border-b border-white/[0.07] p-2" role="tablist" aria-label="Skill categories">
            {STACK.map((c, i) => (
              <button
                key={c.category}
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                  i === tab ? "bg-white/[0.07] text-white" : "text-[#8b94a3] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
          <div className="p-5 sm:p-6" role="tabpanel">
            <p className="font-mono2 text-[10.5px] tracking-[0.2em] text-[#5d6675] uppercase">{active.category} · {active.items.length}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {active.items.map((s) => (
                <li key={s} className="rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-[#c7cdd6]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ProblemSolving() {
  return (
    <section id="problem-solving" aria-labelledby="problem-solving-title" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <SectionHeading
        eyebrow="Problem solving"
        title={<span id="problem-solving-title">Beyond the projects.</span>}
        lede="Systems thinking sharpened one problem at a time."
      />
      <Reveal delay={100}>
        <div className="panel noise relative mt-8 overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:p-8">
          <div className="bg-grid-technical absolute inset-0 opacity-40 mask-fade-b" aria-hidden="true" />
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-14 w-full opacity-60" aria-hidden="true">
            <path d="M0,42 C60,38 90,20 150,26 C210,32 240,44 300,30 C340,22 370,26 400,18" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.2" className="flow-dash" />
          </svg>
          <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <dl className="flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <dd className="font-display tnum text-[2.6rem] font-bold leading-none tracking-tight text-white">{LEETCODE.problems}</dd>
                  <dt className="mt-2 text-[13px] text-[#7d8590]">{LEETCODE.problemsLabel}</dt>
                </div>
                <div>
                  <dd className="font-display tnum text-[2.6rem] font-bold leading-none tracking-tight text-white">{LEETCODE.rating}</dd>
                  <dt className="mt-2 text-[13px] text-[#7d8590]">{LEETCODE.ratingLabel}</dt>
                </div>
              </dl>
              <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-[#aeb6c2]">{LEETCODE.supporting}</p>
              <p className="mt-2 font-mono2 text-[11px] tracking-[0.14em] text-sky-200/80 uppercase">{LEETCODE.topics}</p>
            </div>
            <a
              href={LEETCODE.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-px hover:bg-sky-200 active:translate-y-0"
              aria-label="View LeetCode profile"
            >
              View LeetCode Profile ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
