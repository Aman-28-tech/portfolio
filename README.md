# Hi there, I'm Amandeep! 👋

Fourth-year B.Tech student at **National Institute of Technology, Jalandhar** (graduating 2027). I work at the intersection of **AI engineering, backend systems, distributed infrastructure, and cloud architecture** — from autonomous SRE agents and self-correcting RAG pipelines to stateful multi-cloud control planes. Previously a **Founding Full-Stack Engineer (Contract) at GiniVibe**, where I shipped a cross-platform social ecosystem solo. Strong foundation in Data Structures & Algorithms and production-grade system design.

## 🚀 About Me

- **Education**: B.Tech from **NIT Jalandhar** (Aug 2023 – Aug 2027) — currently in my **4th year**.
- **Focus Areas**: Agentic AI, Backend Engineering, Distributed Systems, Cloud Infrastructure.
- **Experience**: Founding Full-Stack Engineer at **GiniVibe** (Aug 2026 – Oct 2026); Full-Stack Web Developer Intern at **Skylark Express** (Jun 2025 – Jul 2025).
- **Coding Profile**: **450+ problems** solved on LeetCode with a contest rating of **1700+**.

## 💻 Technical Skills

- **Languages**: Python, JavaScript/TypeScript, C++, Java
- **AI / ML / GenAI**: LangGraph, LangChain, RAG, Agentic AI, Prompt Engineering, Embeddings, Qdrant, Knowledge Graphs, Cross-Encoder Reranking, PyTorch, Hugging Face, Ragas, LightGBM, SHAP, Scikit-learn
- **Backend & Web**: FastAPI, Node.js, Express.js, React.js, Next.js, MongoDB, REST APIs, Socket.io
- **DevOps & Tools**: Docker, Docker Compose, Git, GitHub Actions (CI/CD), Linux
- **Core CS**: Data Structures & Algorithms, OOP, DBMS, Multithreading, System Design

## 💼 Experience

### Founding Full-Stack Engineer (Contract) — GiniVibe (Pre-incorporation Venture), Remote
*Aug 2026 – Oct 2026*
- Architected and launched a cross-platform social ecosystem from scratch as the sole contracted engineer — Next.js 16 web + React Native / Expo 57 mobile with unified feature parity.
- Engineered a TypeScript/Node.js monorepo with 7 microservices and PostgreSQL (Prisma): auth, multimedia feeds, duplicate-protected online/offline event ticketing.
- Built WebRTC peer-to-peer audio/video rooms and 1:1 encrypted messaging with live presence via WebSockets and Socket.io.
- Developed an AI character chat engine + multi-dimensional semantic recommendation pipeline mapping traits and intent into ranked matches.
- Dockerized all services and deployed to Microsoft Azure with Azure Blob Storage for high-throughput media uploads.

### Full-Stack Web Developer Intern — Skylark Express Delhi Pvt Ltd, Gurugram (On-site)
*Jun 2025 – Jul 2025*
- Built an internal logistics dashboard improving data visibility and workflow efficiency.
- Architected the frontend with React, Next.js, and TypeScript, integrating REST APIs.
- Optimized UI responsiveness and system performance for core internal operations.

## 🛠️ Top Projects

### 🤖 OpsAgent: Autonomous SRE Fabric with End-to-End Incident Diagnosis ⭐ Latest
*Agentic AI · SRE Automation · MCP Systems · Incident Response — [GitHub](https://github.com/Aman-28-tech/OpsAgent-Autonomous-SRE-Fabric)*
- Built an autonomous AI SRE agent for production alerts (OOM, pod crashes, 5xx) on a **7-node LangGraph workflow with Llama 3.3 70B** — correlating Kubernetes telemetry, metrics, and Git history for instant root-cause analysis.
- Architected a **RabbitMQ alert pipeline** across a **9-service FastAPI stack** with **4 scoped MCP servers** (K8s, Prometheus, GitHub, Jira), short-lived JWT auth, auto-filed Jira tickets, and Prometheus/Grafana + Langfuse tracing.
- Engineered **LLM evaluation CI gating PRs on quality**: **0.968 aggregate score** (Faithfulness, Answer Relevancy, Context Precision), **44 unit tests**, **10 mock incident scenarios**.

### 🧠 Agentic GraphRAG: Self-Correcting Research Q&A with Hybrid Retrieval + Verification
*Agentic AI · GraphRAG · Knowledge Graphs · Hybrid Retrieval — [GitHub](https://github.com/Aman-28-tech/agentic-graphrag)*
- Built an agentic GraphRAG platform fusing **Knowledge Graph traversal + Qdrant vector search + BM25** with **RRF** and **Cross-Encoder reranking** — grounded answers in **2–5s**.
- Designed a self-correcting verification engine with stemming-aware claim-level grounding, term-novelty penalties, 3-variant query expansion, and multi-provider LLM support (Llama 3.3 70B, GPT-4o, Claude).
- Indexed **913 chunks** into a **325-node / 1,661-edge graph** (Dockerized FastAPI + Streamlit): **92% verified rate**, **0.82 mean confidence**, **73% keyword hit rate**.

### ☁️ SKYBRIDGE: Stateful Multi-Cloud Workload Migration & Continuity Control Plane
*Cloud Architecture · Distributed Systems · CDC · Go — [GitHub](https://github.com/Aman-28-tech/SKYBRIDGE)*
- Built a **Go control plane** for stateful AWS → Azure migration across a **9-stage cutover state machine** (compat → drift → policy → approval → canary → quiesce → transfer → reconcile → audit) with Temporal workflows.
- Engineered **PostgreSQL WAL → Debezium → Redpanda → CDC Applier** with transactional deduplication, forward-only checkpoints, reconciliation, and RPO-based lag gating.
- Fail-closed safety: read-only canary evaluation, exactly-once CAS ownership transfer, split-brain prevention — **354 automated tests**, 12-scenario failure matrix, 14 Terraform modules (local validation; real-cloud execution deferred in v1).

## 🖥️ My Portfolio (This Repository)

This repo is my personal portfolio — a dark, engineering-themed single-page site presenting the systems above as an interactive product demo.

- **Laptop showcase**: real project screenshots inside a device mockup with autoplay, swipe/keyboard navigation, and per-project browser titles.
- **Case studies**: problem → architecture → implementation → validation for every system.
- **Sections**: experience timeline, technology matrix, problem-solving (LeetCode), in-place resume viewer, contact.
- **Stack**: React 19, Vite, Tailwind CSS 4. Run locally with `npm install && npm run dev`.

## 🧩 Problem Solving

- **LeetCode**: **450+ problems** solved across Arrays, Trees, Graphs and Dynamic Programming | **Contest Rating 1700+** — [Profile](https://leetcode.com/u/montykl007/)

## 🛠️ Development

**Tech stack**: React 19, Vite 5, Tailwind CSS 4, GitHub Pages / Vercel-ready static build.

```bash
npm install   # install dependencies
npm run dev   # start local dev server
npm run build # production build into dist/
npm run preview # preview the production build
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify, GitHub Pages).

## 📫 Let's Connect

- **Email**: [amandeepkl758@gmail.com](mailto:amandeepkl758@gmail.com)
- **LinkedIn**: [Aman Deep](https://www.linkedin.com/in/aman-deep-151aba335/)
- **GitHub**: [@Aman-28-tech](https://github.com/Aman-28-tech)
- **LeetCode**: [montykl007](https://leetcode.com/u/montykl007/)
