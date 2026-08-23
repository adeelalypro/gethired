import type { Metadata } from "next";
import PricingGrid from "@/components/PricingGrid";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Early Access",
  description:
    "Choose a GetHired pilot track for building portfolio proof, improving applications, changing careers, or preparing for interviews. No card required.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="dotfield absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light/70 to-transparent"
          aria-hidden="true"
        />
        <div className="shell relative py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Private early access</span>
            <h1 className="mt-4 text-[42px] leading-[1.03] sm:text-[54px]">
              Choose your priority.
              <br className="hidden sm:block" />{" "}<span className="text-brand-dark">Help shape the roadmap.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              The pilot uses tracks—not subscriptions—to understand what people need most. A promo code gives you access, and no payment information is collected.
            </p>
          </div>
        </div>
      </section>

      <PricingGrid />
      <Faq />
      <CtaBand />
    </>
  );
}

