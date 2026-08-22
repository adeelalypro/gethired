/**
 * Every brand-level string lives here. Renaming the product is a one-line edit.
 */
export const SITE = {
  name: "GetHired",
  domain: "gethired.info",
  tagline: "Practice getting hired",
  description:
    "Build real experience, write resumes that survive the screening, and sit through the interviews — all before the job you actually want is on the line.",
  /** Short form for tight spaces like the footer. */
  short: "Practice everything that stands between you and the offer.",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Who It's For", href: "/#personas" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Who It's For", href: "/#personas" },
      { label: "Pricing", href: "/pricing" },
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
      { label: "Refund Policy", href: "/refund" },
    ],
  },
] as const;
