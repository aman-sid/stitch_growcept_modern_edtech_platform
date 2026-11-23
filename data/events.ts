export interface EventItem {
  id: string;
  title: string;
  type: "Masterclass" | "Hackathon" | "Demo Day" | "Office Hours" | "Keynote";
  date: string;
  time: string;
  location: string;
  host: string;
  hostRole: string;
  attendeesCount: string;
  description: string;
  tags: string[];
}

export const eventsData: EventItem[] = [
  {
    id: "multi-agent-swarms-masterclass",
    title: "Orchestrating Autonomous LangGraph Swarms in Production",
    type: "Masterclass",
    date: "May 22, 2025",
    time: "6:00 PM UTC",
    location: "Live Virtual War-Room",
    host: "Dr. Sofia K.",
    hostRole: "Ex-OpenAI Alignment Fellow",
    attendeesCount: "1,240 Registered",
    description:
      "Deep architectural teardown of real-time state persistence, cyclic multi-agent graphs, and sub-100ms vector memory routing.",
    tags: ["LangGraph", "Multi-Agent", "State Machines"],
  },
  {
    id: "q2-global-hackathon",
    title: "100x Global 48-Hour Micro-SaaS Hackathon",
    type: "Hackathon",
    date: "June 6-8, 2025",
    time: "48 Hours Global",
    location: "Discord + CohortSync",
    host: "Elena Rostova & Marcus Lin",
    hostRole: "Founding Council",
    attendeesCount: "2,800+ Builders",
    description:
      "Build, deploy, and monetize a functional AI micro-SaaS in 48 hours. $25,000 in non-dilutive prizes + venture scout reviews.",
    tags: ["Hackathon", "Micro-SaaS", "Launchpad OS", "Prizes"],
  },
  {
    id: "venture-demo-day-q2",
    title: "Cohort 42 Investor Demo Day & Pitch Ring",
    type: "Demo Day",
    date: "June 26, 2025",
    time: "5:00 PM UTC",
    location: "Private Stream (SF / London)",
    host: "Alex Vance & Dr. Aris Thorne",
    hostRole: "Venture Partners",
    attendeesCount: "140+ Angel Syndicates",
    description:
      "Top 12 graduated projects present live telemetry, traction metrics, and software architecture to verified pre-seed investors.",
    tags: ["Demo Day", "Pre-Seed", "Investors", "Startups"],
  },
  {
    id: "spatial-copilot-ux",
    title: "Designing for Latency & Non-Deterministic AI UX",
    type: "Keynote",
    date: "July 10, 2025",
    time: "7:00 PM UTC",
    location: "Live Stream",
    host: "Maya Patel",
    hostRole: "Head of Cognitive UX",
    attendeesCount: "940 Registered",
    description:
      "How to design dark kinetic interfaces, optimistic visual states, and spatial canvases for stochastic LLM outputs.",
    tags: ["Cognitive UX", "Glassmorphism", "Design Systems"],
  },
];
