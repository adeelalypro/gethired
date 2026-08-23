import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms/" } };

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede="The rules for creating an account, using promotional access, and using the GetHired service."
      sections={[
        {
          heading: "Service availability",
          body: "GetHired provides promo-code account creation, service selection, an account dashboard, contact submissions, and product-update registration. Individual tools and service allowances may be introduced or expanded progressively. Your dashboard and communications from GetHired determine what is available to your account at a given time.",
        },
        {
          heading: "Eligibility and your account",
          body: "You must provide accurate information, keep your password confidential, and use only an account you are authorised to access. Tell us promptly if you suspect unauthorised access. We may restrict signups to people who received a valid promotional code.",
        },
        {
          heading: "Acceptable use",
          body: "Do not misuse the service, interfere with security, scrape personal data, attempt to access another user’s account, upload malicious content, impersonate someone, or use GetHired to deceive employers or misrepresent simulated work as employment.",
        },
        {
          heading: "Career information and outcomes",
          body: "GetHired provides career tools and educational support, not legal, financial, recruitment, or employment advice. We do not guarantee interviews, offers, salary levels, hiring outcomes, or the accuracy of automated suggestions. You remain responsible for reviewing anything you submit to an employer.",
        },
        {
          heading: "Promotional access and payments",
          body: "Current promotional accounts do not require card details and are not charged at signup. A promo code grants complimentary access and may have service, audience, usage, or expiry restrictions. Paid access, when enabled, will require separate checkout and clear payment terms before any charge.",
        },
        {
          heading: "Your content and feedback",
          body: "You retain rights in information and materials you provide. You give GetHired permission to process that content only as needed to operate and improve the service. If you voluntarily provide product feedback, you allow us to use it without an obligation to compensate you, while we continue to protect personal information under the Privacy Policy.",
        },
        {
          heading: "Availability and changes",
          body: "Access may be changed, paused, limited, or discontinued. Features may change or occasionally contain errors. We may update these terms when the service changes; continued use after an update means you accept the revised terms where permitted by law.",
        },
        {
          heading: "Suspension and deletion",
          body: "You may delete your account from the dashboard. We may suspend or terminate access for security concerns, misuse, legal requirements, or violation of these terms. Provisions that logically continue after termination, including responsibility for misuse and limitations, will survive.",
        },
        {
          heading: "Disclaimers and liability",
          body: "The service is provided on an 'as available' basis to the fullest extent permitted by law. We do not exclude rights that cannot legally be excluded. To the extent allowed by law, GetHired is not responsible for indirect, incidental, or consequential loss arising from use of the service or reliance on career-related information.",
        },
        {
          heading: "Contact",
          body: "Use the Contact page for questions about these terms, your account, or service access.",
        },
      ]}
    />
  );
}
