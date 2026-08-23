import Link from "next/link";
import { PERSONA_PLANS, PLAN_BY_ID } from "@/lib/pricing";
import { Arrow, Check, Glyph } from "./Icons";

export default function PricingGrid({ compact = false }: { compact?: boolean }) {
  const starter = PLAN_BY_ID.free;

  return (
    <section id="tracks" className="border-b border-line py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Early-access tracks</span>
          <h2 className="mt-4 text-[34px] leading-[1.08] sm:text-[42px]">Choose the question you want GetHired to solve first.</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">There is no billing during the pilot. A promo code grants account access and your selection helps us prioritise the roadmap.</p>
        </div>

        <div className="mt-10 rounded-[22px] border border-brand-mid bg-brand-light p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-10 md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-deep text-brand-mid"><Glyph name="profile" className="h-5 w-5" /></span>
            <div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">What every track includes today</p><h3 className="mt-1.5 text-[20px]">{starter.name} pilot access</h3><p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">{starter.who}</p></div>
          </div>
          <Link href="/signup" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-deep px-5 py-3 text-[14px] font-semibold text-white transition-all hover:gap-3 hover:bg-brand-dark md:mt-0">Join the pilot <Arrow className="h-4 w-4" /></Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PERSONA_PLANS.map((plan) => (
            <article key={plan.id} id={`plan-${plan.id}`} className={`card relative flex scroll-mt-28 flex-col p-7 shadow-sm sm:p-8 ${plan.featured ? "border-brand-mid" : ""}`}>
              {plan.badge && <span className="absolute right-6 top-6 rounded-full bg-amber-light px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-ink">{plan.badge}</span>}
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-deep text-brand-mid"><Glyph name={plan.hero} className="h-5 w-5" /></span>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">{plan.persona}</p>
              <h3 className="mt-1 text-[23px]">{plan.name}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{plan.who}</p>
              <div className="mt-5 rounded-xl bg-surface px-4 py-3.5"><p className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-faint">Research priority</p><p className="mt-1.5 font-display text-[15px] font-bold text-ink">{plan.builtFor}</p></div>
              <ul className="mt-5 flex-1 space-y-3">
                {plan.signature.map((item) => <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-dark" />{item}</li>)}
              </ul>
              <Link href={`/signup?plan=${plan.id}`} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-brand-mid bg-brand-light px-5 py-3 text-[14px] font-semibold text-brand-deep transition-all hover:gap-3 hover:bg-brand-mid">Choose {plan.name} <Arrow className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-5 text-center text-[13.5px] leading-relaxed text-muted">
          <strong className="text-ink">Important:</strong> joining records interest; it does not unlock all roadmap concepts immediately. We will communicate availability as the pilot develops.
        </div>

        {compact && <div className="mt-7 flex justify-center"><Link href="/pricing" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-[14.5px] font-semibold text-ink">Compare every track <Arrow className="h-4 w-4" /></Link></div>}
      </div>
    </section>
  );
}

