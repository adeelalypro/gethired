import Link from "next/link";
import { Arrow } from "./Icons";

export default function CtaBand() {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-deep px-8 py-16 text-center md:px-16 md:py-24">
          <div className="dotfield-dark absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -top-28 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-brand/35 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[34px] leading-[1.06] text-white sm:text-[44px]">
              Help shape what gets built first.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-relaxed text-brand-mid">
              Join with the promo code you received, select your priority, and enter the pilot dashboard. No card or payment information is collected.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-deep transition-all hover:gap-3 hover:bg-brand-light"
              >
                Join early access <Arrow className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Compare pilot tracks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

