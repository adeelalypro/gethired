import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={[
        {
          heading: "Your account",
          body: "One account per person. You are responsible for the accuracy of the professional information you provide, since every generated document is built from it.",
        },
        {
          heading: "Plans and limits",
          body: "Each plan carries monthly allowances per module, listed on the pricing page. Allowances reset each billing cycle and do not roll over. One-time pack credits never expire and stack on top.",
        },
        {
          heading: "Changing plans",
          body: "Upgrades take effect immediately and are prorated. Downgrades take effect at the end of the current cycle. Your profile, portfolio, and interview history carry across any change.",
        },
        {
          heading: "Simulated experience",
          body: "Experience Lab work is simulated and is labelled as such on your profile. It must not be represented as paid employment.",
        },
      ]}
    />
  );
}
