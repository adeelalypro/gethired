/**
 * Every brand-level string lives here. Renaming the product is a one-line edit.
 */
export const SITE = {
  name: "GetHired",
  domain: "gethired.info",
  tagline: "Practice before it counts",
  description:
    "Join the private GetHired pilot and help shape practical tools for resumes, interviews, career changes, and portfolio-building.",
  /** Short form for tight spaces like the footer. */
  short: "A private early-access pilot for people who want to practise the job search before the real opportunity is on the line.",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tracks", href: "/#personas" },
  { label: "Early Access", href: "/pricing" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Tracks", href: "/#personas" },
      { label: "Early Access", href: "/pricing" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "For Universities", href: "/contact?topic=institutions" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Log In", href: "/login" },
      { label: "Sign Up", href: "/signup" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Payments & Refunds", href: "/refund" },
      { label: "Unsubscribe", href: "/unsubscribe" },
    ],
  },
] as const;

