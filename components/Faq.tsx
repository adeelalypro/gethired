"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Chevron } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-line py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-4 text-[32px] leading-[1.08] sm:text-[38px]">
            Questions people actually ask.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            How the interviews work, what happens to your data, and what to do
            when your situation changes.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-[16.5px] font-bold transition-colors ${
                        on ? "text-brand-deep" : "text-ink"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-muted transition-transform duration-300 ${
                        on ? "rotate-180 text-brand-deep" : ""
                      }`}
                    >
                      <Chevron className="h-5 w-5" />
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-300 ${
                    on ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-10 text-[15px] leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
