export interface EcosystemPillar {
  id: string;
  vector: string;
  title: string;
  description: string;
  icon: string;
  features: {
    title: string;
    stat: string;
    icon: string;
  }[];
  connection: string;
}

export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: "academy",
    vector: "Vector 01",
    title: "Academy",
    description:
      "Intensive, project-driven engineering cohorts, technical sprints, and peer-to-peer hackathons designed to produce top 0.1% software architects.",
    icon: "school",
    features: [
      { title: "10-Week AI Architect Cohorts", stat: "98.4% Completion", icon: "terminal" },
      { title: "Global Peer Hackathons", stat: "Bi-weekly", icon: "groups" },
      { title: "Masterclasses from Unicorn Founders", stat: "Live & On-demand", icon: "record_voice_over" },
    ],
    connection: "Continuous pipeline feeder to Software Suite & Venture Network",
  },
  {
    id: "software-suite",
    vector: "Vector 02",
    title: "Software Suite",
    description:
      "Proprietary internal accelerators and toolchains that shave 120+ hours off production-grade autonomous agent and SaaS releases.",
    icon: "developer_board",
    features: [
      { title: "MindFlow AI 2.0", stat: "Autonomous context memory router", icon: "psychology" },
      { title: "SkillSprint Pro", stat: "Real-time micro-assessment telemetry", icon: "speed" },
      { title: "Launchpad OS", stat: "Multi-tenant agent deployment rail", icon: "rocket_launch" },
    ],
    connection: "Zero-friction builder stack powering all cohorts & incubation",
  },
  {
    id: "venture-network",
    vector: "Vector 03",
    title: "Venture Network",
    description:
      "Direct syndicate access connecting verified high-velocity builders with seed-stage capital, non-dilutive grants, and tier-1 angel syndicates.",
    icon: "paid",
    features: [
      { title: "100x Pre-Seed & Incubation Fund", stat: "Non-dilutive grant pool", icon: "monetization_on" },
      { title: "140+ Angel & Scout Partners", stat: "YC / a16z / Seed syndicates", icon: "handshake" },
      { title: "Quarterly Demo Day Pitch Ring", stat: "Live investor showcase", icon: "visibility" },
    ],
    connection: "Fueling capital velocity for breakthrough cohort products",
  },
  {
    id: "talent-foundry",
    vector: "Vector 04",
    title: "Talent Foundry",
    description:
      "Global verified talent matrix matching elite autonomous systems engineers with hyper-growth venture-backed tech startups worldwide.",
    icon: "workspace_premium",
    features: [
      { title: "Cryptographic Credential Passports", stat: "On-chain & verified telemetry", icon: "verified" },
      { title: "Direct Placement Network", stat: "Zero recruiter intermediary", icon: "hub" },
      { title: "Peer Architecture Reviews", stat: "Continuous code audits", icon: "code" },
    ],
    connection: "Closing the loop from learning to high-impact career transformation",
  },
];

export const incubationFundData = {
  title: "The 100x Pre-Seed & Incubation Fund",
  tagline: "High-Conviction Capital for Sovereign Builders",
  description:
    "We provide non-dilutive innovation grants, compute credits, and early-stage syndicate backing directly to validated projects developed within our cohorts.",
  benefits: [
    { title: "Non-Dilutive Innovation Grants", description: "Direct capital backing for top capstone MVPs." },
    { title: "Enterprise GPU Compute Rails", description: "$10,000+ credits across cloud infrastructure partners." },
    { title: "Direct Tier-1 Investor Access", description: "Curated introductions to 140+ active venture scouts." },
    { title: "Zero-Cost Office & Cloud Access", description: "Physical builder hubs in SF, London, and Berlin." },
  ],
};
