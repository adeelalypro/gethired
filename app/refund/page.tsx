import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Refund Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={[
        {
          heading: "Subscriptions",
          body: "Full refund within seven days of a first payment if you have used less than 20% of that cycle's allowance across all modules. Contact us with your account email.",
        },
        {
          heading: "One-time packs",
          body: "Refundable within seven days provided no credits from the pack have been consumed. Partially used packs are not refundable, since credits never expire.",
        },
        {
          heading: "Plan changes",
          body: "Switching plans is not a refund event. Upgrades are prorated against the remainder of your cycle; downgrades apply from the next cycle.",
        },
      ]}
    />
  );
}
