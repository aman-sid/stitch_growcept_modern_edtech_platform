export interface CommunityChannel {
  id: string;
  name: string;
  tags: string[];
  icon: string;
  title: string;
  description: string;
  stats: string;
}

export interface CommunityPrinciple {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface LocalChapter {
  city: string;
  country: string;
  membersCount: string;
  leads: string;
  status: "Active Hub" | "Emerging";
}

export const communityChannels: CommunityChannel[] = [
  {
    id: "prompt-lab",
    name: "Autonomous Agent Blueprints",
    tags: ["#prompt-lab", "#neural-agents"],
    icon: "psychology",
    title: "Autonomous Agent Blueprints",
    description:
      "Dissect, benchmark, and deploy multi-agent loops, reasoning chains, and LangGraph/CrewAI pipelines. Shared evals and production latency optimization.",
    stats: "1,420 Active Threads",
  },
  {
    id: "talent-pairing",
    name: "Algorithmic Talent Pairing",
    tags: ["#co-founder-matching", "#talent-pool"],
    icon: "handshake",
    title: "Algorithmic Talent Pairing",
    description:
      "Technical AI researchers pair with growth hackers and serial operators. Weekly matching sprint with verified equity frameworks and trial hack projects.",
    stats: "89 Teams Formed",
  },
  {
    id: "launch-station",
    name: "Product Hunt & X Velocity Ring",
    tags: ["#launch-station", "#distribution"],
    icon: "rocket_launch",
    title: "Product Hunt & X Velocity Ring",
    description:
      "Coordinate high-impact public product launches, amplify member drops across X/Twitter, and access coordinated peer feedback loops.",
    stats: "340+ Drops Launched",
  },
  {
    id: "architecture-reviews",
    name: "Peer Architecture Reviews",
    tags: ["#code-audits", "#rfc-blueprints"],
    icon: "code",
    title: "Peer Architecture Reviews",
    description:
      "Submit system architecture RFCs, database schema diagrams, and prompt pipelines for rigorous peer and mentor scrutiny.",
    stats: "620+ RFCs Audited",
  },
  {
    id: "cap-table-advisory",
    name: "Cap-Table Advisory & Pitch Reviews",
    tags: ["#founders", "#pitch-deck-roast"],
    icon: "paid",
    title: "Cap-Table Advisory & Pitch Reviews",
    description:
      "Bi-weekly live pitch deck roasts and cap-table structuring guidance with venture partners and angel investors.",
    stats: "140+ Decks Reviewed",
  },
];

export const communityPrinciples: CommunityPrinciple[] = [
  {
    number: "01",
    title: "Give First Mentality",
    description:
      "Every member actively shares architectural insights, open-sources reusable boilerplate, and provides constructive feedback before asking for favors.",
    icon: "volunteer_activism",
  },
  {
    number: "02",
    title: "Radical Transparency & Open Code",
    description:
      "We learn faster in public. Share real production metrics, post-mortems of failed runs, and verified telemetry with zero sugarcoating.",
    icon: "visibility",
  },
  {
    number: "03",
    title: "High Velocity, Zero Fluff",
    description:
      "Theory is useful only when converted into running code within hours. We celebrate shipping speed, real users, and measurable capability leaps.",
    icon: "speed",
  },
];

export const localChapters: LocalChapter[] = [
  { city: "San Francisco", country: "United States", membersCount: "6,200+", leads: "Alex V. & Sofia K.", status: "Active Hub" },
  { city: "London", country: "United Kingdom", membersCount: "4,800+", leads: "Dr. Aris Thorne", status: "Active Hub" },
  { city: "Berlin", country: "Germany", membersCount: "3,400+", leads: "Elena Rostova", status: "Active Hub" },
  { city: "Singapore", country: "Singapore", membersCount: "2,900+", leads: "Marcus Lin", status: "Active Hub" },
  { city: "Bengaluru", country: "India", membersCount: "5,100+", leads: "Maya Patel", status: "Active Hub" },
  { city: "Tokyo", country: "Japan", membersCount: "1,800+", leads: "Kenji T.", status: "Emerging" },
  { city: "Toronto", country: "Canada", membersCount: "2,200+", leads: "David Chen", status: "Active Hub" },
  { city: "Sydney", country: "Australia", membersCount: "1,400+", leads: "Liam O.", status: "Emerging" },
];
