import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy/" } };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede="What the current GetHired pilot collects, why we use it, and the choices available to you."
      sections={[
        {
          heading: "Information you provide",
          body: "When you create an account, we collect your name, email address, selected early-access track, and the promo campaign used. If you contact us, we store your name, email, topic, and message. If you join the update list, we store your email address and subscription status.",
        },
        {
          heading: "Account and activity information",
          body: "We record limited operational events such as account creation, dashboard visits, profile updates, logins, and whether you confirmed interest in a track. This helps operate the pilot, prevent misuse, and understand which product areas users want most.",
        },
        {
          heading: "How we use information",
          body: "We use information to authenticate accounts, display your dashboard, manage promotional access, respond to support requests, maintain the product-update list, secure the service, and analyse aggregated pilot demand. We do not use the current pilot data to make employment decisions or guarantee job outcomes.",
        },
        {
          heading: "Service providers and sharing",
          body: "The website is delivered through GitHub Pages and account data is hosted with Supabase, which provides authentication and database services. We do not sell personal information. We may disclose information when required by law, to protect the service, or during a business transaction subject to appropriate safeguards.",
        },
        {
          heading: "Retention",
          body: "Account data is kept while your account is active and for as long as reasonably needed to operate, secure, and evaluate the pilot. Contact messages and campaign records may be retained for support and operational history. Product-update subscriptions remain active until you unsubscribe. We may retain limited records where legally required.",
        },
        {
          heading: "Your choices",
          body: "You can update your name and password or delete your account from the dashboard. You can unsubscribe from pilot updates using the unsubscribe page. For access, correction, deletion, or privacy questions that cannot be completed in the dashboard, use the contact form with the email linked to your request.",
        },
        {
          heading: "Security",
          body: "We use access controls, row-level database policies, encrypted network connections, and administrative role checks. No online service can guarantee absolute security, so use a unique password and contact us if you believe your account has been compromised.",
        },
        {
          heading: "Children and international use",
          body: "The pilot is not directed to children under 13. If local law requires a higher minimum age or parental consent, you should not use the service without satisfying those requirements. Information may be processed in countries where our service providers operate.",
        },
        {
          heading: "Changes and contact",
          body: "We may update this policy as the pilot and its data practices change. The current version and date will remain posted here. Use the Contact page for privacy questions or requests.",
        },
      ]}
    />
  );
}

