/** Early-access research tracks. These are not paid plans. */
export type PlanId = "free" | "learner" | "jobseeker" | "switcher" | "interview";

export const MODULES = [
  { id: "profile", name: "Smart Profile", blurb: "A structured career profile that can become the source for future tools." },
  { id: "analysis", name: "Smart Analysis", blurb: "A planned view of strengths, gaps, market positioning, and next roles." },
  { id: "resume", name: "Smart Resume", blurb: "Planned job-specific resume and cover-letter support." },
  { id: "practice", name: "Practice Lab", blurb: "Planned interview practice with structured, useful feedback." },
  { id: "hire", name: "Smart Hire", blurb: "A planned end-to-end hiring-process rehearsal." },
  { id: "experience", name: "Experience Lab", blurb: "Planned realistic work simulations that can support portfolio proof." },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];

export type Plan = {
  id: PlanId;
  name: string;
  persona: string;
  who: string;
  builtFor: string;
  priceMonthly: number;
  hero: ModuleId;
  meters: Record<ModuleId, string | null>;
  signature: string[];
  featured?: boolean;
  badge?: string;
  note?: string;
};

/** Retained so older, unrendered comparison components remain type-safe. */
export const ANNUAL_DISCOUNT = 0;

export const PLANS: Plan[] = [
  {
    id: "free", name: "Starter", persona: "Explore the pilot",
    who: "Join the pilot, create an account, and tell us which job-search problem matters most.",
    builtFor: "Joining the research pilot", priceMonthly: 0, hero: "analysis",
    meters: { profile: "Pilot account", analysis: "Roadmap updates", resume: null, practice: null, hire: null, experience: null },
    signature: ["Private pilot account and status dashboard", "No card, charge, or payment details"],
    note: "Promo code required",
  },
  {
    id: "learner", name: "Build", persona: "Students & new grads",
    who: "You need credible ways to demonstrate ability before you have formal experience.",
    builtFor: "Building portfolio proof", priceMonthly: 0, hero: "experience",
    meters: { profile: "Pilot account", analysis: "Research priority", resume: "Roadmap", practice: "Roadmap", hire: "Roadmap", experience: "Primary research track" },
    signature: ["Help shape realistic role-specific task simulations", "Explore how completed work could become honest portfolio proof", "Prioritise the roles and industries we should build first"],
  },
  {
    id: "jobseeker", name: "Apply", persona: "Actively applying",
    who: "You are applying now and want more relevant, focused applications.",
    builtFor: "Improving application quality", priceMonthly: 0, hero: "resume",
    meters: { profile: "Pilot account", analysis: "Roadmap", resume: "Primary research track", practice: "Roadmap", hire: "Roadmap", experience: "Roadmap" },
    signature: ["Help define useful job-specific resume guidance", "Shape a transparent job-fit review instead of a mystery score", "Tell us which application workflow wastes the most time"],
    featured: true, badge: "Popular interest",
  },
  {
    id: "switcher", name: "Switch", persona: "Career changers",
    who: "You can do more than your current title suggests and need to reposition your story.",
    builtFor: "Translating transferable skills", priceMonthly: 0, hero: "analysis",
    meters: { profile: "Pilot account", analysis: "Primary research track", resume: "Roadmap", practice: "Roadmap", hire: "Roadmap", experience: "Research priority" },
    signature: ["Help shape a useful transferable-skills map", "Explore practical ways to close credible skill gaps", "Prioritise career-change interview and portfolio support"],
  },
  {
    id: "interview", name: "Interview", persona: "Interviews ahead",
    who: "You have interviews ahead and want a safer place to practise out loud.",
    builtFor: "Practising before interview day", priceMonthly: 0, hero: "practice",
    meters: { profile: "Pilot account", analysis: "Roadmap", resume: "Roadmap", practice: "Primary research track", hire: "Research priority", experience: "Roadmap" },
    signature: ["Help define realistic interview formats and feedback", "Prioritise role-specific questions over generic scripts", "Shape progress feedback that is clear and actionable"],
  },
];

export const PLAN_BY_ID = Object.fromEntries(PLANS.map((plan) => [plan.id, plan])) as Record<PlanId, Plan>;
export const PERSONA_PLANS = PLANS.filter((plan) => plan.id !== "free");

export type Pack = { id: string; name: string; price: number; for: string; items: readonly string[]; featured?: boolean };
export const PACKS: readonly Pack[] = [];

export const MATCHER = [
  { label: "I'm still studying or just graduated", planId: "learner" as PlanId },
  { label: "I'm applying to jobs right now", planId: "jobseeker" as PlanId },
  { label: "I'm moving into a different field", planId: "switcher" as PlanId },
  { label: "I have interviews ahead", planId: "interview" as PlanId },
];

export function monthlyPrice(plan: Plan) { return plan.priceMonthly; }
export function formatPrice(n: number) { return n.toFixed(2); }

