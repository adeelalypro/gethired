/**
 * Persona-shaped pricing.
 *
 * The design principle: every persona hits a DIFFERENT bottleneck resource, so
 * plans differ by SHAPE, not by quantity. A learner needs Experience Lab volume
 * and almost no resumes. Someone interviewing next Tuesday needs the inverse.
 * Selling both of them the same "Plus" tier makes each pay for capacity they
 * will never touch.
 *
 * Price ladder tracks proximity to a paycheck:
 *   Starter 0 -> Build 6.90 -> Apply 12.90 -> Switch 18.90 -> Interview 24.90
 */

export type PlanId = "free" | "learner" | "jobseeker" | "switcher" | "interview";

/** The six product modules. These are the rows of the comparison table. */
export const MODULES = [
  {
    id: "profile",
    name: "Smart Profile",
    blurb: "A polished, AI-assisted professional identity you can share as a link.",
  },
  {
    id: "analysis",
    name: "Smart Analysis",
    blurb: "Your corporate worth, strengths, skill gaps, salary band and roadmap.",
  },
  {
    id: "resume",
    name: "Smart Resume",
    blurb: "Job-specific, ATS-optimized resumes and cover letters from any JD.",
  },
  {
    id: "practice",
    name: "Practice Lab",
    blurb: "Live mock interviews with an adaptive AI interviewer, then feedback.",
  },
  {
    id: "hire",
    name: "Smart Hire",
    blurb: "The whole hiring funnel simulated, screening through final decision.",
  },
  {
    id: "experience",
    name: "Experience Lab",
    blurb: "Role-specific workplace task simulations that become real portfolio proof.",
  },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];

export type Plan = {
  id: PlanId;
  /** Plan name — a plain verb for the action this persona is taking */
  name: string;
  /** Who this is for, in their own words */
  persona: string;
  /** The single sentence that makes someone self-identify */
  who: string;
  /** Customer-facing outcome this plan is built around. Never phrase this as a
   *  resource or a limit — it is the thing they are trying to achieve. */
  builtFor: string;
  priceMonthly: number;
  /** Which module is the flagship for this persona — drives the card highlight */
  hero: ModuleId;
  /** Meter value per module. `null` means not included. */
  meters: Record<ModuleId, string | null>;
  /** Capabilities that exist only on this plan. This is what stops it being a quantity ladder. */
  signature: string[];
  featured?: boolean;
  badge?: string;
  note?: string;
};

/** Annual billing discount, applied across every paid plan. */
export const ANNUAL_DISCOUNT = 0.4;

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Starter",
    persona: "Start here",
    who: "See where you stand before you commit to anything.",
    builtFor: "Finding out where you stand",
    priceMonthly: 0,
    hero: "analysis",
    meters: {
      profile: "Basic profile",
      analysis: "1 full analysis",
      resume: "3 resumes total",
      practice: "15 interview minutes",
      hire: null,
      experience: "1 simulation",
    },
    signature: [
      "Your profile score, strengths and salary band",
      "No card, no countdown",
    ],
    note: "No credit card required",
  },
  {
    id: "learner",
    name: "Build",
    persona: "Students & new grads",
    who: "Every job wants experience. Nobody wants to give you the first one.",
    builtFor: "Getting real work onto your CV",
    priceMonthly: 6.9,
    hero: "experience",
    meters: {
      profile: "Custom public profile",
      analysis: "Weekly + skill-gap roadmap",
      resume: "10 / month",
      practice: "120 minutes / month",
      hire: "1 simulation / month",
      experience: "20 simulations / month",
    },
    signature: [
      "20 workplace simulations a month, drawn from the first 90 days of the job",
      "A verified portfolio of finished work you can send to a recruiter",
      "Guided tracks for engineering, marketing, finance and design",
      "30% off with a student email",
    ],
  },
  {
    id: "jobseeker",
    name: "Apply",
    persona: "Actively applying",
    who: "You have the experience. You're sending the same resume everywhere and hearing nothing back.",
    builtFor: "Getting your resume read by a person",
    priceMonthly: 12.9,
    hero: "resume",
    meters: {
      profile: "Custom public profile + vanity URL",
      analysis: "Daily",
      resume: "300 / month (25 / day)",
      practice: "150 minutes / month",
      hire: "2 simulations / month",
      experience: "3 simulations / month",
    },
    signature: [
      "Paste a job link, get a resume and cover letter written for that posting in about 30 seconds",
      "A match score before you apply, so you stop spending applications on long shots",
      "One tracker for every application, with follow-up reminders",
      "Import up to 20 postings at once and work through them in a sitting",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    id: "switcher",
    name: "Switch",
    persona: "Changing fields",
    who: "You know you can do the work. Your resume still argues for the career you're leaving.",
    builtFor: "Proving you can do the new job",
    priceMonthly: 18.9,
    hero: "analysis",
    meters: {
      profile: "Custom public profile, repositioned",
      analysis: "Daily, across 3 target roles",
      resume: "150 / month",
      practice: "300 minutes / month",
      hire: "4 simulations / month",
      experience: "12 simulations / month, in your target field",
    },
    signature: [
      "A map of which of your skills carry across, and which you still need",
      "A 90-day plan to close the gap, broken into weekly steps",
      "Simulations set in the field you're moving into, not the one you're leaving",
      "Practice on the “why are you switching?” question until the answer lands",
    ],
  },
  {
    id: "interview",
    name: "Interview",
    persona: "Interviews booked",
    who: "You know the answers. You just haven't had to say them out loud yet.",
    builtFor: "Being ready on the day",
    priceMonthly: 24.9,
    hero: "practice",
    meters: {
      profile: "Custom public profile",
      analysis: "Daily",
      resume: "60 / month",
      practice: "900 minutes / month",
      hire: "Unlimited",
      experience: "3 simulations / month",
    },
    signature: [
      "15 hours of live mock interviews a month",
      "HR, technical, case study, reasoning and presentation rounds",
      "Question sets built for the specific company and role",
      "Every session recorded, transcribed and scored, so you can see what improved",
      "Low-latency voice, so it feels like a conversation and not a form",
    ],
  },
];

export const PLAN_BY_ID = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<PlanId, Plan>;

/** Paid plans only — the persona cards. */
export const PERSONA_PLANS = PLANS.filter((p) => p.id !== "free");

/**
 * One-time credit packs. Shaped by persona too, rather than the usual
 * small/medium/large ladder. Credits never expire and stack with a subscription.
 */
export type Pack = {
  id: string;
  name: string;
  price: number;
  for: string;
  items: readonly string[];
  featured?: boolean;
};

export const PACKS: readonly Pack[] = [
  {
    id: "sprint",
    name: "Interview Pack",
    price: 19.9,
    for: "One round of interviews coming up",
    items: ["400 interview minutes", "5 Smart Hire simulations", "20 tailored resumes"],
    featured: true,
  },
  {
    id: "blitz",
    name: "Apply Pack",
    price: 14.9,
    for: "A heavy month of applying",
    items: ["250 tailored resumes", "100 interview minutes", "2 Experience Labs"],
  },
  {
    id: "builder",
    name: "Build Pack",
    price: 12.9,
    for: "Filling the experience gap on a CV",
    items: ["15 Experience Labs", "60 interview minutes", "25 tailored resumes"],
  },
];

/** The self-select question above the pricing grid. */
export const MATCHER = [
  { label: "I'm still studying or just graduated", planId: "learner" as PlanId },
  { label: "I'm applying to jobs right now", planId: "jobseeker" as PlanId },
  { label: "I'm moving into a different field", planId: "switcher" as PlanId },
  { label: "I have interviews booked", planId: "interview" as PlanId },
];

export function monthlyPrice(plan: Plan, annual: boolean) {
  if (plan.priceMonthly === 0) return 0;
  return annual ? plan.priceMonthly * (1 - ANNUAL_DISCOUNT) : plan.priceMonthly;
}

export function formatPrice(n: number) {
  return n.toFixed(2);
}
