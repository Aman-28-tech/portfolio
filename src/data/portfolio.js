export const PROFILE = {
  name: "Amandeep",
  positioning: "AI • Backend • Cloud Engineer",
  headlineA: "I build intelligent systems",
  headlineB: "and production-grade software.",
  sub: "I work at the intersection of AI engineering, backend systems, distributed infrastructure, and cloud architecture.",
  portrait: "/portrait.jpg",
  meta: ["NIT Jalandhar", "B.Tech", "2027"],
  email: "amandeepkl758@gmail.com",
  linkedin: "https://linkedin.com/in/aman-deep-151aba335",
  linkedinLabel: "linkedin.com/in/aman-deep-151aba335",
  github: "https://github.com/Aman-28-tech",
  githubLabel: "github.com/Aman-28-tech",
  phone: "+91 9988506106",
  resumeFile: "/Amandeep_Resume.pdf",
};

export const PROJECTS = [
  {
    id: "opsagent",
    index: "01",
    name: "OPSAGENT",
    chrome: "OpsAgent",
    status: "INCIDENT RCA",
    tagline: "Autonomous SRE Fabric with End-to-End Incident Diagnosis",
    tags: ["Agentic AI", "SRE Automation", "MCP Systems", "Incident Response"],
    overview:
      "Autonomous AI SRE agent for production alerts (OOM, pod crashes, 5xx) built on a 7-node LangGraph workflow with Llama 3.3 70B — correlating Kubernetes telemetry, metrics, and Git history for instant root-cause analysis.",
    architecture:
      "RabbitMQ alert pipeline across a 9-service FastAPI stack with 4 scoped MCP servers (K8s, Prometheus, GitHub, Jira), short-lived JWT auth, auto-filed Jira tickets, Prometheus/Grafana telemetry, and Langfuse tracing.",
    engineering:
      "LLM evaluation CI gates PRs on quality. 44 unit tests and 10 mock incident scenarios keep the diagnosis loop deterministic and reviewable.",
    results: "0.968 aggregate evaluation score across Faithfulness, Answer Relevancy, and Context Precision.",
    stack: ["LangGraph", "Llama 3.3 70B", "FastAPI ×9", "RabbitMQ", "MCP ×4", "Kubernetes", "Prometheus", "GitHub", "Jira", "JWT", "Langfuse", "Ragas"],
    github: "https://github.com/Aman-28-tech/OpsAgent-Autonomous-SRE-Fabric",
    slides: [
      { src: "/shots/opsagent/3.Dashboard.png", title: "Incident Diagnosis", caption: "SRE Command Center — alerts, MCP health, JWT auth" },
      { src: "/shots/opsagent/1.grafana-Dashboard.png", title: "Observability", caption: "Grafana monitoring — Prometheus telemetry" },
      { src: "/shots/opsagent/5.rca.png", title: "RCA Report", caption: "AI-generated RCA report" },
      { src: "/shots/opsagent/4.jira-ticket.png", title: "Ticket Automation", caption: "Auto-filed Jira ticket" },
      { src: "/shots/opsagent/6.evaluation.png", title: "LLM Evaluation", caption: "LLM evaluation — quality gating" },
    ],
    pipeline: ["Alert", "RabbitMQ", "Incident Router", "LangGraph", "MCP Tools", "Telemetry Correlation", "RCA", "Jira"],
    metrics: [
      { value: "0.968", label: "Aggregate evaluation score" },
      { value: "44", label: "Unit tests" },
      { value: "10", label: "Mock incident scenarios" },
      { value: "9", label: "FastAPI services" },
    ],
    quality: ["Faithfulness", "Answer Relevancy", "Context Precision"],
  },
  {
    id: "graphrag",
    index: "02",
    name: "AGENTIC GRAPHRAG",
    chrome: "Agentic GraphRAG",
    status: "RAG PIPELINE",
    tagline: "Self-Correcting Research Q&A with Hybrid Retrieval + Verification",
    tags: ["Agentic AI", "GraphRAG", "Knowledge Graphs", "Hybrid Retrieval"],
    overview:
      "Agentic GraphRAG platform for research Q&A fusing Knowledge Graph traversal, Qdrant vector search, and BM25 with Reciprocal Rank Fusion and Cross-Encoder reranking — returning grounded answers in 2–5s.",
    architecture:
      "Query expansion (3 variants) → hybrid retrieval (KG + Qdrant + BM25) → RRF → Cross-Encoder rerank → LLM → stemming-aware claim-level grounding with term-novelty penalties. Multi-provider LLM support (Llama 3.3 70B, GPT-4o, Claude).",
    engineering:
      "Dockerized FastAPI + Streamlit stack. Self-correcting verification engine eliminates hallucinations through claim-level grounding against retrieved evidence.",
    results: "913 chunks indexed into a 325-node / 1,661-edge graph. 92% verified rate at 0.82 mean confidence on the end-to-end evaluation benchmark.",
    stack: ["Knowledge Graphs", "Qdrant", "BM25", "RRF", "Cross-Encoder", "FastAPI", "Streamlit", "Docker", "Llama 3.3 70B"],
    github: "https://github.com/Aman-28-tech/agentic-graphrag",
    slides: [
      { src: "/shots/graphrag/2.ui_main_complex.png", title: "Research Q&A", caption: "Main interface — verified answer with confidence" },
      { src: "/shots/graphrag/3.ui_expanded_context.png", title: "Retrieval Transparency", caption: "Retrieval transparency — expanded context" },
      { src: "/shots/graphrag/1.eval_dashboard_final.png", title: "Evaluation Dashboard", caption: "Evaluation dashboard" },
      { src: "/shots/graphrag/5.kg_visualization.png", title: "Knowledge Graph", caption: "Knowledge graph visualization" },
    ],
    pipeline: ["Query Expansion", "Knowledge Graph", "Qdrant", "BM25", "RRF", "Cross Encoder", "LLM", "Claim Verification", "Grounded Answer"],
    metrics: [
      { value: "913", label: "Indexed chunks" },
      { value: "325", label: "Graph nodes" },
      { value: "1,661", label: "Graph edges" },
      { value: "2–5s", label: "Response time" },
      { value: "92%", label: "Verified rate" },
      { value: "0.82", label: "Mean confidence" },
      { value: "73%", label: "Keyword hit rate" },
      { value: "62%", label: "Benchmark pass rate" },
    ],
    quality: [],
  },
  {
    id: "skybridge",
    index: "03",
    name: "SKYBRIDGE",
    chrome: "SKYBRIDGE",
    status: "CUTOVER 9-STAGE",
    tagline: "Stateful Multi-Cloud Workload Migration & Continuity Control Plane",
    tags: ["Cloud Architecture", "Distributed Systems", "CDC", "Go"],
    overview:
      "Go control plane for stateful AWS → Azure migration — orchestrating compatibility, drift, policy/approval, Temporal workflows, canary rollout, quiesce, ownership transfer, and audit across a 9-stage cutover state machine.",
    architecture:
      "PostgreSQL WAL → Debezium → Redpanda → CDC Applier → Azure PostgreSQL, with transactional deduplication, forward-only checkpoints, reconciliation, and configurable RPO-based lag gating.",
    engineering:
      "Fail-closed safety: read-only canary evaluation, exactly-once CAS ownership transfer, split-brain prevention. 354 automated tests, 12-scenario failure matrix, 14 Terraform modules. Local validation complete • Real-cloud execution deferred in v1.",
    results: "Locally validated platform with a 12-scenario failure matrix. Real-cloud execution deferred in v1 — no production workload claims.",
    stack: ["Go", "Temporal", "PostgreSQL WAL", "Debezium", "Redpanda", "CDC Applier", "Terraform ×14", "AWS", "Azure"],
    github: "https://github.com/Aman-28-tech/SKYBRIDGE",
    slides: [
      { src: "/shots/skybridge/dashboard.png", title: "Migration Control Plane", caption: "Console dashboard — migration overview" },
      { src: "/shots/skybridge/migration-detail.png", title: "Migration Detail", caption: "Migration detail view" },
      { src: "/shots/skybridge/cdc.png", title: "CDC / RPO", caption: "CDC pipeline — lag and RPO gating" },
      { src: "/shots/skybridge/cutover.png", title: "Cutover", caption: "Cutover lifecycle" },
      { src: "/shots/skybridge/safety.png", title: "Safety", caption: "Safety — canary, ownership, audit" },
    ],
    pipeline: ["PostgreSQL WAL", "Debezium", "Redpanda", "CDC Applier", "Azure PostgreSQL"],
    stages: ["Compat Check", "Drift Scan", "Policy Gate", "Approval", "Canary", "Quiesce", "Ownership Transfer", "Reconciliation", "Audit → Complete"],
    metrics: [
      { value: "354", label: "Automated tests" },
      { value: "12", label: "Failure-matrix scenarios" },
      { value: "14", label: "Terraform modules" },
      { value: "9", label: "Cutover stages" },
    ],
    quality: [],
    disclaimer: "Local validation complete • Real-cloud execution deferred in v1",
  },
];

export const EXPERIENCE = [
  {
    index: "01",
    role: "Founding Full-Stack Engineer (Contract)",
    org: "GiniVibe",
    orgNote: "Pre-incorporation Venture",
    place: "Remote",
    date: "Aug 2026 – Oct 2026",
    points: [
      "Architected and launched a cross-platform social ecosystem from scratch as sole contracted engineer — Next.js 16 web + React Native / Expo 57 mobile.",
      "TypeScript/Node.js monorepo with 7 microservices and PostgreSQL (Prisma): auth, multimedia feeds, duplicate-protected online/offline event ticketing.",
      "WebRTC peer-to-peer audio/video rooms and 1:1 encrypted messaging with live presence via WebSockets and Socket.io.",
      "AI character chat engine + multi-dimensional semantic recommendation mapping traits and intent into ranked matches.",
      "Dockerized services deployed to Microsoft Azure with Azure Blob Storage for high-throughput media uploads.",
    ],
    stack: ["Next.js 16", "Expo 57", "TypeScript", "PostgreSQL", "WebRTC", "Socket.io", "Docker", "Azure"],
  },
  {
    index: "02",
    role: "Full-Stack Web Developer Intern",
    org: "Skylark Express Delhi Pvt Ltd",
    orgNote: "Logistics",
    place: "On-site, Gurugram",
    date: "Jun 2025 – Jul 2025",
    points: [
      "Built an internal logistics dashboard improving data visibility and workflow efficiency.",
      "Architected frontend with React, Next.js, and TypeScript, integrating REST APIs.",
      "Optimized UI responsiveness and system performance for core internal operations.",
    ],
    stack: ["React", "Next.js", "TypeScript", "REST APIs"],
  },
];

export const METRICS_EDITORIAL = [
  { value: "450+", label: "LeetCode problems" },
  { value: "1700+", label: "Contest rating" },
  { value: "3", label: "Major engineering case studies", note: "portfolio navigation" },
  { value: "4", label: "MCP servers in OpsAgent" },
  { value: "9", label: "FastAPI services in OpsAgent" },
  { value: "354", label: "Automated SKYBRIDGE tests" },
];

export const STACK = [
  { category: "Languages", items: ["Python", "JavaScript / TypeScript", "C++", "Java"] },
  { category: "AI / ML / GenAI", items: ["LangGraph", "LangChain", "RAG", "Agentic AI", "Prompt Engineering", "Embeddings", "Qdrant", "Knowledge Graphs", "Cross-Encoder Reranking", "PyTorch", "Hugging Face", "Ragas", "LightGBM", "SHAP", "Scikit-learn"] },
  { category: "Backend & Web", items: ["FastAPI", "Node.js", "Express.js", "React.js", "Next.js", "MongoDB", "REST APIs", "Socket.io"] },
  { category: "DevOps & Tools", items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "Linux"] },
  { category: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Multithreading", "System Design"] },
];

export const LEETCODE = {
  url: "https://leetcode.com/u/montykl007/",
  problems: "450+",
  problemsLabel: "Problems solved",
  rating: "1700+",
  ratingLabel: "Contest rating",
  topics: "Arrays · Trees · Graphs · DP",
  supporting: "Data Structures & Algorithms across arrays, trees, graphs and dynamic programming.",
};

export const BUILD_STEPS = [
  { n: "01", name: "Understand", desc: "Problem boundaries, failure modes, constraints." },
  { n: "02", name: "Architect", desc: "Services, data flow, contracts, cutover plan." },
  { n: "03", name: "Build", desc: "Typed, tested, minimal implementation." },
  { n: "04", name: "Test", desc: "Unit tests, failure matrices, edge cases." },
  { n: "05", name: "Measure", desc: "Eval benchmarks, metrics, tracing, audit." },
  { n: "06", name: "Ship", desc: "Staged rollout, canary, safe ownership transfer." },
];
