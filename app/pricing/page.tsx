import type { Metadata } from "next";
import PricingGrid from "@/components/PricingGrid";
import ComparisonTable from "@/components/ComparisonTable";
import Packs from "@/components/Packs";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans for building experience, applying at volume, changing fields, or preparing for interviews. Start free — no card required.",
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
            <span className="eyebrow">Pricing</span>
            <h1 className="mt-4 text-[42px] leading-[1.03] sm:text-[54px]">
              Start where you are.
              <br className="hidden sm:block" />{" "}
              <span className="text-brand-dark">Move when you&rsquo;re ready.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Building experience, applying at volume, moving into a new field,
              or preparing for interviews next week &mdash; there&rsquo;s a plan
              shaped for each. Try it free first; no card required.
            </p>
          </div>
        </div>
      </section>

      <PricingGrid />
      <ComparisonTable />
      <Packs />
      <Faq />
      <CtaBand />
    </>
  );
}
