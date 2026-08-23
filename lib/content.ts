import { SITE } from "./site";

/** The six-stage arc, used by the hero stepper and the How It Works section. */
export const STAGES = [
  {
    n: "01",
    key: "profile",
    short: "Profile",
    title: "Build your profile",
    heading: "Start from what you already have",
    body: "Upload a resume, sync LinkedIn, or type it in. In a couple of minutes you have a structured professional identity the rest of the platform reasons about — and a public link you can put on an application.",
    module: "Smart Profile",
  },
  {
    n: "02",
    key: "analysis",
    short: "Analysis",
    title: "Analyze your potential",
    heading: "Find out what you're actually worth",
    body: "A detailed read on where you stand: corporate worth, strengths, skill gaps, realistic salary band, and the roles you could credibly target next. Not a score out of ten — a roadmap you can act on this week.",
    module: "Smart Analysis",
  },
  {
    n: "03",
    key: "experience",
    short: "Experience",
    title: "Build real experience",
    heading: "Stop being rejected for experience you were never given",
    body: "Role-specific task simulations that mirror the first ninety days of the job. Ship the work, get reviewed, and walk away with portfolio proof instead of another line about being a fast learner.",
    module: "Experience Lab",
  },
  {
    n: "04",
    key: "resume",
    short: "Resume",
    title: "Increase your visibility",
    heading: "A different resume for every job, in seconds",
    body: "Paste a job URL or description. Get an ATS-optimized resume and cover letter written against that specific posting, with a match score telling you whether it's even worth applying.",
    module: "Smart Resume",
  },
  {
    n: "05",
    key: "practice",
    short: "Interview",
    title: "Prepare for the interview",
    heading: "Do the interview badly here, not there",
    body: "Live mock interviews across HR, technical, case study, logical and verbal reasoning, and presentation. The interviewer adapts to your answers. Every session is recorded, graded, and compared to your last one.",
    module: "Practice Lab",
  },
  {
    n: "06",
    key: "hire",
    short: "Hired",
    title: "Get hired",
    heading: "Run the whole hiring process before it runs you",
    body: "A full simulated funnel — resume screening, phone screen, panel, final decision — for the exact role you're chasing. You find out where you get cut, while it still costs you nothing.",
    module: "Smart Hire",
  },
] as const;

export type FeatureId =
  | "profile"
  | "analysis"
  | "resume"
  | "practice"
  | "hire"
  | "experience";

export type Feature = {
  id: FeatureId;
  name: string;
  kicker: string;
  headline: string;
  body: string;
  bullets: readonly string[];
};

/** Deep-dive tabs in the Core Features section. */
export const FEATURES: readonly Feature[] = [
  {
    id: "profile",
    name: "Smart Profile",
    kicker: "Build your career profile",
    headline: "One profile the whole platform reads from",
    body: "Upload a resume, sync LinkedIn, or enter your details manually. Everything downstream — your analysis, your resumes, the questions your mock interviewer asks — is generated from this one source, so nothing contradicts anything else. Choose a template, decide what's public, and share a single link recruiters can actually open.",
    bullets: [
      "Resume upload, LinkedIn sync, or manual entry",
      "Professionally designed public profile templates",
      "Granular control over what's visible",
      "A shareable link with your own vanity URL",
    ],
  },
  {
    id: "analysis",
    name: "Smart Analysis",
    kicker: "Analyze your career potential",
    headline: "A straight answer about where you stand",
    body: "Smart Analysis reads your profile against live market data and tells you your corporate worth, your genuine strengths, the gaps holding you back, and the salary band you should be negotiating in. It then lays out the roles you could target next and what each one would take.",
    bullets: [
      "Profile score with the reasoning shown",
      "Skill gaps ranked by how much they cost you",
      "Estimated earning potential and market demand",
      "Target roles with a step-by-step path to each",
    ],
  },
  {
    id: "resume",
    name: "Smart Resume",
    kicker: "Create a winning resume",
    headline: "Tailored to the posting, readable by the robot",
    body: "Applicant tracking systems reject most resumes before a person sees them. Smart Resume writes against the specific job description — job URL, pasted text, or straight from your profile — and produces an ATS-clean resume plus a matching cover letter. Edit anything, pick a template, download and apply.",
    bullets: [
      "Job URL, pasted JD, or generate from profile",
      "Resume and cover letter in one pass",
      "Match score before you spend an application",
      "Full editing control, then download as PDF",
    ],
  },
  {
    id: "practice",
    name: "Practice Lab",
    kicker: "Practice job interviews",
    headline: "Adaptive mock interviews with real feedback",
    body: "An AI interviewer that follows up on what you actually said instead of reading from a list. Five formats: HR, technical, case study, logical and verbal reasoning, and presentation. Sessions are recorded and transcribed, then graded on structure, specificity, and delivery — with the delta from your previous attempt.",
    bullets: [
      "Five interview formats, adaptive follow-ups",
      "Company- and role-specific question sets",
      "Recorded, transcribed, and graded every time",
      "Score deltas so progress is visible",
    ],
  },
  {
    id: "hire",
    name: "Smart Hire",
    kicker: "Master the hiring process",
    headline: "The full process, simulated end to end",
    body: "Interview practice covers one stage. Smart Hire simulates the whole thing for a specific role — resume screening, recruiter call, technical round, panel, final decision — and tells you which stage you would have been cut at, and why, while it still costs you nothing.",
    bullets: [
      "Screening through to final decision",
      "Role-specific, not generic",
      "Stage-by-stage outcome with reasoning",
      "Rerun it after you fix the weak stage",
    ],
  },
  {
    id: "experience",
    name: "Experience Lab",
    kicker: "Gain real-world experience",
    headline: "Portfolio proof instead of a chicken-and-egg problem",
    body: "Every entry-level posting asks for experience nobody will give you first. Experience Lab hands you the actual work — role-specific tasks, projects, and workplace scenarios drawn from the first ninety days of the job. You ship it, it gets reviewed, and it becomes verified proof on your profile.",
    bullets: [
      "Role-specific tasks and full project briefs",
      "Workplace scenarios, not toy exercises",
      "Reviewed work with written feedback",
      "Verified Experience Portfolio you can share",
    ],
  },
];

export const FAQS = [
  {
    q: `What is ${SITE.name}?`,
    a: `${SITE.name} is a place to practice getting hired. You build a professional profile, find out where you stand, do real workplace tasks to build experience, generate resumes written for specific postings, and sit mock interviews with an AI interviewer — all before the job you actually want is on the line.`,
  },
  {
    q: "Who is it for?",
    a: "Students and new graduates who need experience before anyone will hire them, people actively applying who are not hearing back, anyone changing field, and anyone with interviews already on the calendar. If you are somewhere in a job search, there is a part of this built for you.",
  },
  {
    q: "What are the mock interviews actually like?",
    a: "You talk, out loud, to an AI interviewer that listens and follows up on what you said rather than reading from a fixed list. There are five formats — HR, technical, case study, logical and verbal reasoning, and presentation. Afterwards you get the recording, a transcript, and a score on structure, specificity and delivery, plus what changed since your last attempt.",
  },
  {
    q: "Is Experience Lab work real enough to put on a CV?",
    a: "It is simulated work and we label it as such — it appears on your profile as a verified simulation, not as employment. What it proves is that you can do the task: the brief, your finished work, and the reviewer's assessment are all attached to it. If you have no professional history yet, that is considerably more than a line claiming you are a fast learner.",
  },
  {
    q: "What does an ATS-friendly resume actually mean?",
    a: "Applicant Tracking Systems parse your resume before any person reads it. An ATS-friendly resume uses clear headings, standard section names, keywords drawn from the posting, and simple formatting that survives being parsed — which is what gets you past the first automatic screen and in front of a human.",
  },
  {
    q: "Which plan should I start on?",
    a: "Go by what is true this month rather than where you hope to be. Still studying or recently graduated: Build. Applying to a lot of roles: Apply. Moving into a different field: Switch. Interviews already booked: Interview. If two of them fit, start with the cheaper one.",
  },
  {
    q: "Can I change plans later?",
    a: "Any time, from your dashboard. Upgrades are prorated immediately and downgrades take effect at the end of your cycle. Nothing you have built — your profile, your portfolio, your interview history — is lost when you move between plans.",
  },
  {
    q: "What happens if I run out of interview minutes or resumes?",
    a: "You can buy a one-time pack. Those credits never expire, stack on top of your monthly allowance, and stay with you through a plan change or a cancellation. Nothing gets cut off mid-search and there is no surprise overage bill.",
  },
  {
    q: "What happens to my data?",
    a: "Your profile stays private until you choose to publish it. Your interview recordings, transcripts and generated documents belong to you, are never sold, and are deleted along with your account whenever you decide to close it.",
  },
  {
    q: "Do you work with universities and colleges?",
    a: "Yes — seat-based licensing with cohort dashboards, placement tracking, and Experience Lab tracks aligned to your curriculum. Get in touch with a rough cohort size and we will put a number together.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes, and no card is required. Starter gives you a full career analysis, three resumes, fifteen minutes of interview practice and one workplace simulation — enough to see your profile score and salary band and decide whether the rest is worth it.",
  },
] as const;

export const PROOF = [
  { stat: "6", label: "stages, from first profile to final round" },
  { stat: "5", label: "interview formats you can practice" },
  { stat: "90s", label: "from a job posting to a tailored resume" },
  { stat: "24/7", label: "the interviewer is always free to meet" },
] as const;
