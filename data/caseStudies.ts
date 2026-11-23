export interface CaseStudy {
  id: string;
  tag: string;
  category: "all" | "swarms" | "rag" | "edge" | "fintech" | "devtools";
  categoryLabel: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  technology: string[];
  implementation: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatarInitials: string;
  };
  featured?: boolean;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "wealth-infrastructure",
    tag: "FINTECH AGENT SWARM",
    category: "fintech",
    categoryLabel: "Fintech & Swarms",
    client: "Global Wealth Infrastructure (Enterprise Client Reference)",
    industry: "Wealth Management & Compliance",
    problem:
      "Legacy multi-step compliance verification and underwriting workflows suffered from high human latency (48+ hour review queues) and inconsistent manual risk assessments across global regulatory jurisdictions.",
    solution:
      "Engineered a deterministic multi-agent pipeline with LangGraph orchestration, sub-150ms semantic query routing, and automated human-in-the-loop audit gates.",
    technology: ["LangGraph", "Claude 3.5 Sonnet", "pgvector", "FastAPI", "OpenTelemetry"],
    implementation:
      "Deployed a 4-node agent swarm with sovereign on-premise embeddings, secure audit trails, and automated verification checks in an isolated VPC.",
    results: [
      { metric: "92%", label: "Latency Reduction in Processing" },
      { metric: "100%", label: "Audit Traceability & Compliance" },
      { metric: "< 3s", label: "P99 Decision Response Time" },
    ],
    testimonial: {
      quote:
        "The 100x MINDS engineering team delivered in 3 weeks what our legacy vendor estimated would take 9 months. The sovereign agent architecture has completely hardened our verification pipeline.",
      author: "VP of Engineering",
      role: "Global Wealth Infrastructure",
      avatarInitials: "GW",
    },
    featured: true,
  },
  {
    id: "logistics-automation",
    tag: "LOGISTICS DISPATCH",
    category: "edge",
    categoryLabel: "Edge & Vision",
    client: "Autonomous Fleet Systems (Pilot Implementation)",
    industry: "Supply Chain & Logistics",
    problem:
      "Unstructured freight broker documentation and variable rate contracts caused severe data extraction bottlenecks and delayed cargo routing decisions.",
    solution:
      "Architected custom vision-language parsing pipelines with localized OCR fallback and automated route dispatch matching algorithms.",
    technology: ["vLLM", "TensorRT-LLM", "Next.js 15", "Supabase", "Redis"],
    implementation:
      "Built a real-time event-driven streaming ingestion system running on GPU-accelerated edge nodes with sub-50ms token caching.",
    results: [
      { metric: "18x", label: "Throughput Acceleration" },
      { metric: "99.2%", label: "Contract Extraction Precision" },
      { metric: "48h", label: "Total Time-to-Production" },
    ],
    testimonial: {
      quote:
        "We went from manual PDF parsing to real-time automated dispatching within days of embedding the 100x engineers into our GitHub repository.",
      author: "Head of Product",
      role: "Autonomous Fleet Systems",
      avatarInitials: "AF",
    },
    featured: true,
  },
  {
    id: "healthtech-rag",
    tag: "HEALTHCARE PROTOCOLS",
    category: "rag",
    categoryLabel: "Citation RAG",
    client: "MedProtocol AI (Clinical Research Pilot)",
    industry: "Clinical Data & Biotech",
    problem:
      "Clinical researchers required instant, citation-verified retrieval across 500,000+ medical journals and internal trial datasets with strict zero-hallucination tolerances.",
    solution:
      "Implemented hybrid dense-sparse vector RAG with dynamic BM25 reranking, cryptographic citation anchors, and strict hallucination guardrails.",
    technology: ["Hybrid RAG", "Cohere Rerank", "Supabase pgvector", "Python", "Docker"],
    implementation:
      "Constructed multi-tiered embedding indices with automated citation cross-referencing and confidence threshold gating before response generation.",
    results: [
      { metric: "99.8%", label: "Citation Accuracy Rating" },
      { metric: "14ms", label: "Hybrid Reranker Latency" },
      { metric: "SOC2", label: "Compliant VPC Architecture" },
    ],
    testimonial: {
      quote:
        "The citation anchoring system gave our clinical team complete confidence in utilizing AI synthesis for daily research workflows.",
      author: "Chief Medical Officer",
      role: "MedProtocol AI",
      avatarInitials: "MP",
    },
    featured: true,
  },
  {
    id: "code-review-swarm",
    tag: "DEVTOOLS & COMPLIANCE",
    category: "devtools",
    categoryLabel: "DevTools & Infra",
    client: "ScaleOps Engineering (Cloud Infrastructure)",
    industry: "DevOps & Infrastructure",
    problem:
      "High PR backlog with 120+ active repositories caused security audit bottlenecks and delayed production deployments by over 72 hours per release cycle.",
    solution:
      "Architected an autonomous multi-modal code review swarm integrating AST parser analysis, static CVE vulnerability scanning, and semantic diff explanations.",
    technology: ["GitHub Actions", "DeepSeek-Coder-V2", "Tree-sitter", "Rust", "PostgreSQL"],
    implementation:
      "Orchestrated parallelized worker agents providing inline GitHub annotations with auto-remediation patches for 85% of standard linter and security flaws.",
    results: [
      { metric: "78%", label: "PR Review Cycle Speedup" },
      { metric: "0", label: "Undetected Critical CVEs" },
      { metric: "4.2m", label: "Tokens Processed per Min" },
    ],
    testimonial: {
      quote:
        "The code review swarm acts like having 10 senior staff engineers tirelessly reviewing every single commit with zero cognitive fatigue.",
      author: "Principal Architect",
      role: "ScaleOps Engineering",
      avatarInitials: "SO",
    },
  },
  {
    id: "algorithmic-growth-engine",
    tag: "GTM AUTOMATION",
    category: "swarms",
    categoryLabel: "Agent Swarms",
    client: "VentureCraft Studio (Portfolio Operations)",
    industry: "Venture Studio & Growth",
    problem:
      "Portfolio companies struggled to rapidly test 50+ distribution channels with high CAC and fragmented lead enrichment across disconnected CRM systems.",
    solution:
      "Deployed autonomous inbound & outbound agent pipelines with dynamic ICP scoring, personalized multi-channel outreach synthesis, and automated intent signals.",
    technology: ["Temporal.io", "OpenAI GPT-4o", "Clay API", "Next.js", "Redis"],
    implementation:
      "Integrated unified webhook ingestion with deterministic rate limiting, automated email domain reputation monitors, and instant reply qualification.",
    results: [
      { metric: "3.4x", label: "Qualified Pipeline Increase" },
      { metric: "-64%", label: "Acquisition Cost Reduction" },
      { metric: "100%", label: "Automated Lead Enrichment" },
    ],
    testimonial: {
      quote:
        "Our seed investments scaled from $10k to $100k ARR in half the standard runway time thanks to 100x MINDS GTM automation engine.",
      author: "Managing Partner",
      role: "VentureCraft Studio",
      avatarInitials: "VC",
    },
  },
  {
    id: "sovereign-llm-cloud",
    tag: "SOVEREIGN AI INFRA",
    category: "edge",
    categoryLabel: "Edge & Sovereign",
    client: "Aegis Data Solutions (Government & Defense)",
    industry: "Enterprise Security & Defense",
    problem:
      "Strict data sovereignty regulations prevented the use of public AI API endpoints for analyzing confidential documents and geospatial telemetry.",
    solution:
      "Designed and deployed air-gapped on-premise inference clusters with quantized open-weight frontier models and hardware-level encryption.",
    technology: ["vLLM", "Llama 3.3 70B", "NVIDIA H100", "Kubernetes", "Triton"],
    implementation:
      "Turnkey deployment of containerized private cluster architecture with encrypted vector persistence and zero telemetry exfiltration.",
    results: [
      { metric: "100%", label: "Data Sovereignty Guarantee" },
      { metric: "< 20ms", label: "Local Model Inference TTFT" },
      { metric: "FIPS", label: "Security Compliant Enclave" },
    ],
    testimonial: {
      quote:
        "100x MINDS enabled us to deploy frontier intelligence in a completely isolated environment with zero compromises on security or performance.",
      author: "Chief Information Security Officer",
      role: "Aegis Data Solutions",
      avatarInitials: "AD",
    },
  },
];
