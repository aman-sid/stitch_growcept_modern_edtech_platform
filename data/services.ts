export interface ServicePractice {
  id: string;
  practiceNumber: string;
  title: string;
  description: string;
  tagline: string;
  icon: string;
  capabilities: string[];
  deliverableBadge: string;
}

export interface ProcessStage {
  step: string;
  timeframe: string;
  title: string;
  description: string;
  deliverable: string;
  icon: string;
}

export const servicesData: ServicePractice[] = [
  {
    id: "ai-consulting",
    practiceNumber: "Practice 01",
    title: "AI Consulting",
    tagline: "Strategic Intelligence & Architecture",
    description:
      "End-to-end strategic AI roadmapping, model orchestration planning, tech stack evaluation, and high-ROI transformation blueprints tailored for fast-scaling enterprises.",
    icon: "psychology",
    capabilities: [
      "Enterprise AI roadmap & feasibility analysis",
      "Model evaluation & latency/cost optimization",
      "Vendor selection & GPU infrastructure strategy",
      "Executive AI advisory & technical due diligence",
    ],
    deliverableBadge: "Strategic AI Architecture Blueprint",
  },
  {
    id: "ai-audit",
    practiceNumber: "Practice 02",
    title: "AI Audit",
    tagline: "Zero-Trust Security & Latency Triage",
    description:
      "Comprehensive architectural diagnostic covering model hallucination risks, latency bottlenecks, token cost waste, prompt injection vulnerabilities, and deterministic system validation.",
    icon: "verified_user",
    capabilities: [
      "P99 latency & token budget waste diagnostics",
      "Prompt injection, jailbreak & red-teaming defense",
      "RAG retrieval precision & data leakage audit",
      "SOC2 / HIPAA / ISO compliance guardrails",
    ],
    deliverableBadge: "Comprehensive Audit & Remediation Spec",
  },
  {
    id: "ai-automation",
    practiceNumber: "Practice 03",
    title: "AI Automation",
    tagline: "Autonomous Workflow Swarms",
    description:
      "Custom multi-agent workflows and deterministic automation pipelines that eliminate manual operational bottlenecks across customer support, document parsing, sales, and devops.",
    icon: "bolt",
    capabilities: [
      "Multi-agent autonomous task execution swarms",
      "Sub-150ms semantic query routing & automated dispatch",
      "Automated document OCR, extraction & reconciliation",
      "Human-in-the-loop decision gating & verification",
    ],
    deliverableBadge: "Deployed Production Agent Swarms",
  },
  {
    id: "ai-os",
    practiceNumber: "Practice 04",
    title: "AI OS",
    tagline: "Unified Enterprise Operating System",
    description:
      "Centrally orchestrated internal AI operating system providing unified model routing, central authentication, shared vector memory, role-based tool access, and real-time telemetry.",
    icon: "terminal",
    capabilities: [
      "Unified multi-model gateway (Claude, GPT, DeepSeek, Llama)",
      "Centralized company knowledge vector store",
      "Shared state & cross-agent long-term memory",
      "Granular access control, telemetry & audit logs",
    ],
    deliverableBadge: "Turnkey Enterprise AI OS Platform",
  },
  {
    id: "ai-policy-consulting",
    practiceNumber: "Practice 05",
    title: "AI Policy Consulting",
    tagline: "Regulatory Compliance & Governance",
    description:
      "Formulation of enterprise AI governance frameworks, ethical AI guidelines, internal acceptable use policies, regulatory compliance alignment (EU AI Act, NIST, FTC), and risk mitigation.",
    icon: "gavel",
    capabilities: [
      "EU AI Act & global regulatory compliance frameworks",
      "Corporate acceptable use policies & copyright defense",
      "Responsible AI ethics, bias & transparency guidelines",
      "Enterprise data retention & privacy isolation rules",
    ],
    deliverableBadge: "Certified Corporate AI Governance Framework",
  },
  {
    id: "ai-adoption-in-industry",
    practiceNumber: "Practice 06",
    title: "AI Adoption in Industry",
    tagline: "Vertical Transformation & Integration",
    description:
      "Tailored vertical AI integration for finance, healthcare, legal, logistics, and manufacturing. Seamlessly embedding frontier models into legacy databases, ERPs, and operational workflows.",
    icon: "domain",
    capabilities: [
      "Legacy ERP & relational database AI connectors",
      "Domain-specific fine-tuning & sovereign RAG pipelines",
      "On-premise edge computing & air-gapped deployments",
      "Change management & workforce augmentation flywheels",
    ],
    deliverableBadge: "Vertical AI Production Deployment",
  },
  {
    id: "ai-training",
    practiceNumber: "Practice 07",
    title: "AI Training",
    tagline: "Hands-On Engineering Mastery",
    description:
      "Intensive, practical engineering training for technical builders—mastering LangGraph orchestration, vector RAG architectures, local open-weight fine-tuning, and AI-native software development.",
    icon: "school",
    capabilities: [
      "LangGraph & CrewAI production agent orchestration",
      "Hybrid dense-sparse vector RAG engineering",
      "Fine-tuning with LoRA/QLoRA on custom datasets",
      "AI-first full-stack app engineering & deployment",
    ],
    deliverableBadge: "Certified 100x AI Engineer Credentials",
  },
  {
    id: "agentic-gtm",
    practiceNumber: "Practice 08",
    title: "Agentic GTM",
    tagline: "Autonomous Go-to-Market & Revenue Engines",
    description:
      "Autonomous AI-driven go-to-market architecture: intent-based outbound agent swarms, automated lead research, personalized multi-channel outreach, dynamic pipeline acceleration, and high-conversion inbound qualification.",
    icon: "rocket_launch",
    capabilities: [
      "Autonomous prospect research & enriched signal mining",
      "Multi-agent personalized outreach & multi-channel execution",
      "Dynamic ICP scoring, intent tracking & pipeline velocity analytics",
      "Autonomous inbound SDR qualification & instant meeting routing",
    ],
    deliverableBadge: "Turnkey Agentic GTM & Pipeline Engine",
  },
];

export const processStages: ProcessStage[] = [
  {
    step: "01",
    timeframe: "Days 1 - 3",
    title: "Sprint Audit & Diagnostic",
    description:
      "Deep dive telemetry scan across your codebase, LLM spend, latency bottlenecks, and product architecture blockers.",
    deliverable: "Deliverable: Full Audit Doc & Remediation Roadmap",
    icon: "flag",
  },
  {
    step: "02",
    timeframe: "Days 4 - 7",
    title: "Production Blueprint",
    description:
      "Comprehensive architectural topology, schema design, model selection, memory graph strategy, and fixed time-to-value milestones.",
    deliverable: "Deliverable: Verified RFC Architecture Specs",
    icon: "polyline",
  },
  {
    step: "03",
    timeframe: "Weeks 2 - 6",
    title: "Embedded Swarm Execution",
    description:
      "Senior 100x engineers embed directly into your GitHub & Slack. Daily production commits, continuous evals, and sprint reviews.",
    deliverable: "Deliverable: Live Production Code Deployed",
    icon: "rocket",
  },
  {
    step: "04",
    timeframe: "Continuous",
    title: "Handover & Telemetry SRE",
    description:
      "Knowledge transfer to internal engineers, automated observability dashboards, synthetic load monitoring, and guaranteed SLAs.",
    deliverable: "Deliverable: 100% Sovereign Codebase & Telemetry",
    icon: "verified",
  },
];

export const enterpriseAlliances = [
  { name: "OpenAI", category: "Models & API" },
  { name: "Anthropic", category: "Claude Models" },
  { name: "Supabase", category: "Vector Database" },
  { name: "Vercel", category: "Edge Infrastructure" },
  { name: "Stripe", category: "Billing Engine" },
  { name: "AWS", category: "GPU Compute" },
  { name: "Cursor", category: "AI Development" },
  { name: "GitHub", category: "CI/CD & Repos" },
];
