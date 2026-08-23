import { SITE } from "./site";

export const STAGES = [
  {
    n: "01", key: "profile", short: "Join", title: "Activate your pilot account",
    heading: "Use the promo code you received",
    body: "Create a private account without entering a card. We save the track you select so the team can understand what early users need most.",
    module: "Available now",
  },
  {
    n: "02", key: "analysis", short: "Choose", title: "Choose your priority",
    heading: "Tell us where the job search is hardest",
    body: "Pick Build, Apply, Switch, or Interview. Your dashboard confirms your choice and lets you signal that you want to take part in that pilot track.",
    module: "Available now",
  },
  {
    n: "03", key: "practice", short: "Shape", title: "Help shape the product",
    heading: "Follow the roadmap as the pilot grows",
    body: "We use aggregated signup interest to prioritise what gets built first. Product capabilities are released gradually; there is no promise that every concept is available today.",
    module: "Rolling pilot",
  },
] as const;

export type FeatureId = "profile" | "analysis" | "resume" | "practice" | "hire" | "experience";

export type Feature = {
  id: FeatureId;
  name: string;
  kicker: string;
  headline: string;
  body: string;
  bullets: readonly string[];
  status: "Pilot foundation" | "In research" | "Roadmap";
};

export const FEATURES: readonly Feature[] = [
  {
    id: "profile", name: "Career Profile", kicker: "A reliable starting point",
    headline: "One career record, shaped around your goals",
    body: "The roadmap starts with a structured profile that future tools can use consistently. During this pilot, your account and selected track form the first version of that foundation.",
    bullets: ["Account and selected track saved now", "Profile detail and sharing controls on the roadmap", "Privacy choices before anything becomes public"],
    status: "Pilot foundation",
  },
  {
    id: "analysis", name: "Career Analysis", kicker: "Clarity before action",
    headline: "Strengths, gaps, and market positioning you can understand",
    body: "We are researching a transparent analysis experience: why a role may fit, which skills matter, and what an estimated salary range is based on. It will avoid unsupported claims about a person’s 'worth'.",
    bullets: ["Explainable signals instead of a mystery score", "Estimated ranges clearly labelled", "Practical next steps, not generic encouragement"],
    status: "In research",
  },
  {
    id: "resume", name: "Application Studio", kicker: "Apply with intent",
    headline: "Job-specific guidance without hiding the reasoning",
    body: "The planned application tools will help people compare a resume with a specific posting, strengthen relevant evidence, and prepare a tailored draft they remain responsible for reviewing.",
    bullets: ["Posting-specific relevance checks", "Editable resume and cover-letter drafts", "Clear prompts to verify every claim"],
    status: "In research",
  },
  {
    id: "practice", name: "Interview Practice", kicker: "Rehearse safely",
    headline: "Practice out loud before the real conversation",
    body: "The Interview track is helping define realistic formats, useful follow-up questions, and feedback that supports improvement without pretending to predict a hiring decision.",
    bullets: ["Role-aware practice scenarios", "Structured feedback on answer quality", "Progress that users can review over time"],
    status: "In research",
  },
  {
    id: "experience", name: "Experience Studio", kicker: "Show what you can do",
    headline: "Realistic simulations, honestly labelled",
    body: "We are exploring role-specific projects based on realistic workplace situations. Completed work would be presented as simulated portfolio evidence—not employment or an unearned credential.",
    bullets: ["Practical briefs rather than toy exercises", "Clear simulated-work labels", "Structured review before any verified status"],
    status: "Roadmap",
  },
  {
    id: "hire", name: "Hiring Rehearsal", kicker: "See the whole journey",
    headline: "Understand the stages before you enter them",
    body: "A later roadmap concept brings screening, recruiter conversations, interviews, and decision stages into one guided rehearsal. It is a learning tool, not a guarantee or prediction of employment.",
    bullets: ["Stage-by-stage preparation", "Role-specific scenarios", "No claim to predict real employer decisions"],
    status: "Roadmap",
  },
];

export const FAQS = [
  {
    q: `What is ${SITE.name} today?`,
    a: `${SITE.name} is a private early-access pilot. Today you can create a secure account with a promo code, choose the career track you care about, manage your profile, and confirm your interest. The resume, interview, analysis, simulation, and hiring-rehearsal experiences shown on this site are a roadmap being researched and built in stages.`,
  },
  {
    q: "Why do I need a promo code?",
    a: "The promo code keeps the pilot controlled and lets the team compare interest from different communities or campaigns. It is not a discount code and does not start a paid subscription.",
  },
  {
    q: "Will I be charged?",
    a: "No. The current pilot does not collect card details and does not charge users. If paid services are introduced later, the price, terms, and refund policy will be shown before anyone is asked to pay.",
  },
  {
    q: "What happens after I sign up?",
    a: "You enter an early-access dashboard showing your chosen track, access campaign, and pilot status. You can confirm your interest, update your name or password, contact the team, or delete your account.",
  },
  {
    q: "How is my information used?",
    a: "Account details, your selected track, and basic activity are used to operate the pilot and understand demand. Contact and product-update submissions are stored for follow-up. We do not sell this information. See the Privacy Policy for the full current-data description.",
  },
  {
    q: "Do you already work with universities or employers?",
    a: "We are exploring pilot relationships with universities, colleges, workforce programmes, and teams. The site does not claim that institutional dashboards or placement tracking are available today.",
  },
] as const;

export const PROOF = [
  { stat: "0", label: "cards or payment details required" },
  { stat: "4", label: "career priorities you can select" },
  { stat: "1", label: "clear pilot dashboard after signup" },
  { stat: "100%", label: "honest about what is live today" },
] as const;

