export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  avatar: string;
  badge: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const foundingTeam: TeamMember[] = [
  {
    id: "elena-rostova",
    name: "Dr. Elena Rostova",
    role: "Founder & Chief Architect",
    credentials: "Ex-Google Brain • Stanford AI Lab",
    bio: "Led distributed transformer inference pipelines at scale. Author of 14 seminal papers on LLM parameter efficiency and autonomous agent collaboration.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtdiKGP8RLxqa_Dkzq9p41YeefxNrbzZ8E6zu-z0l4bZrpaAZtlozG7AlTxe4_hshbDLSgrpzIWdhmwwyDCtzqIx8_T4ChlwzQcGzCnSXcNKAtYGrwnjgNiwWt4Nu730VyEeeIo6B7_1DpicarvMyHfKei8Y1aSeATmOTILNfvJEVCTQOPY5qlC24XylwpAcGcoynfSlqi2f8AeKAylrKpHINZ_e36VzFdGVoJVEgIF8-Lf4VHGyRG",
    badge: "FOUNDER / CEO",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "marcus-lin",
    name: "Marcus Lin",
    role: "Head of Product Systems",
    credentials: "Staff Engineer @ Vercel Alum",
    bio: "Pioneered reactive generative UI architecture and stream rendering paradigms. Advisor to top YC SaaS companies on frontend velocity.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWzkbLzwSc8ZaBKfLs_3mRA4f1YruEd4geuajzDiuUScQo3yQWCAztHBZrcKlwZCffER0tXseb4QdVfmp4ytx_Q5EBj1b8srhprndYw6u8-tf5LGvsGDuU8G75mBrjwD1NFezHFRZ-lt1EgE3HpSnF2U-Gs-ZfgA57A2ACXpy66cptTItqB53bC5-kdZDf9D3-WcsjUtm_x9dhbyL11dG1fJt5xTn-DngwxsCYqAZDQvdBWp1vvFu6",
    badge: "CO-FOUNDER / CPO",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "alex-vance",
    name: "Alex Vance",
    role: "Head of Venture & GTM",
    credentials: "Scaled 3 YC Startups to $10M ARR",
    bio: "Growth engineering veteran specializing in algorithmic acquisition flywheels, programmatic distribution, and early-stage capital syndication.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5emIjorCF1jbIA8u4lVrBNUyo_l7Bx2EfN3WDFlXofT-GpPXfbPiEBwWQNOaL5cJkL1B1FWZP1OCoqIGI5Rjmmx6futW2MogHr5isOScG0DScsC1p2ijsHlZI7J8WLVZQV_lR_6CAGFUI65cOMFXP6ptUXd55pRqlpk_JxyZCBsa7CL0FAXscYf7TWQYNtH8kd7PJMuJIsky4hue9XHG8x2NWMNE8ikxW0YzzUlZPZu_I-K136_2F",
    badge: "PARTNER / GTM",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "aris-thorne",
    name: "Dr. Aris Thorne",
    role: "Director of AI Fellowship",
    credentials: "Ex-DeepMind Principal Researcher",
    bio: "Research focus on low-latency inference quantization and distributed reinforcement learning from human and compiler feedback.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVQ5Vgnov9xdOnIFCdOiDstpBwhowqUizthaE39Ubzd4FH4uelqp9fTRJshzCFu2zzfeBaTqTu_dOQBqhYaTdT5hDBMVYLPC6vgW-rgV5Rf7A6ikO7xBdT3Eoy9D3entHMm3_pk3iwI_DSgVa-FQItVD8KDWdFoCsJOLyVKV7Ev3IWI9zs2xmMlET9ZYwrNNYSYaqIe86ta2KHK_hrCve8Rf84mAZYt7fEkdpnJg45vbcSEaweAZ2",
    badge: "FELLOWSHIP DIRECTOR",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "sofia-k",
    name: "Dr. Sofia K.",
    role: "Lead Agentic Systems Architect",
    credentials: "Ex-OpenAI Alignment Fellow",
    bio: "Architecting autonomous multi-agent consensus protocols, tool verification sandboxes, and production agent telemetry.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWr0zvFkLx3rGbARAzyb5DVUP0qB0ybMB2K6s-y1pGYGBEpNc_deNZn5bs53ldVbTg4a-soa5Nv9ZthrpSXKgWwVnUdKUc_PMJUArDKFyyzrRkrquJuvd0GFCO0_JUpfHT9As5QYuNa73kc-O9sIfmOjOplfN9Phv7YFbjeckPmvb7He6C46nCVTDzjtkwSb1nHoAEBwquCWM4RHGdjNzDvbZD8BsMmRYDR2noS-_z43BpR_J6xJnf",
    badge: "RESEARCH LEAD",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    role: "Head of Cognitive UX",
    credentials: "Design Lead @ Humane Alum",
    bio: "Pioneering spatial interface paradigms, dark kinetic glassmorphic design systems, and responsive cognitive AI feedback states.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvZtVIzYPLhxKdBD8llXoeORgvXJi0YeZkAqgCYcRolGxzLAiAoHaI2GlBfilUrBwAkAYijZXfXR9A1v2iJimmz7QCG2SkmEK8vWlEtN7gOLY_2l0Fd9NkCTD5fxCIMBefUwpxesLzGfptrTlLxv_qxykY1DxOhwV2GgIBaKaDVYGISdgPXg7wwPZGDAZ5rRt_Xdeyvdu4zK15SixpoGUnqhxHpvJye1g4ub5S1LMQh4QHZyyYQsqr",
    badge: "DESIGN DIRECTOR",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
];
