export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  highlight: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "elena-r",
    quote:
      "Before 100x MINDS, I was stuck tweaking prompt templates. In 6 weeks, I built and launched MindFlow-integrated agents that automated our entire client onboarding pipeline. I went from Senior Dev to Lead Architect in 3 months.",
    author: "Elena Rostova",
    role: "Lead AI Architect",
    company: "HyperScale Labs",
    initials: "EL",
    rating: 5,
    highlight: "Promoted to Lead Architect in 3 months",
  },
  {
    id: "david-c",
    quote:
      "The peer density here is unlike any platform on the web. During the Growth Sprint, my mentor pushed me to release Launchpad OS integrations that brought our ARR from zero to $18K within 45 days.",
    author: "David Chen",
    role: "Founder",
    company: "TensorFlowing (YC W24)",
    initials: "DC",
    rating: 5,
    highlight: "Zero to $18K ARR in 45 days",
  },
  {
    id: "sarah-m",
    quote:
      "100x MINDS doesn’t waste time with hand-holding theory. You are dropped directly into high-intensity sandboxes. The verified passport credential opened doors at top European AI research hubs immediately.",
    author: "Sarah Mitchell",
    role: "Head of Growth",
    company: "Synapse Systems",
    initials: "SM",
    rating: 5,
    highlight: "Top European AI Research Placement",
  },
  {
    id: "tariq-k",
    quote:
      "The multi-agent systems curriculum gave me the exact architecture blueprint to replace our legacy manual scraping pipelines with an autonomous LangGraph swarm. Saved our company $120k annually in cloud compute.",
    author: "Tariq Khan",
    role: "Principal Systems Engineer",
    company: "Nexus Dynamics",
    initials: "TK",
    rating: 5,
    highlight: "$120k annual cloud savings",
  },
];
