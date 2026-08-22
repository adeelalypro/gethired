"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Glyph } from "@/components/Icons";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError, isPlanId } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { PLAN_BY_ID, PLANS, formatPrice, type PlanId } from "@/lib/pricing";

export function SignupView({ planId }: { planId: PlanId }) {
  const router = useRouter();
  const plan = PLAN_BY_ID[planId];
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const promoCode = String(form.get("promo") || "").trim();

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/`,
          data: {
            full_name: fullName,
            selected_service: planId,
            promo_code: promoCode,
          },
        },
      });

      if (signupError) throw signupError;

      if (data.session) {
        router.push("/dashboard/");
        return;
      }

      setRegisteredEmail(email);
      event.currentTarget.reset();
    } catch (signupError) {
      setError(friendlyAccountError(signupError instanceof Error ? signupError.message : ""));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-b border-line py-16 md:py-24">
      <div className="shell grid max-w-4xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span className="eyebrow">Create your account</span>
          <h1 className="mt-4 text-[34px] leading-[1.06] sm:text-[40px]">Start where you are.</h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Choose the service that matches your current job-search stage, then activate your promotional access. No card or payment information is required.
          </p>

          <div className="card mt-8 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-deep">
                <Glyph name={plan.id} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-faint">Selected service</p>
                <p className="font-display text-[16px] font-extrabold text-ink">
                  {plan.name}
                  <span className="ml-2 font-sans text-[13.5px] font-medium text-brand-dark">
                    {plan.priceMonthly === 0 ? "Starter" : `$${formatPrice(plan.priceMonthly)}/mo value`}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{plan.who}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PLANS.filter((candidate) => candidate.id !== plan.id).map((candidate) => (
                <Link
                  key={candidate.id}
                  href={`/signup?plan=${candidate.id}`}
                  className="rounded-full border border-line px-3 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:border-brand-mid hover:bg-brand-light hover:text-brand-deep"
                >
                  {candidate.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {registeredEmail ? (
          <div className="card h-fit p-7 md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-deep">
              <Check className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-[24px]">Check your inbox.</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              We sent a verification link to <strong className="text-ink">{registeredEmail}</strong>. Open it to activate your {plan.name} access and enter your dashboard.
            </p>
            <Link href="/login" className="mt-6 inline-flex font-semibold text-brand-dark underline underline-offset-4">Go to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card h-fit space-y-4 p-7 md:p-8">
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Full name</span>
              <input className={ACCOUNT_FIELD} name="name" autoComplete="name" placeholder="Your name" maxLength={120} required />
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
              <input className={ACCOUNT_FIELD} name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Password</span>
              <input className={ACCOUNT_FIELD} name="password" type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center justify-between gap-3 text-[13px] font-semibold text-ink">
                Promo code <span className="font-normal text-faint">Required</span>
              </span>
              <input className={`${ACCOUNT_FIELD} uppercase`} name="promo" autoComplete="off" maxLength={80} placeholder="Enter your access code" required />
              <span className="mt-2 block text-[12.5px] text-faint">Use the code provided by the GetHired team.</span>
            </label>

            {error && <FormNotice tone="error">{error}</FormNotice>}

            <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-muted">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--color-brand)]" />
              <span>
                I agree to the <Link href="/terms" className="font-semibold text-brand-dark underline">Terms</Link> and acknowledge the <Link href="/privacy" className="font-semibold text-brand-dark underline">Privacy Policy</Link>.
              </span>
            </label>

            <button type="submit" disabled={submitting} className={ACCOUNT_BUTTON}>
              {submitting ? "Creating your account…" : "Activate promo access"}
            </button>

            <ul className="space-y-2 pt-1">
              {["No credit card required", "Email-verified account", "Your selected service is saved"].map((text) => (
                <li key={text} className="flex items-center gap-2 text-[13px] text-muted">
                  <span className="text-brand"><Check className="h-3.5 w-3.5" /></span>
                  {text}
                </li>
              ))}
            </ul>

            <p className="pt-1 text-center text-[13.5px] text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-dark underline underline-offset-2">Log in</Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default function SignupContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const planId: PlanId = isPlanId(planParam) ? planParam : "free";

  return <SignupView planId={planId} />;
}
