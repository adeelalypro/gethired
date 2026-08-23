import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms/" } };

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede="The rules for taking part in the current private GetHired early-access pilot."
      sections={[
        {
          heading: "Pilot status",
          body: "GetHired is currently an early-access pilot. The working service includes promo-code account creation, track selection, an account dashboard, contact submissions, and product-update registration. Roadmap descriptions are plans and concepts, not promises that every feature is available now or will launch on a particular date.",
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
          body: "GetHired provides pilot tools and educational concepts, not legal, financial, recruitment, or employment advice. We do not guarantee interviews, offers, salary levels, hiring outcomes, or the accuracy of future automated suggestions. You remain responsible for reviewing anything you submit to an employer.",
        },
        {
          heading: "Promotional access and payments",
          body: "The current pilot does not collect card details or charge users. A promo code grants limited early access and may have usage, audience, or expiry restrictions. If paid services are introduced, separate pricing and payment terms will be presented before any charge.",
        },
        {
          heading: "Your content and feedback",
          body: "You retain rights in information and materials you provide. You give GetHired permission to process that content only as needed to operate and improve the service. If you voluntarily provide product feedback, you allow us to use it without an obligation to compensate you, while we continue to protect personal information under the Privacy Policy.",
        },
        {
          heading: "Availability and changes",
          body: "Pilot access may be changed, paused, limited, or discontinued. Features may be incomplete or contain errors. We may update these terms when the service changes; continued use after an update means you accept the revised terms where permitted by law.",
        },
        {
          heading: "Suspension and deletion",
          body: "You may delete your account from the dashboard. We may suspend or terminate access for security concerns, misuse, legal requirements, or violation of these terms. Provisions that logically continue after termination, including responsibility for misuse and limitations, will survive.",
        },
        {
          heading: "Disclaimers and liability",
          body: "The pilot is provided on an 'as available' basis to the fullest extent permitted by law. We do not exclude rights that cannot legally be excluded. To the extent allowed by law, GetHired is not responsible for indirect, incidental, or consequential loss arising from use of the pilot or reliance on career-related concepts.",
        },
        {
          heading: "Contact",
          body: "Use the Contact page for questions about these terms, account access, or the pilot.",
        },
      ]}
    />
  );
}

