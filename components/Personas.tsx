import Link from "next/link";
import { PERSONA_PLANS } from "@/lib/pricing";
import { Arrow, Glyph } from "./Icons";

/**
 * Recognition, not segmentation. The reader should find themselves here and
 * feel understood — they never need to know the plans were designed this way.
 */
export default function Personas() {
  return (
    <section id="personas" className="border-b border-line py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Choose your pilot track</span>
            <h2 className="mt-4 text-[34px] leading-[1.08] sm:text-[42px]">
              Start with the problem that is real right now.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Your choice tells us where early demand is strongest. It does not start a subscription, and you will not be asked for a card.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-3 text-[14.5px] font-semibold text-ink transition-all duration-200 hover:gap-3 hover:border-brand-mid hover:bg-brand-light"
          >
            Compare the tracks <Arrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PERSONA_PLANS.map((p) => (
            <Link
              key={p.id}
              href={`/signup?plan=${p.id}`}
              className={`group card flex flex-col p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-26px_rgba(10,26,43,0.32)] ${
                p.featured ? "border-brand-mid bg-brand-light/40" : ""
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-deep text-brand-mid">
                <Glyph name={p.id} className="h-5.5 w-5.5" />
              </span>

              <h3 className="mt-5 text-[19px]">{p.persona}</h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-muted">
                {p.who}
              </p>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-faint">
                  Research priority
                </p>
                <p className="mt-1.5 text-[14.5px] font-semibold text-brand-deep">
                  {p.builtFor}
                </p>
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-dark transition-all duration-200 group-hover:gap-2.5">
                Choose {p.name} <Arrow className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

