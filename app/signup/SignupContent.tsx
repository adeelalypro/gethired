"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Glyph } from "@/components/Icons";
import { PLAN_BY_ID, PLANS, formatPrice } from "@/lib/pricing";

const FIELD =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand-light";

type PlanId = keyof typeof PLAN_BY_ID;

export function SignupView({ planId }: { planId: PlanId }) {
  const plan = PLAN_BY_ID[planId];

  return (
    <section className="border-b border-line py-16 md:py-24">
      <div className="shell grid max-w-4xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span className="eyebrow">Create your account</span>
          <h1 className="mt-4 text-[34px] leading-[1.06] sm:text-[40px]">
            Start where you are.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            The free plan gives you a full career analysis, three tailored
            resumes, fifteen interview minutes and one Experience Lab simulation.
            No card required to find out where you stand.
          </p>

          <div className="card mt-8 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-deep">
                <Glyph name={plan.id} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-faint">
                  Selected plan
                </p>
                <p className="font-display text-[16px] font-extrabold text-ink">
                  {plan.name}
                  <span className="ml-2 font-sans text-[13.5px] font-medium text-brand-dark">
                    {plan.priceMonthly === 0
                      ? "Free"
                      : `$${formatPrice(plan.priceMonthly)}/mo`}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{plan.who}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PLANS.filter((p) => p.id !== plan.id).map((p) => (
                <Link
                  key={p.id}
                  href={`/signup?plan=${p.id}`}
                  className="rounded-full border border-line px-3 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:border-brand-mid hover:bg-brand-light hover:text-brand-deep"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <form className="card h-fit space-y-4 p-7 md:p-8">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-ink">Full name</span>
            <input className={FIELD} name="name" placeholder="Your name" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
            <input className={FIELD} name="email" type="email" placeholder="you@email.com" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-ink">Password</span>
            <input className={FIELD} name="password" type="password" placeholder="At least 8 characters" required />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-brand-deep px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Create account
          </button>

          <ul className="space-y-2 pt-1">
            {["No credit card required", "Cancel or switch plans anytime", "Your data stays yours"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2 text-[13px] text-muted">
                  <span className="text-brand">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ),
            )}
          </ul>

          <p className="pt-1 text-center text-[13.5px] text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-dark underline underline-offset-2">
              Log in
            </Link>
          </p>
          <p className="text-center text-[12.5px] text-faint">
            Demo form &mdash; not wired to a backend yet.
          </p>
        </form>
      </div>
    </section>
  );
}

export default function SignupContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const planId: PlanId =
    planParam && planParam in PLAN_BY_ID ? (planParam as PlanId) : "free";

  return <SignupView planId={planId} />;
}

