import Link from "next/link";
import { PACKS } from "@/lib/pricing";
import { Check } from "./Icons";

export default function Packs() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">No subscription</span>
          <h2 className="mt-4 text-[32px] leading-[1.08] sm:text-[38px]">
            Just need a top-up?
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
            For one push rather than an ongoing search. Buy credits once — they
            never expire, they stack on top of any plan, and they stay with you
            if you cancel.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`flex flex-col rounded-[20px] border p-7 ${
                pack.featured
                  ? "border-brand-mid bg-brand-light/50"
                  : "border-line bg-white"
              }`}
            >
              <h3 className="text-[19px]">{pack.name}</h3>
              <p className="mt-2 text-[13.5px] text-muted">{pack.for}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-[34px] leading-none font-extrabold text-brand-deep">
                  ${pack.price.toFixed(2)}
                </span>
                <span className="text-[13.5px] text-muted">one-time</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pack.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-brand">
                      <Check className="h-3.5 w-3.5" draw />
                    </span>
                    <span className="text-[14px] text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/signup?pack=${pack.id}`}
                className={`mt-7 rounded-full px-5 py-3 text-center text-[14.5px] font-semibold transition-colors ${
                  pack.featured
                    ? "bg-brand-deep text-white hover:bg-brand-dark"
                    : "border border-line text-ink hover:border-brand-mid hover:bg-brand-light"
                }`}
              >
                Buy pack
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
