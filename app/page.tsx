import Hero from "@/components/Hero";
import Personas from "@/components/Personas";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PricingGrid from "@/components/PricingGrid";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Personas sit above features: the pricing thesis has to land before
          anyone reads a feature list. */}
      <Personas />
      <Features />
      <HowItWorks />
      <PricingGrid compact />
      <Faq />
      <CtaBand />
    </>
  );
}
