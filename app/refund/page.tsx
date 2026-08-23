import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Payments & Refunds", alternates: { canonical: "/refund/" } };

export default function Page() {
  return (
    <LegalPage
      title="Payments & Refunds"
      lede="The current pilot is free to access with a promo code and does not collect payment details."
      sections={[
        {
          heading: "No charges during early access",
          body: "GetHired does not currently sell subscriptions, packs, credits, or one-time services. We do not ask for a credit card during signup, and joining the pilot does not create a payment obligation.",
        },
        {
          heading: "Promo codes are access codes",
          body: "A promo code grants access to the controlled pilot. It is not a discount applied to a purchase and has no cash value. Codes may be limited by campaign, audience, service track, number of uses, or expiry date.",
        },
        {
          heading: "If paid services launch later",
          body: "Before any paid service is introduced, GetHired will display the price, billing frequency, cancellation rules, and applicable refund terms before payment is requested. Those future terms will not be applied retroactively to the free pilot.",
        },
        {
          heading: "Unexpected payment concern",
          body: "If you believe you encountered an unauthorised charge claiming to be from GetHired, use the Contact page immediately and include the relevant details. Do not send full card numbers through the form.",
        },
      ]}
    />
  );
}

