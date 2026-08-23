"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ANNUAL_DISCOUNT,
  MATCHER,
  MODULES,
  PERSONA_PLANS,
  PLAN_BY_ID,
  formatPrice,
  monthlyPrice,
  type PlanId,
} from "@/lib/pricing";
import { Arrow, Check, Dash, Glyph } from "./Icons";

const MODULE_NAME = Object.fromEntries(MODULES.map((m) => [m.id, m.name]));

export default function PricingGrid({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(false);
  const [matched, setMatched] = useState<PlanId | null>(null);
  const free = PLAN_BY_ID.free;

  return (
    <section id="pricing" className="border-b border-line py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-[34px] leading-[1.08] sm:text-[42px]">
            Choose the plan that matches where you are.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Every plan gives you all six tools. Each one goes deepest on what
            that stage of a search actually demands — and you can move between
            them whenever your situation changes.
          </p>
        </div>

        {/* Self-select */}
        <div className="mt-11 rounded-[20px] border border-line bg-surface p-5 sm:p-6">
          <p className="text-center text-[14px] font-semibold text-ink">
            Not sure? Tell us what&rsquo;s true right now.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {MATCHER.map((m) => {
              const on = matched === m.planId;
              return (
                <button
                  key={m.planId}
                  type="button"
                  onClick={() => setMatched(on ? null : m.planId)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all ${
                    on
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-line bg-white text-ink-2 hover:border-brand-mid hover:bg-brand-light"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
          {matched && (
            <p className="rise mt-4 text-center text-[14px] text-muted" role="status">
              Start with{" "}
              <span className="font-semibold text-brand-deep">
                {PLAN_BY_ID[matched].name}
              </span>{" "}
              &mdash; it starts with {PLAN_BY_ID[matched].builtFor.toLowerCase()}.
            </p>
          )}
        </div>

        {/* Billing toggle */}
        <div className="mt-9 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {[
              { label: "Monthly", value: false },
              { label: `Yearly — save ${ANNUAL_DISCOUNT * 100}%`, value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAnnual(opt.value)}
                aria-pressed={annual === opt.value}
                className={`rounded-full px-5 py-2 text-[13.5px] font-semibold transition-all ${
                  annual === opt.value
                    ? "bg-brand-deep text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Free strip */}
        <div className="mt-10 flex flex-col gap-6 rounded-[20px] border border-line bg-surface px-7 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="lg:max-w-xs">
            <div className="flex items-baseline gap-2.5">
              <h3 className="text-[20px]">{free.name}</h3>
              <span className="font-display text-[22px] font-extrabold text-brand-deep">
                Free
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              See your profile score and salary band before you decide anything.
              No card required.
            </p>
          </div>

          <ul className="flex flex-1 flex-wrap gap-x-7 gap-y-2.5">
            {MODULES.map((m) => {
              const v = free.meters[m.id];
              return (
                <li key={m.id} className="flex items-center gap-2 text-[13.5px]">
                  <span
                    className={
                      v ? "text-brand" : "text-faint"
                    }
                  >
                    {v ? <Check className="h-3.5 w-3.5" draw /> : <Dash className="h-3.5 w-3.5" />}
                  </span>
                  <span className={v ? "text-ink-2" : "text-faint line-through"}>
                    {v ?? MODULE_NAME[m.id]}
                  </span>
                </li>
              );
            })}
          </ul>

          <Link
            href="/signup"
            className="shrink-0 rounded-full border border-brand-deep px-6 py-3 text-center text-[14px] font-semibold text-brand-deep transition-colors hover:bg-brand-deep hover:text-white"
          >
            Get started free
          </Link>
        </div>

        {/* Persona plans */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PERSONA_PLANS.map((plan) => {
            const price = monthlyPrice(plan, annual);
            const isMatch = matched === plan.id;
            const emphasize = isMatch || (!matched && plan.featured);

            return (
              <div
                key={plan.id}
                id={`plan-${plan.id}`}
                className={`relative flex scroll-mt-28 flex-col rounded-[20px] border p-6 transition-all sm:p-7 ${
                  emphasize
                    ? "border-brand-deep bg-brand-deep text-white shadow-[0_28px_60px_-30px_rgba(6,78,51,0.65)] xl:-my-2 xl:py-9"
                    : "border-line bg-white"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${
                      emphasize
                        ? "shimmer bg-amber text-ink"
                        : "bg-brand-light text-brand-deep ring-1 ring-brand-mid"
                    }`}
                  >
                    {isMatch ? "Your match" : plan.badge}
                  </span>
                )}

                <span
                  className={`text-[11px] font-bold tracking-[0.12em] uppercase ${
                    emphasize ? "text-brand-mid" : "text-faint"
                  }`}
                >
                  {plan.persona}
                </span>
                <h3
                  className={`mt-2 text-[21px] ${emphasize ? "text-white" : ""}`}
                >
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={`font-display text-[38px] leading-none font-extrabold ${
                      emphasize ? "text-white" : "text-ink"
                    }`}
                  >
                    ${formatPrice(price)}
                  </span>
                  <span
                    className={`text-[14px] ${emphasize ? "text-brand-mid" : "text-muted"}`}
                  >
                    /month
                  </span>
                </div>
                <p
                  className={`mt-1.5 text-[12.5px] ${
                    emphasize ? "text-brand-mid" : "text-faint"
                  }`}
                >
                  {annual
                    ? `Billed yearly at $${formatPrice(price * 12)}`
                    : "Billed monthly, cancel anytime"}
                </p>

                <p
                  className={`mt-5 min-h-[68px] text-[14px] leading-relaxed ${
                    emphasize ? "text-white/85" : "text-muted"
                  }`}
                >
                  {plan.who}
                </p>

                {/* The flagship meter — the reason this plan exists */}
                <div
                  className={`mt-1 rounded-xl px-4 py-3.5 ${
                    emphasize ? "bg-white/12" : "bg-brand-light"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Glyph
                      name={plan.hero}
                      className={`h-4 w-4 ${emphasize ? "text-brand-mid" : "text-brand-deep"}`}
                    />
                    <span
                      className={`text-[11px] font-bold tracking-[0.1em] uppercase ${
                        emphasize ? "text-brand-mid" : "text-brand-dark"
                      }`}
                    >
                      {MODULE_NAME[plan.hero]}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 font-display text-[16px] leading-snug font-bold ${
                      emphasize ? "text-white" : "text-ink"
                    }`}
                  >
                    {plan.meters[plan.hero]}
                  </p>
                </div>

                <p
                  className={`mt-6 text-[11px] font-bold tracking-[0.1em] uppercase ${
                    emphasize ? "text-brand-mid" : "text-faint"
                  }`}
                >
                  What you get
                </p>
                <ul className="mt-3 flex-1 space-y-2.5">
                  {plan.signature.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 shrink-0 ${
                          emphasize ? "text-brand-mid" : "text-brand"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" draw />
                      </span>
                      <span
                        className={`text-[13.5px] leading-snug ${
                          emphasize ? "text-white/90" : "text-ink-2"
                        }`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>

                {!compact && (
                  <div
                    className={`mt-6 space-y-1.5 border-t pt-5 ${
                      emphasize ? "border-white/15" : "border-line"
                    }`}
                  >
                    {MODULES.filter((m) => m.id !== plan.hero).map((m) => {
                      const v = plan.meters[m.id];
                      return (
                        <div
                          key={m.id}
                          className="flex items-baseline justify-between gap-3 text-[12.5px]"
                        >
                          <span className={emphasize ? "text-white/60" : "text-faint"}>
                            {m.name}
                          </span>
                          <span
                            className={`text-right font-medium ${
                              v
                                ? emphasize
                                  ? "text-white/90"
                                  : "text-ink-2"
                                : emphasize
                                  ? "text-white/35"
                                  : "text-faint"
                            }`}
                          >
                            {v ?? "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Link
                  href={`/signup?plan=${plan.id}`}
                  aria-label={`Choose ${plan.name}`}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14.5px] font-semibold whitespace-nowrap transition-all hover:gap-3 ${
                    emphasize
                      ? "bg-white text-brand-deep hover:bg-brand-light"
                      : "border border-line bg-white text-ink hover:border-brand-mid hover:bg-brand-light"
                  }`}
                >
                  Choose this plan <Arrow className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13.5px] text-muted">
          Every plan includes unlimited edits and PDF downloads. Change plans any
          time &mdash; your profile, portfolio and interview history come with
          you.
        </p>

        {compact && (
          <div className="mt-7 flex justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[14.5px] font-semibold text-ink transition-all duration-200 hover:gap-3 hover:border-brand-mid hover:bg-brand-light"
            >
              Compare every plan side by side <Arrow className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
