import { STAGES } from "@/lib/content";
import { Glyph } from "./Icons";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-[34px] leading-[1.08] sm:text-[42px]">
            From uploading a resume to sitting the final round.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Six stages, in order. Most people join partway through &mdash; you
            don&rsquo;t have to start at stage one.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s) => (
            <li key={s.key} className="group relative bg-white p-7 transition-colors hover:bg-brand-light/40 md:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-deep transition-colors group-hover:bg-white">
                  <Glyph name={s.key} className="h-5 w-5" />
                </span>
                <span className="font-display text-[30px] font-extrabold text-line transition-colors group-hover:text-brand-mid">
                  {s.n}
                </span>
              </div>

              <h3 className="mt-5 text-[18.5px] leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                {s.body}
              </p>
              <span className="mt-5 inline-block rounded-full bg-surface px-2.5 py-1 text-[11.5px] font-semibold text-brand-dark">
                {s.module}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
