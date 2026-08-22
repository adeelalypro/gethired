import { MODULES, PLANS } from "@/lib/pricing";
import { Dash } from "./Icons";

export default function ComparisonTable() {
  return (
    <section className="border-b border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Side by side</span>
          <h2 className="mt-4 text-[32px] leading-[1.08] sm:text-[38px]">
            What&rsquo;s included, plan by plan.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
            Every paid plan gives you all six tools. What changes is how much of
            each you get.
          </p>
        </div>

        <div className="mt-11 overflow-x-auto rounded-[20px] border border-line bg-white">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-[220px] px-6 py-5 align-bottom">
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-faint">
                    Module
                  </span>
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className="px-5 py-5 align-bottom">
                    <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-faint">
                      {p.persona}
                    </span>
                    <span className="mt-1 block font-display text-[15.5px] font-extrabold text-ink">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[13px] text-brand-dark">
                      {p.priceMonthly === 0
                        ? "Free"
                        : `$${p.priceMonthly.toFixed(2)}/mo`}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((m, rowIdx) => (
                <tr
                  key={m.id}
                  className={`border-b border-line last:border-0 ${
                    rowIdx % 2 ? "bg-surface/50" : ""
                  }`}
                >
                  <th scope="row" className="px-6 py-5 align-top">
                    <span className="block text-[14.5px] font-semibold text-ink">
                      {m.name}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-snug font-normal text-faint">
                      {m.blurb}
                    </span>
                  </th>
                  {PLANS.map((p) => {
                    const v = p.meters[m.id];
                    const isHero = p.hero === m.id && p.priceMonthly > 0;
                    return (
                      <td key={p.id} className="px-5 py-5 align-top">
                        {v ? (
                          <span
                            className={`text-[13.5px] leading-snug ${
                              isHero
                                ? "rounded-md bg-brand-light px-2 py-1 font-bold text-brand-deep"
                                : "text-ink-2"
                            }`}
                          >
                            {v}
                          </span>
                        ) : (
                          <span className="text-faint">
                            <Dash className="h-4 w-4" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 flex items-center gap-2 text-[13px] text-muted">
          <span className="inline-block h-3 w-3 rounded-sm bg-brand-light ring-1 ring-brand-mid" />
          Highlighted = what that plan is built for.
        </p>
      </div>
    </section>
  );
}
