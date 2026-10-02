/* Illustrated interface studies used only if a repository screenshot fails to load.
   The laptop showcase presents real screenshots first. */

function ScreenShell({ children, app, status }) {
  return (
    <div className="flex h-full flex-col bg-[#0a0d12] text-left">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0d1117] px-3 py-1.5 sm:px-4 sm:py-2">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-sky-400/15 font-mono2 text-[9px] font-bold text-sky-300">{app[0]}</span>
          <p className="font-mono2 text-[10px] font-semibold tracking-[0.14em] text-white">{app}</p>
        </div>
        <p className="flex items-center gap-1.5 font-mono2 text-[9px] tracking-[0.1em] text-emerald-300">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          {status}
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2.5 sm:overflow-hidden sm:p-3.5">{children}</div>
    </div>
  );
}

function Panel({ title, right, children, className = "" }) {
  return (
    <div className={`rounded-lg border border-white/[0.08] bg-[#10141b] p-2 sm:p-2.5 ${className}`}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="font-mono2 text-[8.5px] uppercase tracking-[0.16em] text-[#7d8590]">{title}</p>
        {right ? <span className="font-mono2 text-[8.5px] text-sky-300/90">{right}</span> : null}
      </div>
      {children}
    </div>
  );
}

export function OpsAgentScreen() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 88, 96, 72, 60, 48];
  return (
    <ScreenShell app="OPSAGENT" status="WATCHING · PROD">
      <div className="alert-in mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/[0.09] px-2.5 py-2">
        <span className="rounded bg-red-500 px-1.5 py-0.5 font-mono2 text-[8.5px] font-bold tracking-widest text-white">INCIDENT DETECTED</span>
        <span className="font-mono2 text-[9px] text-red-200">SEV · CRITICAL</span>
        <span className="font-mono2 text-[9px] text-[#9aa3b2]">payments-api · OOM / Pod CrashLoopBackOff · 14:02:11Z</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:h-[calc(100%-44px)] sm:grid-cols-12">
        <div className="flex flex-col gap-2 sm:col-span-4">
          <Panel title="Kubernetes telemetry" right="9 SVC">
            <div className="flex items-end gap-[3px]" aria-hidden="true">
              {bars.map((h, i) => (
                <span key={i} className="bar-grow w-full rounded-sm" style={{ height: `${Math.max(10, h * 0.42)}px`, background: i >= 7 ? "rgba(248,113,113,0.85)" : "rgba(56,189,248,0.55)", animationDelay: `${i * 60}ms` }} />
              ))}
            </div>
            <div className="mt-1.5 space-y-1 font-mono2 text-[8.5px] text-[#9aa3b2]">
              <p>svc <span className="text-emerald-300">8/9 healthy</span> · <span className="text-red-300">1 degraded</span></p>
              <p>OOMKilled <span className="text-red-300">×14 / 5m</span> · restarts <span className="text-red-300">23</span></p>
              <p>mem <span className="text-sky-200">1.9Gi / 512Mi lim</span> · cpu 780m</p>
            </div>
          </Panel>
          <Panel title="Prometheus" right="GRAFANA">
            <div className="space-y-1 font-mono2 text-[8.5px]">
              <p className="text-[#9aa3b2]">container_memory_working <span className="float-right text-red-300">▲ 312%</span></p>
              <div className="h-1 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full w-[92%] bg-red-400/80" /></div>
              <p className="text-[#9aa3b2]">http_5xx_rate <span className="float-right text-amber-300">4.1%</span></p>
              <div className="h-1 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full w-[46%] bg-amber-300/80" style={{ animationDelay: "200ms" }} /></div>
            </div>
          </Panel>
          <Panel title="Git history" right="main">
            <div className="space-y-1 font-mono2 text-[8.5px] leading-relaxed">
              <p className="text-[#9aa3b2]"><span className="text-sky-300">a3f9c1</span> bump mem limit 256→512Mi</p>
              <p className="text-[#9aa3b2]"><span className="text-sky-300">77bd20</span> enable cache preload ⚠</p>
              <p className="text-red-300">▲ suspect: preload ×4 mem</p>
            </div>
          </Panel>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-3">
          <Panel title="Pipeline · 7-node LangGraph" className="flex-1">
            <ol className="relative space-y-[7px] border-l border-sky-400/25 pl-2.5 font-mono2 text-[8.5px]">
              {["Alert", "RabbitMQ", "Router", "LangGraph", "MCP Tools", "Correlation", "RCA", "Jira"].map((s, i) => (
                <li key={s} className={`relative ${i <= 6 ? "text-sky-200" : "text-[#6d7684]"}`}>
                  <span className={`absolute -left-[15px] top-[3px] h-[7px] w-[7px] rounded-full ${i <= 6 ? "bg-sky-400 pulse-dot" : "bg-white/20"}`} style={{ animationDelay: `${i * 250}ms` }} aria-hidden="true" />
                  {s}
                  {i === 3 && <span className="ml-1 rounded bg-sky-400/15 px-1 text-sky-300">Llama 3.3 70B</span>}
                </li>
              ))}
            </ol>
            <p className="mt-1.5 border-t border-white/[0.07] pt-1.5 font-mono2 text-[8px] leading-relaxed text-[#6d7684]">reasoning: each step cites evidence ids · readable trail</p>
          </Panel>
          <Panel title="Langfuse trace" right="0.968">
            <p className="font-mono2 text-[8.5px] text-[#9aa3b2]">faith 0.97 · relev 0.96 · ctx-prec 0.97</p>
            <div className="mt-1 h-1 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full w-[96.8%] bg-emerald-400/80" /></div>
          </Panel>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-5">
          <Panel title="Root-cause analysis" right="CONF 0.93" className="border-sky-400/20">
            <p className="text-[10px] font-semibold leading-snug text-white">Memory limit exceeded after cache-preload deploy; heap grows unbounded on warm keys.</p>
            <p className="mt-1 font-mono2 text-[8.5px] leading-relaxed text-[#9aa3b2]">Evidence: OOMKilled ×14 ↔ commit 77bd20 · heap +312% · no traffic spike.</p>
          </Panel>
          <Panel title="Suggested remediation">
            <ul className="space-y-1 text-[9px] leading-snug text-[#c7cdd6]">
              <li>1. Roll back preload flag, raise limit 512Mi → 1Gi</li>
              <li>2. Cap LRU cache + add heap dump on &gt;85%</li>
            </ul>
          </Panel>
          <Panel title="Jira · auto-filed" right="SRE-4182">
            <p className="font-mono2 text-[8.5px] text-[#9aa3b2]">assignee: on-call · priority: Highest · JWT ✓</p>
          </Panel>
        </div>
      </div>
    </ScreenShell>
  );
}

export function GraphRAGScreen() {
  return (
    <ScreenShell app="GRAPHRAG" status="GROUNDED · 2–5s">
      <div className="mb-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">
        <p className="font-mono2 text-[8.5px] uppercase tracking-[0.16em] text-[#7d8590]">Research question</p>
        <p className="mt-0.5 text-[11px] font-medium text-white">“How does the system verify retrieved evidence?”</p>
        <div className="mt-1.5 flex flex-wrap gap-1 font-mono2 text-[8px] text-sky-200">
          {["expansion ×3", "KG", "Qdrant", "BM25", "RRF", "cross-enc", "verify"].map((t) => (
            <span key={t} className="rounded border border-sky-400/25 bg-sky-400/10 px-1.5 py-0.5">{t}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:h-[calc(100%-86px)] sm:grid-cols-12">
        <div className="sm:col-span-4">
          <Panel title="Knowledge graph" right="325 N · 1661 E" className="h-full">
            <svg viewBox="0 0 120 90" className="mt-1 w-full" aria-hidden="true">
              <g stroke="rgba(56,189,248,0.4)" strokeWidth="0.8">
                <line x1="20" y1="20" x2="60" y2="35" className="flow-dash" /><line x1="60" y1="35" x2="95" y2="20" /><line x1="20" y1="20" x2="35" y2="60" /><line x1="35" y1="60" x2="60" y2="35" /><line x1="60" y1="35" x2="80" y2="65" /><line x1="95" y1="20" x2="80" y2="65" /><line x1="35" y1="60" x2="80" y2="65" />
              </g>
              <g fontSize="6" fill="#c7cdd6" fontFamily="monospace">
                <circle cx="20" cy="20" r="7" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" /><circle cx="60" cy="35" r="9" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" /><circle cx="95" cy="20" r="6" fill="#1a2230" stroke="rgba(255,255,255,0.3)" /><circle cx="35" cy="60" r="6" fill="#1a2230" stroke="rgba(255,255,255,0.3)" /><circle cx="80" cy="65" r="7" fill="rgba(52,211,153,0.25)" stroke="#34d399" />
              </g>
            </svg>
            <p className="mt-1 font-mono2 text-[8px] text-[#7d8590]">traversal depth 2 · 913 chunks</p>
          </Panel>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-4">
          <Panel title="Retrieved · hybrid" right="RRF">
            {[
              ["D-118 · grounding spec", "0.91"],
              ["D-042 · RRF fusion notes", "0.87"],
              ["D-207 · rerank eval", "0.83"],
            ].map(([t, s]) => (
              <div key={t} className="mb-1.5 last:mb-0">
                <div className="flex justify-between font-mono2 text-[8.5px]"><span className="text-[#c7cdd6]">{t}</span><span className="text-sky-200">{s}</span></div>
                <div className="mt-0.5 h-1 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full bg-sky-400/70" style={{ width: `${parseFloat(s) * 100}%` }} /></div>
              </div>
            ))}
          </Panel>
          <p className="font-mono2 text-[8px] text-[#6d7684]">rerank: cross-enc top-50 → top-5 · kw-hit 73%</p>
          <Panel title="Claims" right="92% VERIFIED">
            <ul className="space-y-1 text-[9px] text-[#c7cdd6]">
              <li><span className="text-emerald-300">✓</span> RRF fuses KG + vector + BM25</li>
              <li><span className="text-emerald-300">✓</span> Cross-encoder reranks top-k</li>
              <li><span className="text-emerald-300">✓</span> Stemming-aware grounding</li>
            </ul>
          </Panel>
        </div>
        <div className="sm:col-span-4">
          <Panel title="Grounded answer" right="conf 0.82" className="h-full border-emerald-400/20">
            <p className="text-[9.5px] leading-relaxed text-[#dfe3e8]">Evidence is verified per-claim against fused retrieval, with novelty penalties and 3-variant expansion. Mean confidence <span className="font-mono2 text-emerald-300">0.82</span>.</p>
            <p className="mt-1.5 font-mono2 text-[8px] text-[#7d8590]">73% keyword hit · 62% benchmark pass · [1][2][3]</p>
          </Panel>
        </div>
      </div>
    </ScreenShell>
  );
}

export function SkybridgeScreen() {
  const stages = ["Compat", "Drift", "Policy", "Approval", "Canary", "Quiesce", "Transfer", "Reconcile", "Audit ✓"];
  return (
    <ScreenShell app="SKYBRIDGE" status="CONTROL PLANE · GO">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {[
          ["SOURCE", "AWS · PG 14 · WAL"],
          ["CONTROL PLANE", "Temporal · 9-stage"],
          ["DESTINATION", "Azure · PG 14"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <p className="font-mono2 text-[8px] tracking-[0.16em] text-[#7d8590]">{k}</p>
            <p className="font-mono2 text-[9px] text-sky-200">{v}</p>
          </div>
        ))}
      </div>
      <div className="mb-2 flex items-center gap-1 overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] px-2 py-2 font-mono2 text-[8px]" aria-hidden="true">
        {["WAL", "Debezium", "Redpanda", "Applier", "Azure PG"].map((s, i, a) => (
          <span key={s} className="flex items-center gap-1 whitespace-nowrap text-[#aeb6c2]">
            <span className="rounded border border-sky-400/25 bg-sky-400/10 px-1.5 py-0.5 text-sky-200">{s}</span>
            {i < a.length - 1 && <span className="text-sky-400/70">→</span>}
          </span>
        ))}
        <span className="ml-auto hidden text-emerald-300 sm:inline">lag 1.8s · RPO gate ✓</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <Panel title="9-stage cutover state machine" right="STAGE 6/9">
            <ol className="flex flex-wrap gap-1">
              {stages.map((s, i) => (
                <li key={s} className={`rounded px-1.5 py-1 font-mono2 text-[8px] ${i < 6 ? "bg-emerald-400/15 text-emerald-200" : i === 6 ? "bg-sky-400/15 text-sky-200 pulse-dot" : "bg-white/[0.04] text-[#6d7684]"}`}>
                  {i < 6 ? "✓ " : ""}{s}
                </li>
              ))}
            </ol>
            <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full w-[68%] bg-gradient-to-r from-emerald-400 to-sky-400" /></div>
          </Panel>
        </div>
        <div className="sm:col-span-5">
          <Panel title="Safety · fail-closed" className="h-full">
            <ul className="space-y-1 font-mono2 text-[8.5px] text-[#aeb6c2]">
              <li><span className="text-emerald-300">✓</span> read-only canary</li>
              <li><span className="text-emerald-300">✓</span> CAS ownership · exactly-once</li>
              <li><span className="text-emerald-300">✓</span> split-brain prevention</li>
              <li className="text-sky-200">354 tests · 12-scenario matrix · 14 TF modules</li>
            </ul>
          </Panel>
        </div>
      </div>
      <p className="mt-2 rounded-md border border-amber-300/20 bg-amber-300/[0.07] px-2 py-1 text-center font-mono2 text-[8.5px] text-amber-200">Local validation complete • Real-cloud execution deferred in v1</p>
    </ScreenShell>
  );
}
