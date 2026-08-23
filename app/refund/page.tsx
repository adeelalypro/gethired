import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Payments & Refunds", alternates: { canonical: "/refund/" } };

export default function Page() {
  return (
    <LegalPage
      title="Payments & Refunds"
      lede="How complimentary promotional access works and what will apply when paid checkout becomes available."
      sections={[
        {
          heading: "Complimentary promotional access",
          body: "Users joining with a valid promo code are not asked for a credit card and are not charged at signup. Promotional access does not create a payment obligation.",
        },
        {
          heading: "Promo codes are access codes",
          body: "A promo code grants complimentary access and is not a payment method. It has no cash value and may be limited by campaign, audience, selected service, number of uses, or expiry date.",
        },
        {
          heading: "Paid checkout",
          body: "Before accepting payment, GetHired will display the price, billing frequency, cancellation rules, and applicable refund terms before payment is requested. Paid terms will not be applied retroactively to complimentary promotional access.",
        },
        {
          heading: "Unexpected payment concern",
          body: "If you believe you encountered an unauthorised charge claiming to be from GetHired, use the Contact page immediately and include the relevant details. Do not send full card numbers through the form.",
        },
      ]}
    />
  );
}
